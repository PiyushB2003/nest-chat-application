import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

interface Message {
    id: number;
    content: string;
    sender: { id: number; username: string };
}

const Chat: React.FC<{ recipientId?: number; groupId?: number }> = ({ recipientId, groupId }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [content, setContent] = useState('');
    const socket = io('http://localhost:3000');

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await axios.get(
                `http://localhost:3000/chat/messages/${recipientId || ''}/${groupId || ''}`,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                },
            );
            setMessages(response.data);
        };
        fetchMessages();

        socket.on('message', (message: Message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, [recipientId, groupId]);

    const sendMessage = async () => {
        await axios.post(
            'http://localhost:3000/chat/message',
            { recipientId, groupId, content },
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
        );
        socket.emit('message', { senderId: 1, sendMessageDto: { recipientId, groupId, content } }); // Simplified senderId
        setContent('');
    };

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <div className="h-96 overflow-y-auto border p-4">
                {messages.map((msg) => (
                    <div key={msg.id} className="mb-2">
                        <strong>{msg.sender.username}: </strong>
                        {msg.content}
                    </div>
                ))}
            </div>
            <div className="mt-4 flex">
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="flex-1 p-2 border"
                />
                <button onClick={sendMessage} className="p-2 bg-blue-500 text-white">
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;