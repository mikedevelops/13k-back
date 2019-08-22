export const tile = (x, y, entities) => {
    return {
        position: [x, y],
        entities: Array.isArray(entities) ?
            entities.sort() :
            [entities]
    }
};
