import {Service,Inject} from "mangular/annotate";

@Service
export class Menu {

    public sections:any;
    private location:any;
    private openedSection:any;
    private currentPage:any;
    private currentSection:any;

    constructor(@Inject('$location') location, @Inject('$rootScope') rootScope){
        this.location = location
        var sections :any = [
            {
                "name": "Svg",
                "type": "heading",
                "children": [
                    {
                        "name": "Avatar",
                        "type": "toggle",
                        "pages": [
                            {
                                "name": "Male",
                                "url": "pages1_1",
                                "type": "link",
                            },{
                                "name": "Female",
                                "url": "pages1_1",
                                "type": "link",
                            }
                        ]
                    },
                ]
            }
        ];
        this.sections = sections;
        rootScope.$on('$locationChangeSuccess', this.onLocationChange.bind(this));
        this.onLocationChange();//temporary solution
    }

    selectSection(section){
        this.openedSection = section;
    }

    toggleSelectSection(section) {
        this.openedSection = (this.openedSection === section ? null : section);
    }

    isSectionSelected  (section) {
        return this.openedSection === section;
    }

    selectPage (section, page) {
        this.currentSection = section;
        this.currentPage = page;
    }

    isPageSelected(page){
        return this.currentPage === page;
    }
    
    onLocationChange(){
        var path = this.location.path();
        var _this = this;
        var matchPage = function(section, page) {
            if (path.indexOf(page.url) !== -1) {
                _this.selectSection(section);
                _this.selectPage(section, page);
            }
        };
        this.sections.forEach(function(section:any) {
            if (section.children) {
                // matches nested section toggles, such as API or Customization
                section.children.forEach((childSection:any)=>{
                    if(childSection.pages){
                        childSection.pages.forEach(function(page){
                            matchPage(childSection, page);
                        });
                    }
                });
            }
            else if (section.pages) {
                // matches top-level section toggles, such as Demos
                section.pages.forEach(function(page) {
                    matchPage(section, page);
                });
            }
            else if (section.type === 'link') {
                // matches top-level links, such as "Getting Started"
                matchPage(section, section);
            }
        });
    }
}