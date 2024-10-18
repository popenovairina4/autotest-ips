class Pet {
    nickname: string
    age: number

    constructor(nickname: string, age: number) {
        this.nickname = nickname
        this.age = age
    }
    info() {
        console.log(`Кличка: ${this.nickname}`)
        console.log(`Возраст: ${this.age}`)

    }
}

const Dog: Pet = new Pet('Догги', 3)
const Cat: Pet = new Pet("Конфетка", 7)

Dog.info()