export default `
<div layout="row" >
  <div flex="50" flex-xs="100" class="md-padding">
    <md-card>
        <div ng-bind-html="$ctrl.avatarSvg" ></div>
        <md-card-actions layout="row" layout-align="end center">
          <md-button>Action 1</md-button>
          <md-button>Action 2</md-button>
        </md-card-actions>
    </md-card>
  </div>
    <div flex="50" flex-xs="100">
  <md-content class="md-padding">
     <md-tabs md-selected="selectedIndex" md-border-bottom md-dynamic-height>
      <md-tab ng-repeat="tab in $ctrl.tabs"
              ng-disabled="tab.disabled"
              label="{{tab.title}}">
        <div class="tab{{$index%4}}" style="padding: 25px; text-align: center;">
            <md-grid-list
                md-cols-gt-md="6"   md-cols-md="4" md-cols-sm="3"
                md-row-height="1:1"
                md-gutter="25px">
                <md-grid-tile ng-repeat="shape in tab.shapes">
                    <div ng-bind-html="shape.svg" ng-click="$ctrl.clickShape(shape.model)"></div>
                </md-grid-tile>
            </md-grid-list>
          <br/>
          <!--<md-button class="md-primary md-raised" ng-click="$ctrl.removeTab( tab )" ng-disabled="tabs.length <= 1">Remove Tab</md-button>-->
        </div>
      </md-tab>
    </md-tabs>
  </md-content>
      </div>
</div>
`;