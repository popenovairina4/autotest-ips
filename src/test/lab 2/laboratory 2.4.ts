const promise: Promise<string> = new Promise((resolve) => {
    setTimeout(() => resolve("resolve"), 1000)
})

console.log('start')

promise.then((value) => console.log(value))