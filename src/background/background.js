import { drawSprite } from '../sprite/sprites';
import { getUnit } from '../utils/units';
import { HIDDEN_CTX, hiddenStage, STAGE_CTX } from '../stage/stage';

export const drawBackground = (grid) => {

};

export const restoreBackground = () => {
    STAGE_CTX.drawImage(hiddenStage, 0, 0);
};
