import Bullet from "../element/Bullet";
import Tank from "../element/Tank";
import Wall from "../element/Wall";

// 存储共用数据
export class Bus {
    private static tankArr:Tank[]=[];
    private static bulletArr:Bullet[]=[];
    private static wallArr:Wall[]=[];

    static getTankArr():Tank[]{
        return Bus.tankArr;
    }
    static getBulletArr():Bullet[]{
        return Bus.bulletArr;
    }
    static getWallArr():Wall[]{
        return Bus.wallArr;
    }

    static pushTankToTankArr(tank:Tank){
        Bus.tankArr.push(tank);
    }
    static pushBulletToBulletArr(bullet:Bullet){
        Bus.bulletArr.push(bullet);
    }
    static pushWallToWallArr(wall:Wall){
        Bus.wallArr.push(wall);
    }

    static removeTankFromMyTankArr(tank:Tank){
        Bus.tankArr = Bus.tankArr.filter(item=>item !== tank);
    }
    static removeBulletFromBulletArr(bullet:Bullet){
        Bus.bulletArr = Bus.bulletArr.filter(item=>item !== bullet);
    }
    static removeWallFromWallArr(wall:Wall){
        Bus.wallArr = Bus.wallArr.filter(item=>item!== wall);
    }
}