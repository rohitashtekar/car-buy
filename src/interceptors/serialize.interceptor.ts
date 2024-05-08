import { 
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { UserDto } from 'src/users/dtos/user.dtos';

interface classConstructor {
    new (...args: any[]): {}
}

export function Serialize(dto: any) {
    return UseInterceptors(new SerializerInterceptor(dto));
}

export class SerializerInterceptor implements NestInterceptor {
    constructor(private dto: any) {

    }
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        // console.log("I am running before the request is handled by the handler", context);

        return handler.handle().pipe(
            map((data: any) => {
                // console.log("I am running before the response is sent out", data);

                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true
                })
            })
        )
    }   
}