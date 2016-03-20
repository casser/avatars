import {Directive,Inject} from "mangular/annotate"
import {Menu} from "../services/menu";

@Directive('menuToggle',{
    scope       : {
        section: '='
    },
    template    : `
    <md-button class="md-button-toggle" ng-click="toggle()"
        aria-controls="docs-menu-{{section.name}}"
        aria-expanded="{{isOpen()}}">
        <div flex layout="row">
            {{section.name}}
            <span flex></span>
            <span aria-hidden="true" class="md-toggle-icon"
            ng-class="{'toggled' : isOpen()}">
              <md-icon md-svg-src="md-toggle-arrow"></md-icon>
            </span>
        </div>
      <span class="md-visually-hidden">
        Toggle {{isOpen()? 'expanded' : 'collapsed'}}
      </span>
    </md-button>

    <ul id="docs-menu-{{section.name}}" class="menu-toggle-list">
      <li ng-repeat="page in section.pages">
        <menu-link section="page"></menu-link>
      </li>
    </ul>
    `
})
class MenuToggle {

    static menu :Menu;
    static mdUtil :any;
    static timeout :any;

    constructor(@Inject Menu,@Inject('$mdUtil') mdUtil,@Inject('$timeout') timeout){
        MenuToggle.menu = Menu;
        MenuToggle.mdUtil = mdUtil;
        MenuToggle.timeout = timeout;
    }
    static link(scope, elem, attrs) {
        scope.isOpen = function() {
            return  MenuToggle.menu.isSectionSelected(scope.section);
        };
        scope.toggle = function() {
            MenuToggle.menu.toggleSelectSection(scope.section);
        };
        MenuToggle.mdUtil.nextTick(function() {
            scope.$watch(
                function () {
                    return  MenuToggle.menu.isSectionSelected(scope.section);
                },
                function (open) {
                    var $ul = elem.find('ul');
                    var targetHeight = open ? getTargetHeight() : 0;
                    MenuToggle.timeout(function () {
                        $ul.css({height: targetHeight + 'px'});
                    }, 0, false);
                    function getTargetHeight() {
                        var targetHeight;
                        $ul.addClass('no-transition');
                        $ul.css('height', '');
                        targetHeight = $ul.prop('clientHeight');
                        $ul.css('height', 0);
                        $ul.removeClass('no-transition');
                        return targetHeight;
                    }
                }
            );
        });

    }
}