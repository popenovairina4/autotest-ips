function checkAccess(a: number) {
    if (a >= 18) {
        console.log("Страница доступна")
    } else {
        console.log("Страница не доступна")
    }
}

checkAccess(5)