
import { Bus } from "../utils/Bus";
import { HTMLElePropType, MapWallEle } from "../utils/Utils";
import BaseObjAbstract from "./BaseObjAbstract";

export default class Wall extends BaseObjAbstract {
    destroy(sourceTarget: HTMLElePropType) {
        // 子弹
        let parent = sourceTarget?.parent
        if (this.getMapEleName() === MapWallEle.boss) {
            alert("洗白伊拉克，boss被搞死了")
        } else if (this.getMapEleName() === MapWallEle.star) {
            parent?.upgrade();
            let mylevel_content = document.querySelector("#mylevel_content")!;
            mylevel_content.innerHTML = Number(mylevel_content.innerHTML) + 1 + "";
        } else if (this.getMapEleName() === MapWallEle.star2) {
            this.game.randomBullet = true;
            setTimeout(() => {
                this.game.randomBullet = false;
            }, 5000)
        }
        Bus.removeWallFromWallArr(this);
        this.getHtmlEle()?.parentElement?.removeChild(this.getHtmlEle()!);
        // console.log("wall破了");
    }
    move(): void {

    }
    upgrade(): void {

    }

}