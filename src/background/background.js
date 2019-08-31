import { hiddenStage, STAGE_CTX } from '../stage/stage';

export const restoreBackground = () => {
    STAGE_CTX.drawImage(hiddenStage, 0, 0);
};
