/**
 * Created by Grigor on 12/14/15.
 */

import {Field} from './model';
import {Model} from './model';
import {Paths} from './path';

export class Shape extends Model{

        @Field
        shape_index           :Number;

        @Field
        color_index           :Number;

        @Field
        color                 :String;

}

export class SIShape extends Shape{

        @Field
        single           :Paths;

}
export class RLShape extends Shape{

        @Field
        left       :Paths;

        @Field
        right    :Paths;


}
export class BFShape extends Shape{

        @Field
        back       :Paths;

        @Field
        front    :Paths;

}
