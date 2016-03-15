import {Rest, Result} from 'http/rest';
import {AvatarFactory} from '../../shared/models/avatarfactory';
import {Avatar} from '../../shared/models/avatar';
import {Shape} from '../../shared/models/shape';
import {SIShape} from '../../shared/models/shape';
import {AvatarBuilder} from '../../shared/builder/avatarbuilder';
import {ShapeBuilder} from '../../shared/builder/shapebuilder';
import {Generator} from '../../shared/builder/generator';
import {Field} from '../../shared/models/model';

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

