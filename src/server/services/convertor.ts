const RSVG = require('librsvg');
export class Convertor {
    static convert(buffer,width,height){
        return new Promise((resolve,reject)=>{
            var svg = new RSVG.Rsvg();
            console.log("gago");
            console.log(svg.on);
            svg.on('finish', function() {
                console.log('SVG width: ' + svg.width);
                console.log('SVG height: ' + svg.height);
                resolve(svg.render({
                    format  : 'png',
                    width   : width,
                    height  : height
                }).data);
            });
            svg.on('error', function(e) {
                console.log('SVG error: ' + e.stack);
                reject(e);
            });
            svg.write(buffer);
            svg.end();
        });
    }
}
