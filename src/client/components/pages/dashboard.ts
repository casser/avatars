import {Component,Inject} from "mangular/annotate";
import PublicLayoutTemplate from "../../template/pages/dashboard";
import {AvatarFactory} from '../../../shared/models/avatarfactory';
import {Generator} from '../../../shared/builder/generator';

@Component('dashboard',{
    template    : PublicLayoutTemplate,
})
class PublicLayout{
    private tabs:any;
    private selected:any;
    private previous:any;
    public scope:any;
    public sce:any;
    public avatar:any;
    public avatarSvg:any;
    constructor(@Inject('$scope') scope,@Inject('$sce') sce){
        this.sce= sce;
        this.selected = null;
        this.previous = null;
        this.scope =scope;
        this.getTabsData();
        this.getAvatars();
        scope.$watch('selectedIndex', (current, old)=>{
            this.selected = current;
        });
        scope.$watch(()=>{return this.avatar}, (newFoo, oldFoo)=>{
            this.avatarSvg = this.sce.trustAsHtml(Generator.makeSvg( this.avatar));
        },true);
    }



    getAvatars(){
        this.avatar =AvatarFactory.createRandomAvatar('female');
        this.avatarSvg = this.sce.trustAsHtml(Generator.makeSvg( this.avatar));
    }

    getTabsData(){
        this.tabs=[];
        var bodyZone = ['glasses','hair','backs','faceshape','eyesiris','eyesfront','eyebrows','mouth','nose','ears','clothes'];
        bodyZone.forEach((zone)=>{
            var shapeList =  AvatarFactory.getShapesByZone(zone);
            var item =  { title: zone, shapes: []};
            shapeList.map((shape)=>{
                item.shapes.push({svg:this.sce.trustAsHtml(Generator.makeSvg(shape)),model:shape})
            });
            this.tabs.push(item)
        })
    }

    clickShape(shape){
        let zone =this.tabs[this.selected].title;
        if(zone == 'eyesfront'){
            this.avatar.eyesback = AvatarFactory.getShapesByZone('eyesback')[shape.shape_index];
        }
        this.avatar[zone] = shape;
        window['avatar']=this.avatar;
    }

    removeTab(tab) {
        var index = this.tabs.indexOf(tab);
        this.tabs.splice(index, 1);
    };
}