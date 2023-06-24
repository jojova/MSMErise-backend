import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { UserService } from './users/users.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [UserService],
})
export class AppModule {}
