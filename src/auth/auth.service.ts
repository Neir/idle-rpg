import { Injectable } from '@nestjs/common';
import { PlayerService } from '../players/player.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private playersService: PlayerService) {}

    async validatePlayer(name: string, pass: string): Promise<any> {
        const player = this.playersService.getPlayerByName(name);
        if (player?.password === pass) {
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

    // public async getRefreshToken(userId: number): Promise<string> {
    //   const userDataToUpdate = {
    //     refreshToken: randomToken.generate(16),
    //     refreshTokenExp: moment().day(1).format('YYYY/MM/DD'),
    //   };
    //
    //   await this.playersService.update(userId, userDataToUpdate);
    //   return userDataToUpdate.refreshToken;
    // }
}
