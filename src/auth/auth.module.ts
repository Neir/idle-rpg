import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PlayerModule } from '../players/player.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { jwtConstants } from './auth-constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.stategy';

@Module({
  imports: [
    PlayerModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy
  ],
  exports: [AuthService],
})
export class AuthModule {}
