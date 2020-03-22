import Entity from "../Entity"

export default class Chest extends Entity {
    constructor(pos) {
        super(pos, 0, 100, "chest", "C", "#00e20b")
    }
}
