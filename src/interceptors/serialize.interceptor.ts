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

export class SerializerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        // console.log("I am running before the handler", context);

        return handler.handle().pipe(
            map((data: any) => {
                // console.log("I am running before the response is sent out", data);

                return plainToClass(UserDto, data, {
                    excludeExtraneousValues: true
                })
            })
        )
    }
}