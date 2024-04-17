import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SignUpDto } from './dto/signup.dto';
import { Public } from './auth.public';
import { Role } from './role.enum';
import { Roles } from './roles.decorator';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { RefreshDto } from './dto/refresh.dto';
import { IgnoreDevice } from './device.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignUpDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() signUpDto: SignUpDto, @Request() req) {
    // get req user id
    const id = req.user.sub as number;

    return this.authService.register(
      {
        userName: signUpDto.username,
        password: signUpDto.password,
        role: signUpDto.role,
      },
      id,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('reset')
  resetPasswrod(@Body() resetDto: SignUpDto) {
    return this.authService.resetPassword(resetDto.username, resetDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    const me = req.user;
    return this.authService.me(me.sub);
  }

  @Patch('me')
  updateProfile(@Request() req, @Body() updateDto: UpdateUserDto) {
    const id = req.user.sub as number;
    return this.authService.update(id, updateDto);
  }

  @Roles(Role.Admin)
  @Get('generate/:id')
  async generateToken(@Param('id') id: string) {
    return await this.authService.generatetoken(+id, false);
  }

  @IgnoreDevice()
  @UseGuards(AuthGuard)
  @Post('refreshToken')
  async refreshToken(@Request() req, @Body() data: RefreshDto) {
    const id = req.user.sub as number;
    return await this.authService.addMobileInfo(id, data.mobileInfo);
  }

  @Roles(Role.Admin)
  @Delete('clearMobileInfo/:id')
  async clearMobileInfo(@Param('id') id: string) {
    return await this.authService.clearSession(+id);
  }
}
