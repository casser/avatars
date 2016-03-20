/**
 * Created by Grigor on 12/18/15.
 */
import {Avatar} from '../models/avatar'
import {Shape} from '../models/shape'
import {AvatarBuilder} from './avatarbuilder'
import {ShapeBuilder} from './shapebuilder'
export class Generator{
    static  construct(builder:any){
        builder.renderTemplate();
        builder.renderShapes();
        return builder.toSvg;
    }

    static makeSvg(model:Shape|Avatar){
        if(model instanceof Avatar){
            return this.construct(new AvatarBuilder(model));
        }
        return this.construct(new ShapeBuilder(model))
    }
}

export default new Generator();