import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  signup(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('role') role: string,
  ) {
    const existingUser = this.userService.getUserByUsername(username);
    if (existingUser) {
      return { message: 'Username already exists' };
    }

    const user = this.userService.createUser(username, password, role);
    return { message: 'User created successfully', user };
  }

  @Post('login')
  login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const user = this.userService.getUserByUsername(username);
    if (!user || user.password !== password) {
      return { message: 'Invalid credentials' };
    }

    return { message: 'Login successful', user };
  }
}
