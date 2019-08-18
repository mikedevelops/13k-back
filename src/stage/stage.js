import { RESOLUTION, UNIT } from '../game/constants';

const scale = 2;

export const stage = document.getElementById('stage');
export const STAGE_CTX = stage.getContext('2d');
export const hiddenStage = document.getElementById('static');
export const HIDDEN_CTX = hiddenStage.getContext('2d');

stage.width = (RESOLUTION[0] * UNIT) * scale;
stage.height = (RESOLUTION[1] * UNIT) * scale;

STAGE_CTX.imageSmoothingEnabled = false;
STAGE_CTX.scale(scale, scale);

