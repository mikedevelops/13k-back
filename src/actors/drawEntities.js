import { drawSprite, S_PLAYER } from '../sprite/sprites';
import { HIDDEN_CTX, STAGE_CTX } from '../stage/stage';
import { getUnit } from '../utils/units';

export const drawEntities = (grid) => {
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
