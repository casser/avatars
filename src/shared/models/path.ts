import {Field} from './model';
import {Model} from './model';
import {Collection} from './collection';
import {itemType} from './collection';

export class Path {
    constructor( data ) {
        for(var key in data){
            this[key] = data[key];
        }
    }
}

@itemType(Path)
export class Paths extends Collection{
    //constructor(data){
    //    super(data);
        //var __this = super();
        //__this.__proto__ = Paths.prototype;
        //__this.initialize(data);
        //return __this;
    //}
    //add(model){
    //    this.push(model);
    //}
    //initialize(paths){
    //
    //    paths.forEach((path)=>{
    //        this.add(new Path(path));
    //    })
    //}
}
