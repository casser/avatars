import {Directive,Inject} from "mangular/annotate"
import {Menu} from "../services/menu";

@Directive('menuLink',{
    scope       : {
        section: '='
    },
    template    : `
        <md-button  ng-class="{'active' : isSelected(section)}" ng-hash="{{section.url}}" ng-click="focusSection(section)">
            {{section.name}}
            <span class="md-visually-hidden" ng-if="isSelected(section)">
                current page
            </span>
        </md-button>
    `
})
class MenuLink {
    static menu :Menu;
    static location :any;

    constructor(@Inject Menu,@Inject('$location') location){
        MenuLink.location = location;
        MenuLink.menu = Menu;
    }

    static link(scope, elem, attrs) {
        scope.isSelected = function (section) {
            //console.log(MenuLink.menu.isSectionSelected(section));
            return MenuLink.menu.isPageSelected(scope.section)
        };
        scope.focusSection = function (section) {
            console.log('focusSection',section);
            MenuLink.location.path(section.url);
        };
    }


}