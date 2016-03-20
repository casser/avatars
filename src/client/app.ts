/**
 * Created by Grigor on 2/19/16.
 */
import {AvatarFactory} from '../shared/models/avatarfactory';
import {Generator} from '../shared/builder/generator';
import {Avatar} from '../shared/models/avatar';
import {Shape} from '../shared/models/shape';
import {SIShape} from '../shared/models/shape';
import {Utils} from '../shared/utils/utils';
export  class MyApp {
  constructor(){
      var avatar :Avatar =  AvatarFactory.createRandomAvatar('male');
      document.getElementById('avatar').innerHTML = Generator.makeSvg(avatar);
      var shapeList =  AvatarFactory.getShapesByZone('glasses');
      shapeList.map((shape)=>{
          document.getElementById('shape').innerHTML +=Generator.makeSvg(shape);
      });
      setInterval(()=>{
          console.log("timeout");
          avatar.glasses = shapeList[Utils.getRandomInt(1,shapeList.length)];
          document.getElementById('avatar').innerHTML = Generator.makeSvg(avatar);

      },2000);
  }
}
export  default new MyApp();
