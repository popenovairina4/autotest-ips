function culk(fn: (a: number, k: number) => number, z: number, b: number) {
    const result = fn(z, b)
    return result
}

const add = (a: number, b: number) => {
    const run = a + b
    console.log('result is', run)
    return run
}

culk(add, 5, 11)