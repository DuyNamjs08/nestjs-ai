import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, } from '@nestjs/common';
import { UserService } from './user.service';


import { ValidationPipe } from 'src/validation/validation.pipe';
import type { CreateUserDto } from './dto/schema.user';
import { createUserSchema } from './dto/schema.user';
import { Public } from 'src/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Public()
  @Post()
  @UsePipes(new ValidationPipe(createUserSchema))
  create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
