type Pet = {
    breed: string,
    nickname: string,
    age: number
}

function greet(pet: Pet): string {
    return `Питомец: ${pet.breed}, кличка: ${pet.nickname}, возраст: ${pet.age}`
}

const dog: Pet = { breed: 'Собака', nickname: 'Догги', age: 4 }
const cat: Pet = { breed: 'Кошка', nickname: 'Конфетка', age: 2 }

console.log(greet(dog))
