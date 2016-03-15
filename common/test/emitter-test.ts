import {Emitter} from "common/events";

console.info("Testing Emitter");
var emitter:Emitter = new Emitter();
emitter.emit('hello','gago','jan');

emitter.on('hello',(...args)=>{
    console.info('first',...args);
});
emitter.once('hello',(...args)=>{
    console.info('second',...args);
});
emitter.on('hello',(...args)=>{
    console.info('third',...args);
});
emitter.emit('hello','gago','jan');
emitter.emit('hello','gago','jan');
console.info(emitter.listeners('hello')[0]);
emitter.off('hello',emitter.listeners('hello')[0]);
emitter.on('hello',(...args)=>{
    console.info('forth',...args);
});
emitter.emit('hello','gago','jan');
emitter.emit('gago','gago','jan');
