import { Body, Controller, Post, Request, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";


@Controller('auth')
export class AuthController {
    constructor(private authservice: AuthService) { }

    @Post('register')
    @UseInterceptors(FileInterceptor('profilePicture'))
    async register(
        @Body() registerDto: RegisterDto,
        @UploadedFile() file?: Express.Multer.File
    ) {
        return this.authservice.register(registerDto, file?.filename ? `/uploads/${file.filename}` : undefined);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto){
        return this.authservice.login(loginDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('profile-picture')
    @UseInterceptors(FileInterceptor('profilePicture'))
    async updateProfilePicture(@Request() req, @UploadedFile() file: Express.Multer.File){
        return this.authservice.updateProfilePicture(req.user.sub, file)
    }
}