function getRandomString(length: number) {
    const le = 'abvcghjkiu' // проставить типы
    let result = ''
    const lelength = le.length
    for (let i = 0; i < length; i++) {
        result += le.charAt(Math.floor(Math.random() * le.length))
    }
    return result
}

let randomString1 = getRandomString(34)
console.log(randomString1)
