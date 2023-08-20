import Game from "../Game";
import { HTMLElePropType, MapEle, MapTankEle } from "../utils/Utils";

export type BaseObjDirection = "up" | "down" | "left" | "right";
export default abstract class BaseObjAbstract {

    // 宽高 位置 等级 血量 类别 方向 角度 图片 速度 html元素
    constructor(
        private height: number,
        private width: number,
        private posX: number,
        private posY: number,
        private level: number,
        private blood: number,
        private direction: BaseObjDirection,
        private speed: number,
        private htmlEle: HTMLDivElement | undefined,
        public parent: HTMLElePropType | undefined,
        public mapEleName: MapEle,
        public game: Game,
    ) { }

    setHeight(height: number) { this.height = height }
    setWidth(width: number) { this.width = width }
    setPosX(posX: number) {
        if (posX <= 0) {
            this.posX = 0;
        } else if (posX >= this.game.mapWidth - this.getWidth()) {
            this.posX = this.game.mapWidth - this.getWidth()
        } else {
            this.posX = posX;
        }
    }
    setPosY(posY: number) {
        if (posY <= 0) {
            this.posY = 0;
        } else if (posY >= this.game.mapHeight - this.getHeight()) {
            this.posY = this.game.mapHeight - this.getHeight()
        } else {
            this.posY = posY;
        }
    }
    setLevel(level: number) { this.level = level }
    setBlood(blood: number) { 
        this.blood = blood;
        if(this.getMapEleName() === MapTankEle.my){
            let myblood_conten = document.querySelector("#myblood_content")!;
            myblood_conten.innerHTML = blood.toPrecision(4) + ""+"";
        }
    }
    setDirection(direction: BaseObjDirection) { this.direction = direction }
    setSpeed(speed: number) { this.speed = speed }
    setHtmlEle(htmlEle: HTMLDivElement) { this.htmlEle = htmlEle }
    setMapEleName(mapEleName: MapEle) { this.mapEleName = mapEleName }

    getHeight() { return this.height }
    getWidth() { return this.width }
    getPosX() { return this.posX }
    getPosY() { return this.posY }
    getLevel() { return this.level }
    getBlood() { return this.blood }
    getDirection() { return this.direction }
    getSpeed() { return this.speed }
    getHtmlEle() { return this.htmlEle }
    getMapEleName() { return this.mapEleName }
    // 摧毁元素
    abstract destroy(sourceTarget?: HTMLElePropType): void// 移动
    abstract move(): void
    abstract upgrade(): void
}
