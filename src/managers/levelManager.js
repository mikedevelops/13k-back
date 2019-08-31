import {createLevel} from "../grid/level";
import {drawSprite, S_INVENTORY_SLOT, S_NUMBERS, S_TROPHY, S_TROPHY_COMPLETE, SPRITE_SIZE} from "../sprite/sprites";
import {STAGE_CTX} from "../stage/stage";
import {getUnit} from "../utils/units";

export const levelManager = () => ({
    levels: [],
    highlighted: 0,

    load: function (levels) {
        levels.forEach(({ start, complete, player }) => {
            const thisLevel = createLevel();

            thisLevel.load(complete, start, player);
            this.levels.push(thisLevel);
        });
    },

    draw: function () {
        for (let i = 0; i < this.levels.length; i++) {
            console.log(this.levels[i]);
            drawSprite(STAGE_CTX, S_NUMBERS + i, [getUnit(i), 0]);
            drawSprite(
                STAGE_CTX,
                this.levels[i].finished ? S_TROPHY_COMPLETE : S_TROPHY,
                [getUnit(i), SPRITE_SIZE]
            );
        }

        drawSprite(STAGE_CTX, S_INVENTORY_SLOT, [getUnit(this.highlighted), 0]);
    },

    nextLevel: function () {
        if (this.highlighted < this.levels.length - 1) {
            this.highlighted++;
        }
    },

    prevLevel: function () {
        if (this.highlighted > 0) {
            this.highlighted--;
        }
    },

    getCurrentLevel: function () {
        return this.levels[this.highlighted];
    },
});
