import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "./dto/login.dto";


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) {}

    async register(registerDto: RegisterDto, profilePicture?: string){
        const { username, email, password} = registerDto;
        const hasedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({
            username,
            email,
            password: hasedPassword,
            profilePicture,
        })
        await this.userRepository.save(user);
        return user;
    }

    async login(loginDto: LoginDto){
        const { email, password } = loginDto;
        const user = await this.userRepository.findOne({ where: {email}});
        if(!user || !(await bcrypt.compare(password, user.password))){
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = {sub: user.id, username: user.username};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async updateProfilePicture(userId: number, file: Express.Multer.File){
        const user = await this.userRepository.findOne({ where: { id: userId}});
        if (!user) {
            throw new NotFoundException('User not found');
        }
        user.profilePicture = `uploads/${file.filename}`;
        await this.userRepository.save(user);
        return user;
    }
}