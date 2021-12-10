import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './auth-constants';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });

        // super({
        //     ignoreExpiration: false,
        //     secretOrKey: jwtConstants.secret,
        //     jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        //         const data = request?.cookies["auth-cookie"];
        //         if (!data) {
        //             return null;
        //         }
        //         return data.token
        //     }])
        // });
    }

    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
    }
}