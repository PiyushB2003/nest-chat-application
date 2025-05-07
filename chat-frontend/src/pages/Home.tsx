import React, { useState, useContext } from 'react';
import axios from 'axios';
import Chat from '../components/Chat';
import { AuthContext } from '../context/AuthContext';

const Home: React.FC = () => {
    const { user, logout } = useContext(AuthContext);
    const [groupName, setGroupName] = useState('');
    const [memberIds, setMemberIds] = useState('');
    const [groups, setGroups] = useState<{ id: number; name: string }[]>([]);

    const createGroup = async () => {
        const response = await axios.post(
            'http://localhost:3000/chat/group',
            { name: groupName, memberIds: memberIds.split(',').map(Number) },
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
        );
        setGroups([...groups, response.data]);
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h1 className="text-3xl mb-4">Chat App</h1>
            {user ? (
                <>
                    <button onClick={logout} className="mb-4 p-2 bg-red-500 text-white">
                        Logout
                    </button>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            placeholder="Group Name"
                            className="p-2 border"
                        />
                        <input
                            type="text"
                            value={memberIds}
                            onChange={(e) => setMemberIds(e.target.value)}
                            placeholder="Member IDs (comma-separated)"
                            className="p-2 border ml-2"
                        />
                        <button onClick={createGroup} className="p-2 bg-blue-500 text-white ml-2">
                            Create Group
                        </button>
                    </div>
                    <h2 className="text-xl mb-2">Individual Chat</h2>
                    <Chat recipientId={2} /> {/* Simplified: Chat with user ID 2 */}
                    <h2 className="text-xl mb-2 mt-4">Group Chats</h2>
                    {groups.map((group) => (
                        <div key={group.id}>
                            <h3>{group.name}</h3>
                            <Chat groupId={group.id} />
                        </div>
                    ))}
                </>
            ) : (
                <p>Please login to continue.</p>
            )}
        </div>
    );
};

export default Home;