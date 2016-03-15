import {Rest, Result} from 'http/rest';
import {AvatarFactory} from '../models/avatarfactory';
import {Avatar} from '../models/avatar';
import {Shape} from '../models/shape';
import {SIShape} from '../models/shape';
import {AvatarBuilder} from '../services/builder/avatarbuilder';
import {ShapeBuilder} from '../services/builder/shapebuilder';
import {Generator} from '../services/builder/generator';
import {Field} from '../models/model';

@Rest('/avatar')
class ResourceAvatar {
    get(){
        var avatar :Avatar =  AvatarFactory.createRandomAvatar('male');
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

