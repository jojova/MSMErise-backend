import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../models/user.model';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(): User[] {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): User {
    return this.usersService.getUserById(id);
  }

  @Post('signup')
  createUser(@Body() user: User): User {
    return this.usersService.createUser(user);
  }

  @Post('signin')
  signInUser(
    @Body('userEmail') userEmail: string,
    @Body('userPassword') userPassword: string,
  ): boolean {
    const existingUser = this.usersService
      .getAllUsers()
      .find((user) => user.userEmail === userEmail);
    if (!existingUser) {
      return false; // User with the provided email does not exist
    }
    if (existingUser.userPassword !== userPassword) {
      return false; // Incorrect password
    }
    return true; // Successful sign-in
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() user: User): User {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): User {
    return this.usersService.deleteUser(id);
  }
}
