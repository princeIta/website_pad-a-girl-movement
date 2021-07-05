import quoteTemplate from "./animated-quote.template"
import fade from "fade"
import random from "random"

export default class App {
    parentWitdth = 0
    parentHeight = 0
    width = 0
    height = 0
    x = 0
    y = 0
    idx = 0

    constructor(textList = ["The quick brown fox jumped over the lazy dog"]
    ) {
        this.textList = textList

        const qt = quoteTemplate(this.textList[this.idx])
        const animated = qt.querySelector(".quote")
        this.animated = animated
        this.template = qt
    }

    mount() {
        return this.template
    }

    setDimensions(parentDimension) {
        const { parentWitdth, parentHeight } = parentDimension || {}
        this.parentHeight = parentHeight
        this.parentWitdth = parentWitdth

        this.width = this.template.offsetWidth
        this.height = this.template.offsetHeight
    }

    onMount() {
        this.show()
    }

    setComponentPosition() {
        this.template.style.top = this.y + "px"
        this.template.style.left = this.x + "px"
    }

    computeMountPosition() {
        const startX = this.computeStartX(this.x)
        const startY = this.computeStartY(this.y)

        this.x = startX
        this.y = startY
    }

    computeStartX() {
        let startX = generateRandom(0, this.parentWitdth)
        let partitionWeight = 1
        while (startX + this.width > this.parentWitdth) {
            const partition = parseInt(this.parentWitdth / partitionWeight)
            startX = generateRandom(0, partition)
            partitionWeight = partition > startX ? partitionWeight + 2 : partitionWeight
        }
        return startX
    }

    computeStartY() {
        let startY = generateRandom(0, this.parentHeight)

        let partitionWeight = 1
        while (startY + this.height > this.parentHeight) {
            const partition = parseInt(this.parentHeight / partitionWeight)
            startY = generateRandom(0, partition)
            partitionWeight = partition > startY ? partitionWeight + 2 : partitionWeight
        }

        return startY
    }

    show() {
        this.computeMountPosition()
        this.setComponentPosition()
        this.tref = setTimeout(() => {
            fade(this.animated, 1, 3000, () => {
                this.tRef = setTimeout(() => {
                    this.hide()
                }, 5000)
            })

            clearTimeout(this.tref)
        }, 500)
    }

    hide() {
        fade(this.animated, 0, 3000, () => this.next())
    }

    next() {
        const quoteCount = this.textList.length
        this.idx = this.idx >= quoteCount - 1 ? 0 : this.idx + 1

        this.animated.textContent = this.textList[this.idx]

        clearTimeout(this.tRef)
        this.show()
    }
}

function generateRandom(from, to) {
    const rn = random.int(from, to)
    return rn
}