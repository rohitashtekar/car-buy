import { Body, Controller, Post, Get, Patch, Delete, Param, Query, UseInterceptors, NotFoundException, Session } from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dtos';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dtos';
import { UserDto } from './dtos/user.dtos';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(
        private usersService: UsersService, 
        private authService: AuthService,
    ) {}

    // set & get from cookies
    // @Get('/colors/:color')
    // SetColor(@Param('color') color: string, @Session() session: any) {
    //     session.color = color;
    // }

    // @Get('/colors')
    // getColor(@Session() session: any) {
    //     return session.color;
    // }

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        this.usersService.create(body.email, body.password);
        console.log(body.email, body.password);
    }

    // @UseInterceptors(new SerializerInterceptor(UserDto))
    @Get('/:id')
    findUser(@Param('id') id: string){
        console.log("Handler is running!")
        const user = this.usersService.findOne(parseInt(id));
        if(!user) {
            throw new NotFoundException('user not found');
        }
        return user;
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