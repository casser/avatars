/**
 * Created by Grigor on 12/18/15.
 */
import {Xml,XmlNode} from '../utils/xml';
import Utils from '../utils/utils';
import {Paths} from '../models/path';
import {Shape} from '../models/shape';

export class Builder{

    protected template:XmlNode;
    protected isCanvasDrawing:any;
    protected skinColor:any


    constructor(){

    }

    get toSvg(){
        return this.template.toString();
    }

    shadeBlend(p,c0,c1?) {
        var n=p<0?p*-1:p,u=Math.round,w=parseInt;
        if(c0.length>7){
            var f:any=c0.split(","),t:any=(c1?c1:p<0?"rgb(0,0,0)":"rgb(255,255,255)").split(","),R=w(f[0].slice(4)),G=w(f[1]),B=w(f[2]);
            return "rgb("+(u((w(t[0].slice(4))-R)*n)+R)+","+(u((w(t[1])-G)*n)+G)+","+(u((w(t[2])-B)*n)+B)+")"
        }else{
            var f:any=w(c0.slice(1),16),t:any=w((c1?c1:p<0?"#000000":"#FFFFFF").slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF;
            return "#"+(0x1000000+(u(((t>>16)-R1)*n)+R1)*0x10000+(u(((t>>8&0x00FF)-G1)*n)+G1)*0x100+(u(((t&0x0000FF)-B1)*n)+B1)).toString(16).slice(1)
        }
    }

    getModifiedColor (color,type){
        //type may be a color
        if(type.indexOf("#")!=-1){
            return type;
        }
        var mColor = color;
        switch (type) {
            case 'none': {
                mColor = "none";
                break;
            }
            case 'tone':
            {
                mColor = color;
                break;
            }
            case 'sd1': {
                mColor = this.shadeBlend(-0.1,color);
                break;
            }
            case 'sd2': {
                mColor = this.shadeBlend(-0.2,color);
                break;
            }
            case 'sd05': {
                mColor = this.shadeBlend(-0.09,color);
                break;
            }
            case 'sd3': {
                mColor = this.shadeBlend(-0.3,color);
                break;
            }
            case 'sd35': {
                mColor = this.shadeBlend(-3.5,color);
                break;
            }
            case 'hl05': {
                mColor = this.shadeBlend(0.09,color);
                break;
            }
            case 'hl1': {
                mColor = this.shadeBlend(0.1,color);
                break;
            }
            case 'hl2': {
                mColor = this.shadeBlend(0.2,color);
                break;
            }
            default: {
                break;
            }
        }
        return mColor;
    };

    applyGradient( path, color   ){
        var defNode ,id;
        var gradChildNode =[];
        path.gradientStops.map(stop=>{
            let stopNode = Xml.node('stop',{
                'stop-opacity':stop.opacity,
                'stop-color': this.getModifiedColor(color,stop.color),
                'offset':stop.offset
            },[]);
            gradChildNode.push(stopNode);
        });
        switch (path.type) {
            case 'radial':
                id = "radialgradient-"   + Utils.getRandomInt(500, 1500);
                defNode = Xml.node('radialGradient', {
                    cx: path.cx,
                    cy: path.cy,
                    r: path.r,
                    gradientUnits: path.gradientUnits,
                    gradientTransform: (path.gradientTransform)?path.gradientTransform:"",

                    id: id
                }, gradChildNode);
                break;
            case 'linear':
                id = "lineargradient-"   + Utils.getRandomInt(500, 1500);
                defNode = Xml.node('linearGradient', {
                    x1: path.x1,
                    x2: path.x2,
                    y1: path.y1,
                    y2: path.y2,
                    gradientTransform: (path.gradientTransform)?path.gradientTransform:"",
                    id: id
                }, gradChildNode);
                break;
        }
        this.template.findById("definition").child(defNode)
        return "url(#"+id+")";
    };

    correctIrisPosition(x,y,position){
        this.template.findById(`eyesiriswrapper-${position}`).attribute('transform',`translate(${x} ${y})`);
    }


    renderPaths(paths:Paths,shape:Shape,position = null){
        //TODO if no need shape model then change to get just shape color instead whole model
        let shapeColor = shape.color ,
            pathsNode  = [];
        var isHair = false;
        paths.each((item , index)=>{
            if(item.irisx && item.irisy && this.isCanvasDrawing && (position=='left'|| position=="right")){
                this.correctIrisPosition(item.irisx, item.irisy,position)
            }
            if((this.isCanvasDrawing && !item.hideoncanvas) || !(this.isCanvasDrawing) && !item.hideonthumbs ){
                let color = (item.fromskin)
                    ? this.skinColor
                    : shapeColor;
                let attr = {
                    'd'                 : item.path,
                    'opacity'           : item.opacity,
                    'fill'              : (item.fill == "gradient") ? this.applyGradient(item,color) : this.getModifiedColor(color , item.fill ),
                    'stroke'            : this.getModifiedColor( color , item.stroke ),
                    'stroke-width'      : (item.strokeWidth) ? item.strokeWidth : 'inherit',
                    'stroke-miterlimit' : (item.strokeMiterlimit) ? item.strokeMiterlimit : 'inherit'
                };
                pathsNode.push(Xml.node('path',attr));
            }
        });
        return pathsNode;
    }

}