/**
 * Created by Grigor on 12/17/15.
 */
import Utils from '../utils/utils';
import * as Files from 'node/fs';
import * as Path from 'node/path';
import {Avatar} from './avatar';
import {SIShape} from './shape'
import {BFShape} from './shape'
import {RLShape} from './shape'
import maleData from "../data/male";
import femaleData from "../data/female";

export class AvatarFactory {
    static createRandomAvatar(gender){
        var config = (gender=="male") ?  maleData : femaleData;
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
        var config = femaleData;
        let shapeIndex = Utils.getRandomInt(0,config.glasses.shapes.length-1);
        return new SIShape({shape_index:shapeIndex,single:config.glasses.shapes[shapeIndex].single,color_index:0,color:'#e05f48'})
    }

    static getShapesByZone(zone:string,gender:string='male'){
        var shapes = [];
        var config = (gender=="male") ?  maleData : femaleData;
        var zoneData = config[zone];
        let defaultColor ;
        let defaultColorIndex ;
        if(zoneData.colors.length > 0){
            defaultColorIndex= Utils.getRandomInt(0,zoneData.colors.length-1);
            defaultColor = zoneData.colors[defaultColorIndex];
        }
        for(var i=0;i<zoneData.shapes.length;i++){
            var shapeData = zoneData.shapes[i],
                shape;
            if(shapeData.single){
                let data = shapeData;
                if(defaultColor){
                    data.color_index = defaultColorIndex;
                    data.color = defaultColor;
                }
                shape = new SIShape(data)
            }
            if(shapeData.left){
                let data = shapeData;
                if(defaultColor){
                    data.color_index = defaultColorIndex;
                    data.color = defaultColor;
                }

                shape = new RLShape(data)
            }
            if(shapeData.front){
                let data = shapeData;
                if(defaultColor){
                    data.color_index = defaultColorIndex;
                    data.color = defaultColor;
                }
                shape = new BFShape(data)
            }
            shapes.push(shape)
        }
        return shapes;
    }

}

export default new AvatarFactory();