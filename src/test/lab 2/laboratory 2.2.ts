type Student = {
    name: string,
    age: number
}

const listofstudents: Student[] = [
    { name: 'Emma', age: 21 },
    { name: 'Iren', age: 24 },
    { name: 'Mihael', age: 21 },
    { name: 'Julia', age: 18 }
]

listofstudents.forEach((student) => { console.log(`${student.name}, ${student.age}`) })
