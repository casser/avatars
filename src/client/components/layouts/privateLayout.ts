import {Component,Inject} from "mangular/annotate";
import PrivateLayoutTemplate from "../../template/layouts/privateLayout";
import {Menu} from "../../services/menu";

@Component('wcPrivateLayout',{
    template    : PrivateLayoutTemplate,
})
class PrivateLayoutComponent {

    private $mdSidenav:any;
    private menu:Menu;
    private root:any;

    constructor(@Inject('Menu') menu,@Inject('$mdSidenav') $mdSidenav, @Inject('$rootScope') root){
        this.menu = menu;
        this.root = root;
        this.$mdSidenav = $mdSidenav;
    }

    toggleList(){
        this.$mdSidenav('left').toggle();
    }

    isOpen (section) {
        return this.menu.isSectionSelected(section);
    }
    toggleOpen (section) {
        this.menu.toggleSelectSection(section);
    }

    getMenuSection(){
        return this.menu.sections;
    }
    focusSection(){
    }
}
