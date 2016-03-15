import {Field,Model} from './model';

import {SIShape} from './shape';
import {BFShape} from './shape';
import {RLShape} from './shape';
const METADATA = Symbol.for('field:type');


export class Avatar extends Model{

    @Field
    public backs           :SIShape;

    @Field
    public humanbody       :SIShape;

    @Field
    public clothes          :SIShape;

    @Field
    public facehighlight   :SIShape;

    @Field
    public chinshadow      :SIShape;

    @Field
    public faceshape       :SIShape;

    @Field
    public hair            :BFShape;

    @Field
    public mustache        :SIShape;

    @Field
    public beard           :SIShape;

    @Field
    public glasses         :SIShape;

    @Field
    public mouth           :SIShape;

    @Field
    public nose            :SIShape;

    @Field
    public ears            :RLShape;

    @Field
    public eyebrows        :RLShape;

    @Field
    public eyesiris        :RLShape;

    @Field
    public eyesfront       :RLShape;

    @Field
    public eyesback        :RLShape;

    get skinColor(){
        return this.faceshape.color;
    }

}

