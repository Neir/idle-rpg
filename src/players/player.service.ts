import { Injectable } from '@nestjs/common';
import { InjectInMemoryDBService, InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { PlayerEntity } from './player.model';


@Injectable()
export class PlayerService {

    constructor(@InjectInMemoryDBService('player') private playerDbService: InMemoryDBService<PlayerEntity>) {}

    createPlayer(player: any): PlayerEntity {
        return this.playerDbService.create(player);
    }

    getPlayer(player: any): PlayerEntity[] {
        return this.playerDbService.getAll();
    }

    getPlayerByName(name: string):  PlayerEntity {
        console.log("all db", this.playerDbService.getAll());
        const players = this.playerDbService.query((player) => player.name === name);
        console.log("players", players);
        return players?.length === 1 ? players[0] : null;
    }
}