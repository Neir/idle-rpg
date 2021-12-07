import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PlayerModule } from './players/player.module';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';

@Module({
  imports: [AuthModule, PlayerModule, InMemoryDBModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
