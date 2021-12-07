import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db/src/interfaces/in-memory-db-entity';


export interface PlayerEntity extends InMemoryDBEntity {

    email: string;
    name: string;
    password: string;
    rank: number;

}