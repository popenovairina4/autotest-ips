const promise: Promise<string> = new Promise((resolve) => {
    setTimeout(() => resolve("resolve"), 1000)
})

promise.then((value) => console.log(value))

async function print(): Promise<void> {
    const result = await promise
    console.log(result)
}