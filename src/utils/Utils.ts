
import Game from "../Game";
import { BaseObjDirection } from "../element/BaseObjAbstract";
import Bullet from "../element/Bullet";
import Tank from "../element/Tank";
import Wall from "../element/Wall";
import { Bus } from "./Bus";

export type HTMLElePropType = Tank | Wall | Bullet;

export enum MapWallEle {
    fence = "fence",
    wood = "wood",
    // 草地
    grass = "grass",
    // 砖
    brick = "brick",
    // 铁块
    iron = "iron",
    // 我方老大
    boss = "boss",
    // 升级星标
    star = "start1",
    star2 = "start2",
}
export enum MapBulletEle {
    bullet1 = "bullet1",
    bullet2 = "bullet2",
    bullet3 = "bullet3",
    bullet4 = "bullet4",
    bullet5 = "bullet5",
}
export enum MapTankEle {
    my = "my",
    // 敌人1,2,3....
    enemy1 = "tank1",
    enemy2 = "tank2",
    enemy3 = "tank3",
    enemy4 = "tank4",
    enemy5 = "tank5",
};
export type MapEle = (MapWallEle | MapBulletEle | MapTankEle);

export default class Utils {

    // 创建div元素 单位%
    static createHTMLEle(width: number, height: number, posX: number, posY: number, img: string, deg: number, animation: string, type: HTMLElePropType | undefined): HTMLDivElement {
        let htmlELe = document.createElement("div");
        htmlELe.style.cssText = `
            width:${width}vw;
            height:${height}vh;
            left:${posX}vw;
            top:${posY}vh;
            background:url(./assets/${img});
            background-size:100% 100%;
            background-repeat:no-repeat;
            position:absolute;
            transform:rotate(${deg}deg); 
            animation:${animation};
            z-index:${type instanceof Wall ? 1 : 2};
        `
        return htmlELe;
    }
    // 创建对象
    static createObjEleByMapEleName(
        mapEleName: MapEle,
        width: number,
        height: number,
        posX: number,
        posY: number,
        direction: BaseObjDirection,
        game: Game,
        parent: HTMLElePropType|undefined,
        speed: number,
        blood: number,
        level: number
    ): HTMLElePropType | undefined {
        let htmlEle: HTMLDivElement | undefined = undefined;
        let objEle = undefined;
        // 创建对象策略
        let objEleStrategys = [
            // wall
            [
                () => Object.values(MapWallEle).some(wall => wall === mapEleName),
                () => {
                    let wall = new Wall(
                        height,
                        width,
                        posX,
                        posY,
                        level,
                        blood,
                        direction,
                        speed,
                        htmlEle,
                        parent,
                        mapEleName,
                        game
                    );
                    (mapEleName !== MapWallEle.grass) && Bus.pushWallToWallArr(wall);
                    return wall;
                }
            ],
            // tank
            [
                () => Object.values(MapTankEle).some(tank => tank === mapEleName),
                () => {
                    let scale = .7;
                    let trans = .2
                    height = height * scale;
                    width = width * scale;
                    posX = posX + width * trans;
                    posY = posY + height * trans;

                    let tank = new Tank(
                        height,
                        width,
                        posX,
                        posY,
                        level,
                        blood,
                        direction,
                        speed,
                        htmlEle,
                        parent,
                        mapEleName,
                        game
                    );
                    Bus.pushTankToTankArr(tank);
                    return tank;
                }
            ],
            [
                () => Object.values(MapBulletEle).some(bullet => bullet === mapEleName),
                () => {
                    let bullet = new Bullet(
                        height,
                        width,
                        posX,
                        posY,
                        level,
                        blood,
                        direction,
                        speed,
                        htmlEle,
                        parent,
                        mapEleName,
                        game
                    );
                    Bus.pushBulletToBulletArr(bullet);
                    return bullet;
                }
            ],
        ];
        let objEleStrategy = objEleStrategys.find(item => item[0]());
        objEleStrategy && (objEle = objEleStrategy[1]() as HTMLElePropType);
        return objEle;
    }
    // 创建动画
    static createAnimationByMapEleName(mapEleName: MapEle): string {
        let animation = ""
        let animationsStrategys = [
            [MapWallEle.boss, "dance 1s linear infinite"],
            [MapWallEle.star, "rotate 10s linear infinite"],
            [MapWallEle.star2, "rotate 10s linear infinite"],
            [MapTankEle.my, "border 10s linear"],
            [MapTankEle.enemy1, "border 5s linear"],
            [MapTankEle.enemy2, "border 5s linear"],
            [MapTankEle.enemy3, "border 5s linear"],
            [MapTankEle.enemy4, "border 5s linear"],
            [MapTankEle.enemy5, "border 5s linear"],
        ];
        let animationsStrategy = animationsStrategys.find(item => item[0] === mapEleName);
        (animationsStrategy && (animation = animationsStrategy[1] as string));
        return animation
    }
    // 给元素添加闪烁
    static addBlink(htmlELe: HTMLDivElement) {
        let classList = htmlELe.classList
        if (classList.contains("attack1")) {
            classList.add("attack2");
            classList.remove("attack1");
        } else {
            classList.add("attack1");
            classList.remove("attack2");
        }
    }
    // 创建图片
    static createImgByMapEle(mapEleName: MapEle): string {
        let img = "";
        // 根据分类 创建对应的图片路径
        let imgStrategys = [
            [
                () => Object.values(MapWallEle).some(wall => wall === mapEleName),
                () => `wall/${mapEleName}.png`
            ],
            [
                () => Object.values(MapTankEle).some(tank => tank === mapEleName),
                () => `tank/${mapEleName}.png`
            ],
            [
                () => Object.values(MapBulletEle).some(bullet => bullet === mapEleName),
                () => `bullet/${mapEleName}.png`
            ],
        ];
        let imgStrategy = imgStrategys.find(item => item[0]());
        imgStrategy && (img = imgStrategy[1]() as string);
        return img;
    }
    // 改变元素位置
    static renderEle(target: HTMLDivElement, posX: number, posY: number, direction: BaseObjDirection) {
        let deg = Utils.convertDirectionToDeg(direction);
        target.style.cssText += `
            transform:rotate(${deg}deg); 
            left:${posX}vw;
            top:${posY}vh;
        `;
    }
    // 根据方向返回角度
    static convertDirectionToDeg(direction: BaseObjDirection): number {
        switch (direction) {
            case "up":
                return 0;
            case "down":
                return 180;
            case "left":
                return -90;
            case "right":
                return 90;
            default:
                return 0;
        }
    }
    // 返回一个随机方向
    static getRandomDirection(): BaseObjDirection {
        let random = Math.floor(Math.random() * 4);
        let direction: BaseObjDirection[] = ["up", "down", "left", "right"];
        return direction[random];
    }
    // 检测两个物体是否碰撞
    static isCollision(targetA: HTMLElePropType, targetB: HTMLElePropType): boolean {
        // 方块的左上角为坐标点计算-》移动到方块中心位置
        if (
            targetA.getPosX() < targetB.getPosX() + targetB.getWidth() &&
            targetA.getPosX() + targetA.getWidth() > targetB.getPosX() &&
            targetA.getPosY() < targetB.getPosY() + targetB.getHeight() &&
            targetA.getPosY() + targetA.getHeight() > targetB.getPosY()
        ) {
            return true
        }
        return false;
    }
    // 检测一个物体与多个类别 碰撞 返回这个碰撞的物体
    static checkCollision(target: HTMLElePropType, types: HTMLElePropType[]): HTMLElePropType | undefined {
        let tankArr: Tank[] = [];
        let bulletArr: Bullet[] = [];
        if (target instanceof Bullet) {
            tankArr = Bus.getTankArr();
            bulletArr = Bus.getBulletArr().filter(item => item !== target);
        } else if (target instanceof Tank) {
            tankArr = Bus.getTankArr().filter(item => item !== target);
            bulletArr = Bus.getBulletArr();
        }

        let objEleArr: HTMLElePropType | undefined = undefined;
        type collisionStrategys = (((type: HTMLElePropType) => boolean) | (() => void))[][]
        let collisionStrategys: collisionStrategys = [
            // tank
            [
                (type: HTMLElePropType) => type instanceof Tank,
                () => tankArr.forEach(item => Utils.isCollision(target, item) && (objEleArr = item))
            ],
            // wall
            [
                (type: HTMLElePropType) => type instanceof Wall,
                () => Bus.getWallArr().forEach(item => Utils.isCollision(target, item) && (objEleArr = item))
            ],
            [
                (type: HTMLElePropType) => type instanceof Bullet,
                () => bulletArr.forEach(item => Utils.isCollision(target, item) && (objEleArr = item))
            ],
        ];
        types.forEach(type => {
            let collisionStrategy = collisionStrategys.find(item => item[0](type));
            collisionStrategy && (collisionStrategy[1] as (() => void))();
        });
        return objEleArr;
    }
    // 是否处理该碰撞元素
    static isNotHandleCollisionEle(targetSelf: HTMLElePropType, collisionTarget: HTMLElePropType | undefined): boolean {
        let isHandleCollisionEle = false;
        /*
            let collisionStrategys = [
                // 自己碰自己
                [
                    () => tagetSelf === collisionTarget,
                    () => {
                        // console.log("自己碰自己");
                        return false;
                    }
                ],
                // tank碰自己的子弹
                [
                    () => tagetSelf === collisionTarget?.parent,
                    () => {
                        // console.log("自己碰自己的子弹");
                        return false;
                    }
                ],
                // 子弹碰自己坦克
                [
                    () => tagetSelf.parent === collisionTarget,
                    () => {
                        // console.log("子弹碰自己碰坦克");
                        return false;
                    }
                ],
                // 子弹碰敌方坦克
                [
                    () => tagetSelf.parent !== collisionTarget,
                    () => {
                        // console.log("子弹碰自己碰坦克");
                        return true;
                    }
                ],
                // boss
                [
                    () => collisionTarget?.getMapEleName() === MapWallEle.boss,
                    () => {
                        console.log("碰上boss");
                        return true;
                    }
                ],
                [
                    () => collisionTarget?.getMapEleName() === MapWallEle.star,
                    () => {
                        console.log("碰上star");
                        return true;
                    }
                ],
                [
                    () => collisionTarget?.getMapEleName() === MapWallEle.fence,
                    () => {
                        console.log("碰上fence");
                        return true;
                    }
                ],
                [
                    () => collisionTarget?.getMapEleName() === MapWallEle.brick,
                    () => {
                        console.log("碰上brick");
                        return true;
                    }
                ],
                [
                    () => collisionTarget?.getMapEleName() === MapWallEle.wood,
                    () => {
                        console.log("碰上wood");
                        return true;
                    }
                ],
                [
                    () => collisionTarget?.getMapEleName() === MapWallEle.iron,
                    () => {
                        console.log("碰上iron");
                        return true;
                    }
                ]
            ];
        */
        let collisionStrategys = [
            // tank碰自己的子弹
            [
                () => targetSelf === collisionTarget?.parent,
                () => {
                    // console.log("tank自己碰自己的子弹1");
                    return true;
                }
            ],
            // tank碰自己tank
            [
                () => targetSelf === collisionTarget,
                () => {
                    // console.log("tank碰自己tank");
                    return true;
                }
            ],
            // 子弹碰自己坦克
            [
                () => targetSelf.parent && targetSelf.parent === collisionTarget,
                () => {
                    // console.log("子弹碰自己碰坦克2");
                    return true;
                }
            ],
            // 子弹碰自己同类子弹
            [
                () => targetSelf.parent && collisionTarget?.parent && targetSelf.parent === collisionTarget.parent,
                () => {
                    // console.log("子弹碰自己同类子弹3");
                    return true;
                }
            ],

        ];
        let collisionStrategy = collisionStrategys.find(item => item[0]());
        collisionStrategy && (isHandleCollisionEle = collisionStrategy[1]() as boolean);
        return isHandleCollisionEle;
    }


}