import { drawSprite } from '../sprite/sprites';
import { getUnit } from '../utils/units';
import { HIDDEN_CTX, hiddenStage, STAGE_CTX } from '../stage/stage';

export const drawBackground = (grid) => {
    let tile = 0;
    let rows = 0;
    let columns = 0;

    for (let i = 0; i < grid.tiles.length; i++) {
        if (i !== 0 && i % grid.resolution[0] === 0) {
            columns = 0;
            rows++;
        }

        drawSprite(HIDDEN_CTX, grid.tiles[tile], [getUnit(columns), getUnit(rows)]);
        columns++;
        tile++;
    }
};

export const restoreBackground = () => {
    STAGE_CTX.drawImage(hiddenStage, 0, 0);
};
