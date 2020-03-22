import Entity from "./Entity"
import * as ROT from "rot-js"
import GAME from "../Game"

export default class Player extends Entity {
    constructor(pos) {
        super(pos, 100, 0, "player", "@", "#ff0")
        this.visibleCells = []
        this.discoveredCells = []
    }

    see(x, y) {
        return this.visibleCells.includes(`${x},${y}`)
    }

    act() {
        GAME.engine.lock()
        window.addEventListener("keydown", this)
    }

    discover(x, y) {
        this.visibleCells = []
        GAME.map.discover(x, y, (sx, sy) => {
            let key = `${sx},${sy}`

            if (!(this.discoveredCells.includes(key))) {
                this.discoveredCells.push(key)
            }
            this.visibleCells.push(key)
        })
    }

    handleEvent(e) {
        let keyMap = {}
        keyMap[38] = 0
        keyMap[33] = 1
        keyMap[39] = 2
        keyMap[34] = 3
        keyMap[40] = 4
        keyMap[35] = 5
        keyMap[37] = 6
        keyMap[36] = 7

        let code = e.keyCode

        if (!(code in keyMap)) { return }

        let diff = ROT.DIRS[8][keyMap[code]]
        let newX = this.position.x + diff[0]
        let newY = this.position.y + diff[1]

        if (!(GAME.map.walkable(newX, newY))) { return }

        this.position.x = newX
        this.position.y = newY

        this.discover(newX, newY)

        window.removeEventListener("keydown", this);
        GAME.drawWorld()
        GAME.engine.unlock()
    }
}
