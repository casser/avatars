import {Rest, Result} from 'http/rest';
import {AvatarFactory} from '../../shared/models/avatarfactory';
import {Avatar} from '../../shared/models/avatar';
import {Shape} from '../../shared/models/shape';
import {SIShape} from '../../shared/models/shape';
import {AvatarBuilder} from '../../shared/builder/avatarbuilder';
import {ShapeBuilder} from '../../shared/builder/shapebuilder';
import {Generator} from '../../shared/builder/generator';
import {Field} from '../../shared/models/model';
import {Convertor} from '../services/convertor';
const RSVG = require('librsvg');
@Rest('/avatar/png')
class ResourceAvatar {
    get(){
        var avatar :Avatar =  AvatarFactory.createRandomAvatar('female');
        var avatarBuilder = new AvatarBuilder(avatar);
            return Convertor.convert(Generator.construct(avatarBuilder),600,600).then(png=>{
                return Result.create(png,200,{
                    'Content-Type':'image/png'
                });
            });

    }
}

@Rest('/avatar/svg')
class ResourceAvatarSvg {
    get(){
        var avatar :Avatar =  AvatarFactory.createRandomAvatar('female');
        var avatarBuilder = new AvatarBuilder(avatar);
        return Result.create(Generator.construct(avatarBuilder),200,{
            'Content-Type':'image/svg+xml'
        });
    }
}



@Rest('/item')
class ResourceShape {
    get(){
        var shape :Shape =  AvatarFactory.getTestShape();
        var shapeBuilder = new ShapeBuilder(shape);
        return Result.create(Generator.construct(shapeBuilder),200,{
            'Content-Type':'image/svg+xml'
        });
    }
}

