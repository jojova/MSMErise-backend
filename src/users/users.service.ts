import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User {
    return this.users.find((user) => user.userID === id);
  }

  createUser(user: User): User {
    const generatedUser: User = {
      ...user,
      userID: uuidv4(), // Generate userID using uuidv4()
    };
    this.users.push(generatedUser);
    return generatedUser;
  }

  updateUser(id: string, user: User): User {
    const index = this.users.findIndex((u) => u.userID === id);
    if (index !== -1) {
      this.users[index] = { ...user, userID: id };
      return this.users[index];
    }
    return null;
  }

  deleteUser(id: string): User {
    const index = this.users.findIndex((user) => user.userID === id);
    if (index !== -1) {
      return this.users.splice(index, 1)[0];
    }
    return null;
  }
}
