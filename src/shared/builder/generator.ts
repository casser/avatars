/**
 * Created by Grigor on 12/18/15.
 */
export class Generator{
    static  construct(builder:any){
        builder.renderTemplate();
        builder.renderShapes();
        return builder.toSvg;
    }
}
export default new Generator();