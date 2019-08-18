import { getUnit } from '../utils/units';

export const actor = {
    position: [0, 0],

    /**
     * Get world position
     * @return {number[]}
     */
    getWorldPosition: function () {
        return this.position.map(p => getUnit(p));
    },
};
