/**
 * Created by Grigor on 12/18/15.
 */
import {Builder} from './builder'
import {Xml} from '../../utils/xml';
import Utils from '../../utils/utils';
import {Avatar} from '../../models/avatar';
import {Shape} from '../../models/shape';
import {SIShape} from '../../models/shape';
import {BFShape} from '../../models/shape';
import {RLShape} from '../../models/shape';
import {Paths} from '../../models/path';



export class ShapeBuilder extends Builder{

    private model:any;

    constructor(shape:any){
        super();
        this.model = shape;
        this.isCanvasDrawing = false;
        this.skinColor = "#f0c7b1";//default skin color;

    }

    renderTemplate(){
        this.template =
            Xml.node('svg',{
                    "id":"svg-element",
                    "viewBox":"0 0 200 200",
                    "xmlns":"http://www.w3.org/2000/svg",
                    "version":"1.1"},[
                    Xml.node('g',{"id":"svga-group-wrapper"}),
                    Xml.node('defs',{"id":"definition"})
                ]
            );
    }

    renderSIShape(){
        this.template.findById("svga-group-wrapper").childs(this.renderPaths(this.model.single , this.model));
    }
    renderRLShape(){
        this.template.findById("svga-group-wrapper").childs(this.renderPaths(this.model.right , this.model));
    }
    renderBFShape(){
        this.template.findById("svga-group-wrapper").childs(this.renderPaths(this.model.back , this.model));
        this.template.findById("svga-group-wrapper").childs(this.renderPaths(this.model.front , this.model));
    }

    renderShapes(){

        if(this.model  instanceof SIShape){
            this.renderSIShape();
        }
        if(this.model  instanceof RLShape){
            this.renderRLShape();
        }
        if(this.model  instanceof BFShape){
            this.renderBFShape();
        }
    }
}