import * as ROT from "rot-js"
import Map from "./Map"
import BrickWall from "../tiles/BrickWall"
import BrickFloor from "../tiles/BrickFloor"

export default class Castle extends Map {
    generate() {
        let digger = new ROT.Map.Digger(300, 300)

        let digCallback = (x, y, wall) => {
            let key = `${x},${y}`

            if (wall) {
                this.cells[key] = new BrickWall()
            } else {
                this.cells[key] = new BrickFloor()
                this.freeCells.push({x, y})
            }
        }
        digger.create(digCallback.bind(this))
    }
}
