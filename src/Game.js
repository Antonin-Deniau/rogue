import Castle from "./maps/Castle"
import Chest from "./entities/containers/Chest"
import Player from "./entities/Player"
import * as ROT from "rot-js"

class Game {
    constructor() {
        this.map = new Castle()
        this.entities = []
        this.screenWidth = 150
        this.screenHeight = 50
    }

    init() {
        this.display = new ROT.Display({ width: this.screenWidth, height: this.screenHeight })
        this.scheduler = new ROT.Scheduler.Simple()
        this.engine = new ROT.Engine(this.scheduler)

        document.body.appendChild(this.display.getContainer())

        this.generateWorld()
        this.player.discover(this.player.position.x, this.player.position.y)

        this.drawWorld()

        this.engine.start()
    }

    generateWorld() {
        this.map.generate()
        this.generateEntities(this.map.freeCells)
    }

    drawWorld() {
        let cameraX = this.player.position.x - (this.screenWidth / 2)
        let cameraY = this.player.position.y - (this.screenHeight / 2)

        this.display.clear()

        for (let key of this.player.discoveredCells) {
            let parts = key.split(",")
            let cx = parseInt(parts[0])
            let cy = parseInt(parts[1])

            let cell = this.map.getCell(cx, cy)
            this.display.draw(cx - cameraX, cy - cameraY, cell.symbol, cell.color, cell.bg)
        }

        for (let entity of this.entities.sort((a, b) => b.zindex - a.zindex)) {
            if (this.player.see(entity.position.x, entity.position.y)) {
                let cell = this.map.getCell(entity.position.x, entity.position.y)
                this.display.draw(entity.position.x - cameraX, entity.position.y - cameraY, entity.symbol, entity.color, cell.bg)
            }
        }
    }

    generateEntities(freeCells) {
        // player
        let index = Math.floor(ROT.RNG.getUniform() * freeCells.length)
        let pos = freeCells.splice(index, 1)[0]
        this.player = new Player(pos)

        this.entities.push(this.player)
        this.scheduler.add(this.player, true)

        // boxes
        for (let i = 0; i < 10; i++) {
            let index = Math.floor(ROT.RNG.getUniform() * freeCells.length)
            let pos = freeCells.splice(index, 1)[0]

            this.entities.push(new Chest(pos))
        }
    }
}

export default new Game()
