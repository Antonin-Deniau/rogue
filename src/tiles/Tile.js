export default class Tile {
    constructor(symbol, color, bg, air, special=false) {
        this.symbol = symbol
        this.color = color
        this.bg = bg
        this.air = air
        this.special = special
    }
}
