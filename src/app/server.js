import PATH from 'path';

import {Server} from '../http/server';

import '../http/handlers/rest';
import '../http/handlers/files';

import './api/hello';

export default new Server({
    port    : 3000,
    host    : "0.0.0.0",
    rest    : {
        path  : "/api"
    },
    files   : {
        path  : PATH.resolve(__dirname,'../../web')
    }
});