import { equals } from '../utils/vector';

export const EntityManager = function () {
    const em = {};

    em.entities = [];

    em.addEntity = function (entity) {
        this.entities.push(entity);
    };

    em.update = function () {
        this.entities.forEach(e => e.draw());
    };

    em.getEntityAt = function (position) {
        return this.entities.find(entity =>
            equals(position, entity.position));
    };

    return em;
};
