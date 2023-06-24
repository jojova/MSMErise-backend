import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import * as fs from 'fs';

@Injectable()
export class UserService {
  private readonly dbPath = 'users.json';
  private users: User[] = [];

  constructor() {
    this.loadUsers();
  }

  private loadUsers() {
    try {
      const data = fs.readFileSync(this.dbPath, 'utf-8');
      this.users = JSON.parse(data);
    } catch (error) {
      // If the file doesn't exist, it will be created when saving users.
      // For now, we ignore any errors related to reading the file.
    }
  }

  private saveUsers() {
    fs.writeFileSync(this.dbPath, JSON.stringify(this.users), 'utf-8');
  }

  getUserByUsername(username: string): User | undefined {
    return this.users.find(user => user.username === username);
  }

  createUser(username: string, password: string, role: string): User {
    const newUser = new User(username, password, role);
    this.users.push(newUser);
    this.saveUsers();
    return newUser;
  }
}

