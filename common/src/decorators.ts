import Definition = Reflect.Definition;
import Member = Reflect.Member;

export function decorate(args:any[], fn:Function):any{
    var def:Definition;
    switch(typeof args[0]){
        case 'function':
        case 'object':
            def = Definition.for(args[0],args[1],args[2]);
            break;
    }
    return def ? fn(def,args[0],args[1],args[2]) : (target,key,desc)=>{
        fn(def = Definition.for(target,key,desc),target,key,desc,...args)
    };
}

export function Cached(...args):any {
    return decorate(args,(def:Definition,target,key,desc,enumerable=false,writable=false,configurable=true)=>{
        if(def instanceof Member){
            var getter = desc.get;
            desc.get = function () {
                try {
                    return Object.defineProperty(this, key, <any>{
                        enumerable,writable,configurable,
                        value: getter.call(this)
                    })[key];
                }catch(ex){
                    return Object.defineProperty(this, key, <any>{
                        configurable : true,
                        writable     : true,
                        value        : undefined
                    })[key]
                }
            };
            return desc;
        }
    });
}