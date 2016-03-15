import {Cached} from "common/decorators";
import {HttpService} from './services/http';
import {Config} from './config';
import {Xml} from '../shared/utils/xml';

// rest api endpoints
import './api/test';
// rest and file handlers
import 'http/handlers/files';
import 'http/handlers/rest';

export class Avatars {

    @Cached
    static get instance(){
        return new Avatars();
    }

    @Cached
    public get config():Config {
        return new Config();
    }
    @Cached
    public get http():HttpService {
        return new HttpService();
    }

    public run():Promise<Avatars>{
        return this.config.load().then(c=>{
            this.http.start();
            return this;
        });
    }
}

Avatars.instance.run().then(

    (s)=>{console.info("Avatar Started");},
    (e)=>{console.info(e.stack||e)}
);
export default Avatars.instance;

