class Car {
    enginestarted = false// типы у функций / сделать приватным

    turnOn() {
        this.enginestarted = true
    }

    turnOff() {
        this.enginestarted = false
    }

    getState() {
        console.log(`Состояние: ${this.enginestarted}`)
    }
}

const mycar: Car = new Car()

mycar.getState()
mycar.turnOn()
mycar.getState()
