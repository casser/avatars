/**
 * Created by Grigor on 12/17/15.
 */
import Utils from '../utils/utils';
import * as Files from 'node/fs';
import * as Path from 'node/path';
import {Avatar} from './avatar';
import {SIShape} from './shape'

export class AvatarFactory {
    static createRandomAvatar(gender){
        var dir  = Path.resolve(__dirname,'../../avatars_data');

        var path = Path.resolve(dir, (gender=="male") ? 'svgavatars-male-data.json':'svgavatars-female-data.json');
        var config = JSON.parse(Files.readFileSync(path).toString());
        var randomized:any = {};
        var addHairInFace = ( (gender=="male") && !Utils.getRandomInt(0,4)) ? true : false;
        var addGlasses    = !Utils.getRandomInt(0,4) ? true : false ;
        var addBeard = (addHairInFace && Utils.getRandomInt(0,1))?true : false;
        for(var zone in config){
            if((zone =="glasses" && !addGlasses)
                || ((zone == "beard" || zone == "mustache") && !addHairInFace)
                || (zone == "beard" && !addBeard)
                || (zone == "mustache" && addBeard)){
                continue;
            }
            randomized[zone] = {
                shape_index : Utils.getRandomInt(0,config[zone].shapes.length-1),
            };
            if(zone == "eyesfront"){
                //eyesback & eyesfront interdependent
                randomized.eyesfront.shape_index = randomized.eyesback.shape_index;
            }
            randomized[zone].shape = config[zone].shapes[ randomized[zone].shape_index ];//shapes
            for(var position in config[zone].shapes[randomized[zone].shape_index ]){
                randomized[zone][position] = config[zone].shapes[randomized[zone].shape_index ][position];
            }


            if(config[zone].colors.length > 0){
                randomized[zone].color_index = Utils.getRandomInt(0,config[zone].colors.length-1);
                randomized[zone].color = config[zone].colors[randomized[zone].color_index];
            }

        }
        let avatar = new Avatar(randomized);
        return avatar;
    }

    static getTestShape(){
        var dir  = Path.resolve(__dirname,'../../avatars_data');
        var path = Path.resolve(dir,'svgavatars-female-data.json');
        var config = JSON.parse(Files.readFileSync(path).toString());
        return new SIShape({shape_index:0,single:config.glasses.shapes[5].single,color_index:0,color:'#e05f48'})
    }

}

export default new AvatarFactory();