import {Cached} from "common/decorators";
import {Server} from "http/server";
import {Avatars} from "../server";

export class HttpService extends Server {

    @Cached
    private get avatars():Avatars{
        return Avatars.instance;
    }

    constructor(){
        super(this.avatars.config.http);
    }

    start():any{
        console.info('Starting HTTP Service');
        console.info(` remote : http://${this.config.host}:${this.config.port}`);
        console.info(` local  : ${this.config.files.path}`);
        super.start();
    }
}