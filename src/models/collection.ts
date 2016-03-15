/**
 * Created by Grigor on 12/17/15.
 */
import Definition = Reflect.Definition;
import Method = Reflect.Method;
import Module = Reflect.Module;
import Param = Reflect.Param;
import Field = Reflect.Field;
import Member = Reflect.Member;
import Class = Reflect.Class;


function decorate(args:any[],fn:Function):any{
    var def:Definition;
    switch(typeof args[0]){
        case 'function':
        case 'object':
            def = Definition.for(args[0],args[1],args[2]);
            break;
    }
    return def ? fn(def) : (target,key,desc)=>{
        fn(def = Definition.for(target,key,desc),...args)
    };
}

export function itemType(...args){
    return decorate(args,(def:Definition,type?:string)=>{
        if(def instanceof Class) {
            def.setMetadata('item:type',type);
        }else{
            throw new Error("Wrong target for 'itemType' "+def.name);
        }
    });
}



export class Collection{

    public models : any[];
    public length : number;

    get modelType(){
        return Reflect.getMetadata('item:type',this.constructor);
    }

    constructor ( dataCollection ) {
        this.models = [];
        if(!(dataCollection instanceof Array)){
            throw new Error('data passed to collection must be array');
        }
        dataCollection.forEach((data) => {
            this.models.push(new this.modelType(data))
        });
        this.length = dataCollection.length;
    }
    each(callback){
        return this.models.forEach(callback);
    }
    at(index){
        return this.models[index];
    }
}