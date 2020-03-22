export default class Entity {
    constructor(position, priority, zindex, type, symbol, color, metadata={}) {
        this.type = type
        this.priority = priority
        this.zindex = zindex
        this.symbol = symbol
        this.color = color
        this.metadata = metadata
        this.position = position
    }
}
