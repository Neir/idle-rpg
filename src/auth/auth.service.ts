import { Injectable } from '@nestjs/common';
import { PlayerService } from '../players/player.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private playersService: PlayerService) {}

    async validatePlayer(name: string, pass: string): Promise<any> {
        const player = await this.playersService.findOne(name);
        if (player && player.password === pass) {
            console.log('validate player');
            const { password, ...result } = player;
            return result;
        }
        return null;
    }

    async login(player: any): Promise<{access_token: string}> {
        console.log("login", player);
        const payload = { name: player.name, sub: player.playerId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    signUp(player: any): {access_token: string} {
        console.log("signUp", player);
        const payload = { name: player.name, sub: player.playerId };
        const playerCreated = this.playersService.createPlayer(player);
        console.log('playerCreated', playerCreated);
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
