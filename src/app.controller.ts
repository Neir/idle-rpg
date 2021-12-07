import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { PlayerEntity } from './players/player.model';
import { PlayerService } from './players/player.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private authService: AuthService,
              private playerService: PlayerService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/sign-up')
  signUp(@Body() player: PlayerEntity) {
    return this.authService.signUp(player);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    const player = this.playerService.getPlayer({id: 1});
      console.log("request", player);
    return player;
  }
}
