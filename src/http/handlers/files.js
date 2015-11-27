import FILES from 'fs';
import PATH from 'path';

import {Server} from '../server';
import {Mime} from '../mime';
import {Handler} from './handler';

@Server.handler('files')
class FileHandler extends Handler {
    config:Object;
    constructor(){
        super();
        this.config = FileHandler.config;
        this.config.path = PATH.resolve(this.config.path);
    }
    resource(path){
        try {
            var stat = FILES.statSync(path);
            if (stat.isDirectory()) {
                return this.resource(PATH.resolve(path, 'index.html'));
            } else
            if (stat.isFile()) {
                return {exist:true,path:path};
            } else {
                return {exist:false,path:path};
            }
        }catch(e){
            return {exist:false,path:path};
        }
    }
    accept(req,res){

    }
    handle(req,res){
        var file = this.resource(this.config.path+req.url);
        if(file.exist){
            res.writeHead(200,{
                'Content-Type': Mime.getType(file.path)
            });
            res.stream = FILES.createReadStream(file.path);
        }else{
            res.writeHead(404,{
                'Content-Type': Mime.getType(file.path)
            });
            res.end('File Not Found');
        }
    }
}