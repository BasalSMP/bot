import fetch from 'node-fetch';
import { apiBases } from '../constants/apiBases';

interface UUIDRes {
    name: string;
    id: string;
}

interface ProfileRes {
    name: string;
    id: string;
    properties: Array<Object>
}

export default class MinecraftAccount {
    
    name: string;
    uuid: string;

    constructor(name: string, uuid: string) {
        this.name = name;
        this.uuid = uuid;
    }

    getCrafatar() : string {
        return `${apiBases.CRAFATAR}/avatars/${this.uuid}`;
    }

    static async fetchByName(name: string) : Promise<MinecraftAccount | null> {
        const res = await fetch(`${apiBases.MINECRAFT}/users/profiles/minecraft/${name}`);
        const body: UUIDRes = await res.json();
        if (!body) return null;
        return new MinecraftAccount(body.name, body.id); 
    }

    static async fetchByUUID(uuid: string) : Promise<MinecraftAccount | null> {
        const res = await fetch(`${apiBases.SESSION_SERVER}/session/minecraft/profile/${uuid}`);
        const body: ProfileRes = await res.json();
        if (!body) return null;
        return new MinecraftAccount(body.name, body.id);
    }

}