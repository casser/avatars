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

export function Field(...args){
    return decorate(args,(def:Definition,service?:string)=>{
        if(def instanceof Field && def instanceof Member) {
            let field = {};
            field[def.name] = def.type;
            var metaData :any = def.owner.getMetadata('field:type') || {};

            if(!metaData.fields){
                metaData.fields = {};
            }
            metaData.fields[def.name] = def.type;

            //temporary solution
            console.log((def.owner.parent)?"true":"false");
            if(def.owner.parent.constructor !== Model ){
                var parentMetadata =  Reflect.getMetadata('field:type',def.owner.parent.constructor);
                var parentFields = parentMetadata.fields;
                Object.keys(parentFields).forEach((field)=>{

                    if( !metaData.fields[field]){
                        metaData.fields[field] = parentFields[field];
                    }
                })
            }
            def.owner.setMetadata( 'field:type' , metaData );
        }else{
            throw new Error("Wrong target for 'Field' "+def.name);
        }
    });
}

export class Model{

    get fields(){
        var metadata =  Reflect.getMetadata('field:type',this.constructor);
        return metadata.fields;
    }

    constructor ( data ){
        //TODO add simple type parsing
        var fields = this.fields;
        for(var key in data){
            if(fields.hasOwnProperty(key) ){
                var Type = fields[key];
                if(Type != undefined ){
                    this[key]= new Type(data[key]);
                    //this[key] = temp.initialize(data[key])
                }else{
                    //temporary solution
                    this[key] = (data[key]);
                }
            }
        }
    }
}
