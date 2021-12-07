import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';

@Module({
  imports: [
    InMemoryDBModule.forFeature('player')
  ],
  providers: [PlayerService],
  exports: [PlayerService]
})
export class PlayerModule {}
