const promise: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => resolve("resolve"), 1000)
    setTimeout(() => reject("reject"), 100)
})

promise.then(
    value => console.log('resolve', value),
    error => console.log('reject', error)
)
async function print(): Promise<void> {
    try {
        const result = await promise
        console.log(result)
    } catch (error) {
        console.log('Rejected:', error)
    }
}