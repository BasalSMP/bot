import fetch from 'node-fetch';
import { apiBases } from '../constants/apiBases';

interface MinecraftAccountRes {
    name: string;
    uuid: string;
}

export default class MinecraftAccount {
    
    name: string;
    uuid: string;

    constructor(name: string, uuid: string) {
        this.name = name;
        this.uuid = uuid;
    }

    static async fetch(name: string) {
        const res = await fetch(`${apiBases.MINECRAFT}/users/profiles/minecraft/${name}`);
        const body: MinecraftAccountRes = await res.json();
        return new MinecraftAccount(body.name, body.uuid); 
    }

}