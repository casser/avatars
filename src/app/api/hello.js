import {Rest} from '../../http/rest';
import {Result} from '../../http/rest';

import Files from 'fs';
import Path from 'path';
import Convertor from '../convertor';

@Rest('/convert/:format')
class HelloResource {
    get(format){
        var dir  = Path.resolve(__dirname,'../../../svg');
        var path = Path.resolve(dir,'avatar.svg');
        var out  = Path.resolve(dir,'avatar.png');
        var data = Files.readFileSync(path);
        if(format=='svg'){
            return Result.create(data,200,{
                'Content-Type':'image/svg+xml'
            });
        }else{
            return Convertor.convert(data,600,600).then(png=>{
                return Result.create(png,200,{
                    'Content-Type':'image/png'
                });
            });
        }


    }

}