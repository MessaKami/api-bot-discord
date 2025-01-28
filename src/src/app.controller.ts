import { Controller, Get, Render } from '@nestjs/common';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Render('users')
  async getHello() {
    const users = await this.usersService.findAll();
    return { users };
  }
}
