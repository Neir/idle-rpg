import { Injectable } from '@nestjs/common';
import { InjectInMemoryDBService, InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { PlayerEntity } from './player.model';

// This should be a real class/interface representing a player entity
export type Player = any;

@Injectable()
export class PlayerService {

    constructor(@InjectInMemoryDBService('player') private playerDbService: InMemoryDBService<PlayerEntity>) {}

    private readonly players = [
        {
            playerId: 1,
            name: 'john',
            password: 'changeme',
        },
        {
            playerId: 2,
            name: 'maria',
            password: 'guess',
        },
    ];

    async findOne(name: string): Promise<Player | undefined> {
        console.log('findOne?', name);
        return this.players.find(player => player.name === name);
    }

    createPlayer(player: any): PlayerEntity {
        return this.playerDbService.create(player);
    }

    getPlayer(player: any): PlayerEntity[] {
        return this.playerDbService.getAll();
    }
}