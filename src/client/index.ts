/**
 * Created by Grigor on 2/19/16.
 */
import {AvatarFactory} from '../shared/models/avatarfactory';
import {Avatar} from '../shared/models/avatar';
import {Shape} from '../shared/models/shape';
import {SIShape} from '../shared/models/shape';
import {AvatarBuilder} from '../shared/builder/avatarbuilder';
import {ShapeBuilder} from '../shared/builder/shapebuilder';
import {Generator} from '../shared/builder/generator';
import {Utils} from '../shared/utils/utils';
export  class MyApp {
  constructor(){
      var avatar :Avatar =  AvatarFactory.createRandomAvatar('male');
      var avatarBuilder = new AvatarBuilder(avatar);
      document.getElementById('avatar').innerHTML = Generator.construct(avatarBuilder);
      var shapeList =  AvatarFactory.getShapesByZone('glasses');
      shapeList.map((shape)=>{
          document.getElementById('shape').innerHTML +=Generator.construct(new ShapeBuilder(shape));
      })
      setInterval(()=>{
          console.log("timeout");
          avatar.glasses = shapeList[Utils.getRandomInt(1,shapeList.length)];
          var avatarBuilder = new AvatarBuilder(avatar);
          document.getElementById('avatar').innerHTML = Generator.construct(avatarBuilder);

      },2000);
  }
}
export  default new MyApp();
