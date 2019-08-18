import { drawSprite, S_SKELETON, S_SKELETON_REMAINS } from '../sprite/sprites';
import { STAGE_CTX } from '../stage/stage';
import { actor } from './actor';

export const Skeleton = function (x, y) {
    const s = Object.create(actor);

    s.position = [x, y];
    s.dead = true;
    s.draw = function () {
        drawSprite(
            STAGE_CTX,
            this.dead ? S_SKELETON_REMAINS : S_SKELETON,
            this.getWorldPosition()
        );
    };

    return s;
};
