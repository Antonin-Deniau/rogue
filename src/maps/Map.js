import * as ROT from "rot-js"

export default class Map {
    constructor() {
        this.cells = {}
        this.discovered = []
        this.freeCells = []
        this.visibleCells = []
    }

    discover(x, y, cb) {
        let lightPasses = (x, y) => {
            let key = `${x},${y}`
            if (key in this.cells) { return this.cells[key].air }
            return false
        }

        let fov = new ROT.FOV.PreciseShadowcasting(lightPasses)
        this.visibleCells = []

        // x, y, radius
        fov.compute(x, y, 10, (x, y, r, visibility) => cb(x,y))
    }

    walkable(x, y) {
        let key = `${x},${y}`
        return (key in this.cells) && this.cells[key].air === true
    }

    getCell(x, y) {
        return this.cells[`${x},${y}`]
    }
}
