import { drawSprite } from '../sprite/sprites';
import { getUnit } from '../utils/units';
import { HIDDEN_CTX, hiddenStage, STAGE_CTX } from '../stage/stage';

export const drawBackground = (grid) => {
    HIDDEN_CTX.fillStyle = '#472d3c';
    HIDDEN_CTX.fillRect(0, 0, hiddenStage.width, hiddenStage.height);

    grid.iterate(grid.currentState, tile => {
        tile.entities.forEach(id => drawSprite(
            HIDDEN_CTX,
            id,
            getUnit(tile.position)
        ));
    });
};

export const restoreBackground = () => {
    STAGE_CTX.drawImage(hiddenStage, 0, 0);
};
