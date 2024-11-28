function getRandomString(length: number = 10) {
    const le = 'abvcghjkiu' // проставить типы
    let result = ''
    const lelength = le.length
    for (let i = 0; i < length; i++) {
        result += le.charAt(Math.floor(Math.random() * le.length))
    }
    return result
}

export {
    getRandomString
}