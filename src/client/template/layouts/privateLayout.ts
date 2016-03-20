export default `
<section flex layout="row" style="min-height: 100%">
<div flex layout="column" tabIndex="-1" role="main" class="md-whiteframe-z2">
<md-toolbar class="md-whiteframe-glow-z1 site-content-toolbar">
  <div class="md-toolbar-tools">

    <h2>
      <span>{{$ctrl.root.title}}</span>
    </h2>
    <span flex></span>
    <md-button class="md-icon-button" aria-label="More">
        <md-icon style="color:#106CC8">more_vert</md-icon>
    </md-button>
  </div>
</md-toolbar>
<md-content ui-view>
</md-content>
</div>
</section>
`;