import {Component,Inject} from "mangular/annotate";
import PublicLayoutTemplate from "../../template/layouts/publicLayout";

@Component('wcPublicLayout',{
    template    : PublicLayoutTemplate,
})
class PublicLayout{
    constructor(){
    }
}