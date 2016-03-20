/**
 * Created by Grigor on 12/18/15.
 */
import {Builder} from './builder'
import {Xml} from '../utils/xml';
import Utils from '../utils/utils';
import {Avatar} from '../models/avatar';
import {Shape} from '../models/shape';
import {SIShape} from '../models/shape';
import {BFShape} from '../models/shape';
import {RLShape} from '../models/shape';
import {Paths} from '../models/path';


export class AvatarBuilder extends Builder{

    private model:Avatar;

    constructor(model:Avatar){
        super();
        this.model = model;
        this.isCanvasDrawing = true;
        this.skinColor = model.skinColor
    }

    renderTemplate(){
        //TODO  check for male female
        this.template =
            Xml.node('svg',{
                "id":"svg-canvas",
                "viewBox":"0 0 200 200",
                "xmlns":"http://www.w3.org/2000/svg",
                "version":"1.1"},[
                Xml.node('defs',{"id":"definition"}),
                Xml.node('g',{"id":"svga-group-wrapper"},[
                    Xml.node('g',{"id":"backs-single"}),
                    Xml.node('g',{"id":"svga-group-subwrapper"}, [
                        Xml.node('g',{"id":"hair-back"}),
                        Xml.node('g',{"id":"humanbody-single"}),
                        Xml.node('g',{"id":"chinshadow-single"}),
                        Xml.node('g',{"id":"clothes-single" }),
                        Xml.node('g',{"id":"svga-group-head"},[
                            Xml.node('g',{"id":"ears-left"}),
                            Xml.node('g',{"id":"ears-right"}),
                            Xml.node('g',{"id":"svga-group-faceshape-wrap"},[
                                Xml.node('g',{"id":"faceshape-single"})
                            ]),
                            Xml.node('g',{"id":"mouth-single"}),
                            Xml.node('g',{"id":"svga-group-eyes-left"},[
                                Xml.node('g',{"id":"eyesback-left"}),
                                Xml.node('g',{"id":"eyesiriswrapper-left"},[
                                    Xml.node('g',{"id":"svga-group-eyesiriscontrol-left"},[
                                        Xml.node('g',{"id":"eyesiris-left"})
                                    ])
                                ]),
                                Xml.node('g',{"id":"eyesfront-left" })
                            ]),
                            Xml.node('g',{"id":"svga-group-eyes-right"},[
                                Xml.node('g',{"id":"eyesback-right"}),
                                Xml.node('g',{"id":"eyesiriswrapper-right"},[
                                    Xml.node('g',{"id":"svga-group-eyesiriscontrol-right"},[
                                        Xml.node('g',{"id":"eyesiris-right"})
                                    ])
                                ]),
                                Xml.node('g',{"id":"eyesfront-right"})
                            ]),
                            Xml.node('g',{"id":"facehighlight-single"}),
                            Xml.node('g',{"id":"eyebrows-left"}),
                            Xml.node('g',{"id":"eyebrows-right"}),
                            Xml.node('g',{"id":"nose-single"}),
                            Xml.node('g',{"id":"svga-group-beardwrap"},[
                                Xml.node('g',{"id":"beard-single"})
                            ]),
                            Xml.node('g',{"id":"mustache-single"}),
                            Xml.node('g',{"id":"hair-front"}),
                            Xml.node('g',{"id":"glasses-single"})
                        ])
                    ])
                ])
                ]
            );

    }

    //correctIrisPosition(x,y,position){
    //    this.template.findById(`eyesiriswrapper-${position}`).attribute('transform',`translate(${x} ${y})`);
    //}


    renderSIShape( key , shape:SIShape){
        this.template.findById(key+"-single").childs(this.renderPaths(shape.single , shape));
    }

    renderRLShape( key , shape:RLShape){
        this.template.findById(key+"-left").childs(this.renderPaths(shape.left , shape,'left'));
        this.template.findById(key+"-right").childs(this.renderPaths(shape.right , shape,'right'));
    }

    renderBFShape( key , shape:BFShape){
        this.template.findById(key+"-back").childs(this.renderPaths(shape.back , shape));
        this.template.findById(key+"-front").childs(this.renderPaths(shape.front , shape));
    }

    renderShape( key , shape:Shape){

        if(shape instanceof SIShape){
            this.renderSIShape(key , shape);
        }
        if(shape instanceof RLShape){
            this.renderRLShape(key , shape);
        }
        if(shape instanceof BFShape){
            this.renderBFShape(key , shape);
        }

    }

    renderShapes(){
        for(var key in this.model){
            if(this.model[key] instanceof Shape){
                this.renderShape( key , this.model[key] )
            }
        }

    }
}