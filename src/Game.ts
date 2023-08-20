
import { BaseObjDirection } from "./element/BaseObjAbstract";
import { Bus } from "./utils/Bus";
import { Music } from "./utils/Music";
import Utils, { MapWallEle, MapTankEle, MapEle, HTMLElePropType } from "./utils/Utils";


export default class Game {
    // 游戏配置====
    // 地图配置
    public mapArr = [
        [
            [MapTankEle.enemy1, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapTankEle.enemy2, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapTankEle.enemy4, MapWallEle.grass, MapWallEle.grass, MapTankEle.enemy3],
            [MapWallEle.brick, MapWallEle.grass, MapWallEle.brick, MapWallEle.grass, MapWallEle.brick, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.brick],
            [MapWallEle.brick, MapWallEle.grass, MapWallEle.star, MapWallEle.grass, MapWallEle.brick, MapWallEle.grass, MapWallEle.brick, MapWallEle.grass, MapWallEle.brick, MapWallEle.brick, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.brick],
            [MapWallEle.brick, MapWallEle.brick, MapWallEle.brick, MapWallEle.brick, MapWallEle.brick, MapWallEle.brick, MapWallEle.brick, MapWallEle.brick, MapWallEle.brick, MapWallEle.iron, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.brick, MapWallEle.grass],
            [MapWallEle.brick, MapWallEle.grass, MapWallEle.star2, MapWallEle.grass, MapWallEle.brick, MapWallEle.grass, MapWallEle.brick, MapWallEle.brick, MapWallEle.brick, MapWallEle.brick, MapWallEle.brick, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.brick, MapWallEle.brick],
            [MapWallEle.brick, MapWallEle.star, MapWallEle.brick, MapWallEle.grass, MapWallEle.brick, MapWallEle.grass, MapWallEle.brick, MapWallEle.brick, MapWallEle.iron, MapWallEle.brick, MapWallEle.brick, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.brick, MapWallEle.brick, MapWallEle.brick],
            [MapWallEle.brick, MapWallEle.grass, MapWallEle.brick, MapWallEle.grass, MapWallEle.brick, MapWallEle.grass, MapWallEle.brick, MapWallEle.brick, MapWallEle.brick, MapWallEle.brick, MapWallEle.brick, MapWallEle.brick, MapWallEle.grass, MapWallEle.brick, MapWallEle.brick, MapWallEle.brick, MapWallEle.brick],
            [MapWallEle.brick, MapWallEle.iron, MapWallEle.iron, MapWallEle.grass, MapWallEle.brick, MapWallEle.grass, MapWallEle.brick, MapWallEle.brick, MapWallEle.brick, MapWallEle.brick, MapWallEle.brick, MapWallEle.brick, MapWallEle.grass, MapWallEle.brick, MapWallEle.brick, MapWallEle.grass, MapWallEle.grass],
            [MapWallEle.brick, MapWallEle.grass, MapWallEle.brick, MapWallEle.grass, MapWallEle.brick, MapWallEle.grass, MapWallEle.brick, MapWallEle.brick, MapWallEle.brick, MapWallEle.grass, MapWallEle.grass, MapWallEle.brick, MapWallEle.grass, MapWallEle.brick, MapWallEle.brick, MapWallEle.grass, MapWallEle.grass],
            [MapWallEle.brick, MapWallEle.grass, MapWallEle.brick, MapWallEle.grass, MapWallEle.brick, MapWallEle.grass, MapWallEle.iron, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.brick, MapWallEle.brick, MapWallEle.brick, MapWallEle.star, MapWallEle.grass, MapWallEle.star],
            [MapWallEle.brick, MapWallEle.brick, MapWallEle.brick, MapWallEle.brick, MapWallEle.brick, MapWallEle.brick, MapWallEle.brick, MapWallEle.brick, MapWallEle.brick, MapWallEle.star, MapWallEle.grass, MapWallEle.grass, MapWallEle.brick, MapWallEle.grass, MapWallEle.iron, MapWallEle.grass, MapWallEle.grass],
            [MapWallEle.brick, MapWallEle.grass, MapWallEle.brick, MapWallEle.grass, MapWallEle.brick, MapWallEle.grass, MapWallEle.grass, MapWallEle.brick, MapWallEle.grass, MapWallEle.brick, MapWallEle.grass, MapWallEle.grass, MapWallEle.brick, MapWallEle.brick, MapWallEle.grass, MapWallEle.brick, MapWallEle.brick],
            [MapWallEle.brick, MapWallEle.grass, MapWallEle.brick, MapWallEle.grass, MapWallEle.brick, MapWallEle.grass, MapWallEle.grass, MapWallEle.brick, MapWallEle.grass, MapWallEle.brick, MapWallEle.grass, MapWallEle.grass, MapWallEle.iron, MapWallEle.grass, MapWallEle.grass, MapWallEle.iron, MapWallEle.grass],
            [MapWallEle.brick, MapWallEle.grass, MapWallEle.brick, MapWallEle.grass, MapWallEle.brick, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.brick, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass],
            [MapWallEle.brick, MapWallEle.grass, MapWallEle.star2, MapWallEle.grass, MapWallEle.brick, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass],
            [MapWallEle.brick, MapWallEle.grass, MapWallEle.brick, MapWallEle.grass, MapWallEle.brick, MapWallEle.grass, MapWallEle.grass, MapWallEle.brick, MapWallEle.brick, MapWallEle.brick, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass],
            [MapWallEle.grass, MapWallEle.grass, MapWallEle.star, MapTankEle.enemy1, MapWallEle.grass, MapWallEle.grass, MapTankEle.my, MapWallEle.brick, MapWallEle.boss, MapWallEle.brick, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass, MapWallEle.grass],
        ]
    ] as const;
    public gameLevel = 0;
    public mapHeight = 100;
    public mapWidth = 80;
    public mapItemWidth = (this.mapWidth / this.mapArr[0][0].length);
    public mapItemHeight = (this.mapHeight / this.mapArr[0].length);
    public mapContainerEle = document.querySelector("#container_center") as HTMLDivElement;
    public music1:HTMLAudioElement|undefined;
    public music2:HTMLAudioElement|undefined;
    public randomBullet:boolean = false;

    init() {
        // 实例化地图类，传递参数
        this.initMap();
        // 监听按钮点击事件
        this.initButtonClickEvent();
        // 触发运动更新
        this.clock()
    }
    // 初始化地图
    initMap() {
        let fragment = document.createDocumentFragment();
        // 拿到数据对应的地图，然后将对应的元素渲染成html元素，批量渲染到html中
        let mapArr = this.mapArr[this.gameLevel];
        mapArr.forEach((itemCol, colIndex) => {
            itemCol.forEach((mapEleName, rowIndex) => {
                let posX = rowIndex * this.mapItemWidth;
                let posY = colIndex * this.mapItemHeight;
                let width = this.mapItemWidth;
                let height = this.mapItemHeight;
                let direction: BaseObjDirection = "up";
                let game = this;
                let parent: HTMLElePropType | undefined;
                let speed = .25;
                let blood = 100;
                let level = 1;

                let htmlEle = this.renderMapEle(
                    mapEleName,
                    width,
                    height,
                    posX,
                    posY,
                    direction,
                    game,
                    parent,
                    speed,
                    blood,
                    level
                );
                // 将html渲染到游戏地图中
                fragment.appendChild(htmlEle);
            })
        })
        // 将html渲染到游戏地图中
        this.mapContainerEle.appendChild(fragment)
    }
    // 渲染地图元素
    renderMapEle(
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
    ): HTMLDivElement {
        // 创建 对象（tank,wall） 元素所需要参数
        let deg = Utils.convertDirectionToDeg(direction);
        // 根据分类 创建对应的 对象
        let objEle = Utils.createObjEleByMapEleName(mapEleName, width, height, posX, posY, direction, game, parent, speed, blood, level)!;
        // 根据元素名 创建对应的 动画
        let animation = Utils.createAnimationByMapEleName(mapEleName);
        // 根据分类 创建对应的图片路径
        let img = Utils.createImgByMapEle(mapEleName);
        let type = objEle;
        // 根据类别和坐标位置 加工 返回html元素
        let htmlEle = Utils.createHTMLEle(objEle.getWidth(), objEle.getHeight(), objEle.getPosX(), objEle.getPosY(), img, deg, animation, type);
        // 将html元素挂载到 objEle上
        objEle.setHtmlEle(htmlEle);
        // 将html渲染到游戏地图中
        return htmlEle;
    }
    // 添加按钮事件
    initButtonClickEvent() {
        // console.log(this.my);
        document.addEventListener("keypress", (e) => {
            this.music1 = new Music().createAudio("explosion.mp3")
            this.music2 = new Music().createAudio("attack.mp3")
            let code = e.code;
            // 玩家自己 地图挂载好了（渲染地图上的类 类创建的时候会添加到Bus中）此时Bus已经存储好用户数据了
            let myTank = Bus.getTankArr().find(item => item.getMapEleName() === MapTankEle.my)!;
            // 点击策略模式
            let clickStrategy = {
                ["KeyW" as string]() {
                    // 更新方向
                    myTank.setDirection("up");
                    myTank.move()
                },
                ["KeyD" as string]() {
                    myTank.setDirection("right");
                    myTank.move()
                },
                ["KeyS" as string]() {
                    myTank.setDirection("down");
                    myTank.move()
                },
                ["KeyA" as string]() {
                    myTank.setDirection("left");
                    myTank.move()
                },
                ["Space" as string]() {
                    myTank.shoot()
                },
            };
            clickStrategy[code] && clickStrategy[code]();
        });
    }
    // 每秒触发一下 update函数
    clock() {
        /*
            let lastTime = 0;
            let flash = () => {
                requestAnimationFrame(() => {
                    let now = performance.now()
                    // time 页面加载依赖的毫秒数
                    if (now - lastTime >= 1000) {// 一秒执行一次
                        lastTime = now;
                        // console.log(lastTime,"一秒");
                        this.update()
                    }
                    flash();
                })
            }
        */
        requestAnimationFrame(() => {
            this.update()
            this.clock()
        })
    }
    // 刷新坦克的动作 这里可以触发其他动作，暂时只有坦克和子弹
    update() {
        // 过滤自己
        let tankArr = Bus.getTankArr().filter(item => item.getMapEleName() !== MapTankEle.my);
        let bulletArr = Bus.getBulletArr();
        tankArr.forEach(tank => {
            tank.move()
        });
        bulletArr.forEach(bullet => {
            bullet.move()
        })
    }
}