import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private UsersService: UsersService) {}

    async signup(email: string, password: string) {
        const users = await this.UsersService.find(email);

        if (users.length) {
            throw new BadRequestException('Email is already in use');
        }

        //Gen a salt
        const salt = randomBytes(8).toString('hex');
        
        //Hash the salt and password
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        const result = salt + '.' + hash.toString('hex');

        const user = await this.UsersService.create(email, result);

        return user;
    }

    async signin(email: string, password: string) {
        const [user] = await this.UsersService.find(email);

        if(!user) {
            throw new NotFoundException('User not found');
        }
    }
}