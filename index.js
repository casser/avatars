require('./out/runtime/package');
System.import('avatars/server').catch(function(e){
    console.error(e.stack);
    process.exit(1);
});