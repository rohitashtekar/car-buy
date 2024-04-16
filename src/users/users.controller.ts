import { Body, Controller, Post, Get, Patch, Delete, Param, Query, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dtos';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dtos';

@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService) {
        
    }

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        this.usersService.create(body.email, body.password);
        console.log(body.email, body.password);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/:id')
    findUser(@Param('id') id: string){
        return this.usersService.findOne(parseInt(id));
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(parseInt(id), body);
    }
}