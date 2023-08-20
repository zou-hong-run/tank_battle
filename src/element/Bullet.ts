
import { Bus } from "../utils/Bus";
import Utils, { MapTankEle } from "../utils/Utils";
import BaseObjAbstract from "./BaseObjAbstract";

export default class Bullet extends BaseObjAbstract {
    destroy() {
        this.getHtmlEle()?.parentElement?.removeChild(this.getHtmlEle()!);
        Bus.removeBulletFromBulletArr(this);
    }
    move() {
        let currentPosX = this.getPosX();
        let currentPosY = this.getPosY();
        let updatePosX = this.getPosX();
        let updatePosY = this.getPosY();
        let isOutRange = false;
        // star2 子弹混乱
        this.game.randomBullet && this.setDirection(Utils.getRandomDirection())
        // 移动模式
        let moveStrategy = {
            // 定位是相对于 左边和上边，所以向上是减少y,向左是减少x
            up: () => {
                updatePosY = (this.getPosY() - this.getSpeed());
                (this.getPosY() <= 0) && (isOutRange = true);
            },
            down: () => {
                updatePosY = (this.getPosY() + this.getSpeed());
                (this.getPosY() >= (this.game.mapHeight - this.getHeight())) && (isOutRange = true);
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
        moveStrategy[this.getDirection()]();
        if (isOutRange) {
            return this.destroy()
        }

        this.setPosX(updatePosX);
        this.setPosY(updatePosY);

        // 返回碰撞的元素
        let hitObj = Utils.checkCollision(
            this,
            [
                Bus.getBulletArr()[0],
                Bus.getTankArr()[0],
                Bus.getWallArr()[0]
            ]
        );
        let isNotHandleCollisionEle = Utils.isNotHandleCollisionEle(this, hitObj);
        if (!isNotHandleCollisionEle && hitObj) {
            // 满足条件 且存在碰撞元素
            if(this.parent?.getMapEleName()===MapTankEle.my&&this.game.music2) {
                this.game.music2.play();
            }
            // 删除子弹
            this.destroy();
            hitObj.setBlood(hitObj.getBlood() - 5);
            if (!(hitObj.getBlood() > 0 && hitObj.getBlood() <= 100)) hitObj.destroy(this);
            // 添加工具动画
            Utils.addBlink(hitObj.getHtmlEle()!);
            // 添加文字
            let htmlELe: HTMLDivElement = hitObj.getHtmlEle()!;
            htmlELe.innerText = hitObj.getBlood().toPrecision(4) + "";
        } else {
            // 没有发生碰撞 继续运动
            // 改变目标html元素的位置
            Utils.renderEle(this.getHtmlEle()!, currentPosX, currentPosY, this.getDirection());
        }
    }
    upgrade(): void {

    }

}

