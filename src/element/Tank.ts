

import { Bus } from "../utils/Bus";
import Utils, { HTMLElePropType, MapBulletEle, MapTankEle } from "../utils/Utils";
import BaseObjAbstract, { BaseObjDirection } from "./BaseObjAbstract";

export default class Tank extends BaseObjAbstract {

    destroy() {
        // 界面显示
        let enemynum_content = document.querySelector("#enemynum_content")!;
        enemynum_content.innerHTML = Number(enemynum_content.innerHTML) + 1 + "";
        // 添加音效
        if (this.game.music1) this.game.music1.play()
        if (this.getMapEleName() === MapTankEle.my) {
            alert("洗白伊拉克，你被人搞死了")
        } else {
            console.log("其他坦克被弄死了");
        }
        Bus.removeTankFromMyTankArr(this);
        let htmlELe = this.getHtmlEle()!;
        htmlELe.style.backgroundImage = `url('./assets/explosion.gif')`;
        setTimeout(() => {
            htmlELe.parentElement?.removeChild(this.getHtmlEle()!);
        }, 1000);
        // console.log("tank被清除了");


        // 添加地方坦克
        let posX = Math.floor(Math.random()*(this.game.mapWidth/this.game.mapItemWidth)) * this.game.mapItemWidth;
        let posY = 0;
        let width = this.game.mapItemWidth;
        let height = this.game.mapItemHeight;
        let direction: BaseObjDirection = "up";
        let parent: HTMLElePropType | undefined;
        let speed = .25;
        let blood = 100;
        let level = 1;
        let mapEleName = MapTankEle.enemy1;
        let game = this.game;

        let htmlEle = this.game.renderMapEle(
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
        this.game.mapContainerEle.appendChild(htmlEle);
    }
    move() {
        let currentPosX = this.getPosX();
        let currentPosY = this.getPosY();
        let updatePosX = currentPosX;
        let updatePosY = currentPosY;
        let htmlELe: HTMLDivElement = this.getHtmlEle()!;
        // 超出边界
        let isOutRange = false;
        // 移动模式
        let moveStrategy = {
            // 定位是相对于 左边和上边，所以向上是减少y,向左是减少x
            up: () => {
                updatePosY = (this.getPosY() - this.getSpeed());
                (this.getPosY() <= 0) && (isOutRange = true)
            },
            down: () => {
                updatePosY = (this.getPosY() + this.getSpeed());
                (this.getPosY() >= (this.game.mapHeight - this.getHeight())) && (isOutRange = true)
            },
            left: () => {
                updatePosX = (this.getPosX() - this.getSpeed());
                (this.getPosX() <= 0) && (isOutRange = true)
            },
            right: () => {
                updatePosX = (this.getPosX() + this.getSpeed());
                (this.getPosX() >= (this.game.mapWidth - this.getWidth())) && (isOutRange = true)
            }
        };
        // enemyDirection 
        if (this.getMapEleName() !== MapTankEle.my) {
            if (
                this.getPosX() <= 0 || this.getPosX() >= this.game.mapWidth - this.getWidth() ||
                this.getPosY() <= 0 || this.getPosY() >= this.game.mapHeight - this.getHeight()
            ) {
                this.setDirection(Utils.getRandomDirection())
            }
            this.shoot()
        };
        moveStrategy[this.getDirection()]();
        if (isOutRange) {
            return
        }
        // 更新位置做碰撞
        this.setPosX(updatePosX);
        this.setPosY(updatePosY);
        // 返回碰撞的元素
        let hitObj = Utils.checkCollision(this, [Bus.getTankArr()[0], Bus.getWallArr()[0]]);
        // 是否不处理该碰撞元素
        let isNotHandleCollisionEle = Utils.isNotHandleCollisionEle(this, hitObj);
        // 满足碰撞 并过滤碰撞不要处理的元素 => 满足条件的碰撞
        if (!isNotHandleCollisionEle && hitObj) {
            // 敌人坦克，并且碰撞 改变方向
            if (this.getMapEleName() !== MapTankEle.my) this.setDirection(Utils.getRandomDirection());
            // 设置回 移动前的位置
            this.setPosX(currentPosX);
            this.setPosY(currentPosY);
            this.setBlood(this.getBlood() - 0.01);
            // 坦克磨损
            if (!(this.getBlood() > 0 && this.getBlood() <= 100)) this.destroy();
            // 添加文字

            htmlELe.innerText = this.getBlood().toPrecision(4) + "";
            // 添加工具动画
            Utils.addBlink(htmlELe);
            Utils.renderEle(htmlELe, currentPosX, currentPosY, this.getDirection());
        } else {
            // 改变目标html元素的位置
            Utils.renderEle(htmlELe, updatePosX, updatePosY, this.getDirection());
        }
    }
    shoot() {
        if (Math.floor((Math.random() * 2)) + 1 !== 2) return
        let mapEleName = MapBulletEle["bullet" + this.getLevel() as MapBulletEle]
        let scale = .5;
        let width = this.getWidth() * scale;
        let height = this.getHeight() * scale;
        let posX = this.getPosX();
        let posY = this.getPosY();
        let direction = this.getDirection();

        // 根据 坦克的方向 设置 子弹的 位置d
        let bulletDirectStrategy = {
            up: () => {
                posX = posX + width / 2;
                posY = posY - height / 2;
            },
            down: () => {
                posX = posX + width / 2;
                posY = posY + height / 2;
            },
            left: () => {
                posX = posX - width / 2;
                posY = posY + height / 2;
            },
            right: () => {
                posX = posX + width / 2;
                posY = posY + height / 2;
            }
        }
        // 执行策略内容
        bulletDirectStrategy[direction]();

        let game = this.game;
        let parent: HTMLElePropType | undefined = this;
        let speed = this.getSpeed() * 2;
        let blood = 100;
        let level = 1;

        let htmlEle = this.game.renderMapEle(
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
        this.getHtmlEle()?.parentElement?.appendChild(htmlEle);

    }
    upgrade() {
        this.setLevel((this.getLevel()) % 5 + 1);
        this.setSpeed(this.getSpeed() + .25);
        let htmlELe: HTMLDivElement = this.getHtmlEle()!;
        let img = `url(./assets/tank/tank${this.getLevel()}.png)`;
        htmlELe.style.backgroundImage = img;
    }
}
