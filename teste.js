let grade = 0

const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const alertarErro = (expected, result, funcName) => {
    console.assert(JSON.stringify(result) === JSON.stringify(expected), {
        funcName,
        expected,
        result,
    });
};

const usaMetodo = (func, method, funcName) => {
    if (func.toString().includes(method)) {
        console.error(`O método ${funcName} está usando o método ${method}!`)
        return true
    }
}

const bulkTest = (func, callback, method, funcName) => {
    if (usaMetodo(func, `.${method}`, funcName)) {
        return;
    }
    let errors = [];
    for (let i = 0; i < 500; i++) {
        let arr = [
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
        ]

        let expected = arr[method](callback)
        let result = func(arr, callback)

        if (!(JSON.stringify(expected) === JSON.stringify(result))) {
            errors.push({
                expected,
                result
            })
        }
    }
    console.log(`500 testes aleatórios em cima do método ${funcName}, ${errors.length} erros.`)
    if (errors.length !== 0) {
        console.log(`Erros na função ${funcName}:`)
        console.log(errors)
    } else {
        const gradeToSum = funcName === "newFilter" ? 1 : 2 // Nota da função filter está valendo 1 na rubrica
        grade += gradeToSum
    }
    console.log("---------------------------------")
}

const fezBonus = bonus => window[bonus] !== undefined

// ---------------------------Funções auxiliares------------------------

const testNewForEach = () => {
    if (usaMetodo(newForEach, ".forEach", "newForEach")) {
        return;
    }

    let errors = []

    for (let i = 0; i < 500; i++) {
        let arr = [
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
        ]
        let expected = []
        let result = []

        arr.forEach(elt => expected.push(elt))
        newForEach(arr, elt => result.push(elt))

        if (JSON.stringify(expected) !== JSON.stringify(result)) {
            errors.push({
                expected,
                result
            })
        }
    }
    console.log(`500 testes aleatórios em cima do método newForEach, ${errors.length} erros.`)
    if (errors.length !== 0) {
        console.log(`Erros na função newForEach:`)
        console.log(errors)
    } else {
        grade += 1
    }
    console.log("---------------------------------")
}

const testNewFill = () => {
    if (usaMetodo(newFill, ".fill", "newFill")) {
        return;
    }

    let errors = []

    for (let i = 0; i < 100; i++) {

        let expected = [
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
        ]

        let result = [...expected]
        expected.fill(4)
        newFill(result, 4)

        if (JSON.stringify(expected) !== JSON.stringify(result)) {
            errors.push({
                expected,
                result
            })
        }
    }

    for (let i = 0; i < 100; i++) {

        let expected = [
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
        ]

        let result = [...expected]
        expected.fill(4, 2, 4)
        newFill(result, 4, 2, 4)

        if (JSON.stringify(expected) !== JSON.stringify(result)) {
            errors.push({
                expected,
                result
            })
        }
    }

    for (let i = 0; i < 100; i++) {

        let expected = [
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
            getRandomIntInclusive(0, 100),
        ]

        let result = [...expected]
        expected.fill(4, 6)
        newFill(result, 4, 6)
        if (JSON.stringify(expected) !== JSON.stringify(result)) {
            errors.push({
                expected,
                result
            })
        }
    }
    console.log(`300 testes aleatórios em cima do método newFill, ${errors.length} erros.`)
    if (errors.length !== 0) {
        console.log(`Erros na função newFill:`)
        console.log(errors)
    } else {
        grade += 1
    }
    console.log("---------------------------------")
}

const testNewMap = () => bulkTest(newMap, elt => elt * 2, "map", "newMap")


const testNewSome = () => bulkTest(newSome, elt => elt === 2, "some", "newSome")


const testNewFind = () => bulkTest(newFind, elt => elt === 2, "find", "newFind")


const testNewFindIndex = () => bulkTest(newFindIndex, elt => elt === 2, "findIndex", "newFindIndex")


const testNewEvery = () => bulkTest(newEvery, elt => elt > 30, "every", "newEvery")


const testNewFilter = () => {
    bulkTest(newFilter, elt => elt > 30, "filter", "newFilter")
}

(() => {
    try {
        testNewForEach()
    } catch (error) {
        console.log(`Erro na função newForEach:`, error)
        console.log("---------------------------------")
    }

    // try {
    //     testNewFill()
    // } catch (error) {
    //     console.log(`Erro na função newFill:`, error)
    //     console.log("---------------------------------")
    // }

    try {
        testNewMap()
    } catch (error) {
        console.log(`Erro na função newMap:`, error)
        console.log("---------------------------------")
    }

    try {
        testNewSome()
    } catch (error) {
        console.log(`Erro na função newSome:`, error)
        console.log("---------------------------------")
    }

    try {
        testNewFind()
    } catch (error) {
        console.log(`Erro na função newFind:`, error)
        console.log("---------------------------------")
    }

    try {
        testNewFindIndex()
    } catch (error) {
        console.log(`Erro na função newFindIndex:`, error)
        console.log("---------------------------------")
    }

    try {
        testNewEvery()
    } catch (error) {
        console.log(`Erro na função newEvery:`, error)
        console.log("---------------------------------")
    }

    try {
        testNewFilter()
    } catch (error) {
        console.log(`Erro na função newFilter:`, error)
        console.log("---------------------------------")
    }
})()

if (fezBonus("newConcat")) {
    try {
        (() => {
            if (usaMetodo(newConcat, ".concat", "newConcat")) {
                return;
            }
            let errors = [];

            for (let i = 0; i < 500; i++) {
                let arr = [
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                ]

                let arr2 = [
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                ]

                let expected = arr.concat(arr2)
                let result = newConcat(arr, arr2)

                if (JSON.stringify(expected) !== JSON.stringify(result)) {
                    errors.push({
                        expected,
                        result
                    })
                }
            }
            console.log(`500 testes aleatórios em cima do método newConcat, ${errors.length} erros.`)
            if (errors.length !== 0) {
                console.log(`Erros na função newConcat:`)
                console.log(errors)
            } else {
                grade += 1
            }
            console.log("---------------------------------")
        })()
    } catch (error) {
        console.log(`Erro na função newConcat:`, error)
        console.log("---------------------------------")
    }
}

if (fezBonus("newIncludes")) {
    try {
        (() => {
            if (usaMetodo(newIncludes, ".includes", "newIncludes")) {
                return;
            }

            let errors = [];

            for (let i = 0; i < 500; i++) {
                let arr = [
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                ]

                let expected = arr.includes(42)
                let result = newIncludes(arr, 42)

                if (JSON.stringify(expected) !== JSON.stringify(result)) {
                    errors.push({
                        expected,
                        result
                    })
                }
            }

            for (let i = 0; i < 500; i++) {
                let arr = [
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                ]

                let expected = arr.includes(42, 5)
                let result = newIncludes(arr, 42, 5)

                if (JSON.stringify(expected) !== JSON.stringify(result)) {
                    errors.push({
                        expected,
                        result
                    })
                }
            }

            console.log(`1000 testes aleatórios em cima do método newIncludes, ${errors.length} erros.`)
            if (errors.length !== 0) {
                console.log(`Erros na função newIncludes:`)
                console.log(errors)
            } else {
                grade += 1
            }
            console.log("---------------------------------")
        })()
    } catch (error) {
        console.log(`Erro na função newIncludes:`, error)
        console.log("---------------------------------")
    }
}

if (fezBonus("newIndexOf")) {
    try {
        (() => {
            if (usaMetodo(newIndexOf, ".indexOf", "newIndexOf")) {
                return;
            }

            let errors = [];

            for (let i = 0; i < 500; i++) {
                let arr = [
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                ]

                let expected = arr.indexOf(42)
                let result = newIndexOf(arr, 42)

                if (JSON.stringify(expected) !== JSON.stringify(result)) {
                    errors.push({
                        expected,
                        result
                    })
                }
            }
            for (let i = 0; i < 500; i++) {
                let arr = [
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                ]

                let expected = arr.indexOf(42, 7)
                let result = newIndexOf(arr, 42, 7)

                if (JSON.stringify(expected) !== JSON.stringify(result)) {
                    errors.push({
                        expected,
                        result
                    })
                }
            }
            console.log(`1000 testes aleatórios em cima do método newIndexOf, ${errors.length} erros.`)
            if (errors.length !== 0) {
                console.log(`Erros na função newIndexOf:`)
                console.log(errors)
            } else {
                grade += 1
            }
            console.log("---------------------------------")
        })()
    } catch (error) {
        console.log(`Erro na função newIndexOf:`, error)
        console.log("---------------------------------")
    }
}

if (fezBonus("newJoin")) {
    try {
        (() => {
            if (usaMetodo(newJoin, ".join", "newJoin")) {
                return;
            }

            let errors = []

            let separadores = [
                "",
                " ",
                ", ",
                "529384572",
                "JJJJJJJJJJJJJJ",
                "Kenzie"
            ]


            for (let i = 0; i < 500; i++) {
                let separador = separadores[getRandomIntInclusive(0, 5)]

                let arr = [
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                ]

                let expected = arr.join(separador)
                let result = newJoin(arr, separador)

                if (JSON.stringify(expected) !== JSON.stringify(result)) {
                    errors.push({
                        expected,
                        result
                    })
                }
            }

            for (let i = 0; i < 500; i++) {
                let arr = [
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                ]

                let expected = arr.join()
                let result = newJoin(arr)

                if (JSON.stringify(expected) !== JSON.stringify(result)) {
                    errors.push({
                        expected,
                        result
                    })
                }
            }
            console.log(`1000 testes aleatórios em cima do método newJoin, ${errors.length} erros.`)
            if (errors.length !== 0) {
                console.log(`Erros na função newJoin:`)
                console.log(errors)
            } else {
                grade += 1
            }
            console.log("---------------------------------")
        })()
    } catch (error) {
        console.log(`Erro na função newJoin:`, error)
        console.log("---------------------------------")
    }
}

if (fezBonus("newReduce")) {
    try {
        (() => {
            if (usaMetodo(newReduce, ".reduce", "newReduce")) {
                return;
            }

            let errors = []

            for (let i = 0; i < 500; i++) {
                let arr = [
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                ]

                let expected = arr.reduce((acc, value) => acc + value)
                let result = newReduce(arr, (acc, value) => acc + value)

                if (JSON.stringify(expected) !== JSON.stringify(result)) {
                    errors.push({
                        expected,
                        result
                    })
                }
            }

            for (let i = 0; i < 500; i++) {
                let arr = [
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                ]

                let expected = arr.reduce((acc, value) => {
                    acc.push(value)
                    return acc
                }, [])
                let result = newReduce(arr, (acc, value) => {
                    acc.push(value)
                    return acc
                }, [])

                if (JSON.stringify(expected) !== JSON.stringify(result)) {
                    errors.push({
                        expected,
                        result
                    })
                }
            }

            console.log(`1000 testes aleatórios em cima do método newReduce, ${errors.length} erros.`)
            if (errors.length !== 0) {
                console.log(`Erros na função newReduce:`)
                console.log(errors)
            } else {
                grade += 2 // O valor antigo era 1, mas na rubrica está marcando 2
            }
            console.log("---------------------------------")
        })()
    } catch (error) {
        console.log(`Erro na função newReduce:`, error)
        console.log("---------------------------------")
    }
}

if (fezBonus("newSlice")) {
    try {
        (() => {
            if (usaMetodo(newSlice, ".slice", "newSlice")) {
                return;
            }

            let errors = []

            for (let i = 0; i < 500; i++) {
                let arr = [
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                ]

                let init = getRandomIntInclusive(0, 7)
                let final = 0

                while (final <= init) {
                    final = getRandomIntInclusive(0, 8)
                }

                let expected = arr.slice(init, final)
                let result = newSlice(arr, init, final)

                if (JSON.stringify(expected) !== JSON.stringify(result)) {
                    errors.push({
                        expected,
                        result
                    })
                }
            }
            console.log(`500 testes aleatórios em cima do método newSlice, ${errors.length} erros.`)
            if (errors.length !== 0) {
                console.log(`Erros na função newSlice:`)
                console.log(errors)
            } else {
                grade += 1
            }
            console.log("---------------------------------")
        })()
    } catch (error) {
        console.log(`Erro na função newSlice:`, error)
        console.log("---------------------------------")
    }
}

if (fezBonus("newFlat")) {
    try {
        (() => {
            if (usaMetodo(newFlat, ".flat", "newFlat")) {
                return;
            }

            let arr = [
                getRandomIntInclusive(0, 100),
                getRandomIntInclusive(0, 100),
                [
                    getRandomIntInclusive(0, 100),
                    [
                        getRandomIntInclusive(0, 100),
                        [
                            getRandomIntInclusive(0, 100),
                            [
                                getRandomIntInclusive(0, 100),
                            ]
                        ]
                    ]
                ],
                getRandomIntInclusive(0, 100),
                getRandomIntInclusive(0, 100),
            ]

            let errors = []

            for (let i = 0; i < 100; i++) {
                let profundidade = getRandomIntInclusive(0, arr.length - 1)
                let expected = arr.flat(profundidade)
                let result = newFlat(arr, profundidade)

                if (JSON.stringify(expected) !== JSON.stringify(result)) {
                    errors.push({
                        expected,
                        result
                    })
                }
            }
            console.log(`100 testes aleatórios em cima do método newFlat, ${errors.length} erros.`)
            if (errors.length !== 0) {
                console.log(`Erros na função newFlat:`)
                console.log(errors)
            } else {
                grade += 1
            }
            console.log("---------------------------------")
        })()
    } catch (error) {
        console.log(`Erro na função newFlat:`, error)
        console.log("---------------------------------")
    }
}

if (fezBonus("newFlatMap")) {
    try {
        (() => {
            if (usaMetodo(newFlatMap, ".flatMap", "newFlatMap")) {
                return;
            }
            let errors = [];
            for (let i = 0; i < 500; i++) {
                let arr = [
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                    getRandomIntInclusive(0, 100),
                ]

                let expected = arr.flatMap(elt => [elt * 2])
                let result = newFlatMap(arr, elt => [elt * 2])

                if (!JSON.stringify(expected) === JSON.stringify(result)) {
                    errors.push({
                        expected,
                        result
                    })
                }
            }
            console.log(`500 testes aleatórios em cima do método newFlatMap, ${errors.length} erros.`)
            if (errors.length !== 0) {
                console.log(`Erros na função newFlatMap:`)
                console.log(errors)
            } else {
                grade += 1
            }
            console.log("---------------------------------")
        })()
    } catch (error) {
        console.log(`Erro na função newFlatMap:`, error)
        console.log("---------------------------------")
    }
}

// if (fezBonus("newArrayOf")) {
//     try {
//         (() => {
//             if (usaMetodo(newArrayOf, "Array.of", "newArrayOf")) {
//                 return;
//             }

//             let errors = []

//             for (let i = 0; i < 500; i++) {
//                 let item1 = getRandomIntInclusive(0, 100)
//                 let item2 = getRandomIntInclusive(0, 100)
//                 let item3 = getRandomIntInclusive(0, 100)
//                 let item4 = getRandomIntInclusive(0, 100)
//                 let item5 = getRandomIntInclusive(0, 100)

//                 let expected = Array.of(item1, item2, item3, item4, item5)
//                 let result = newArrayOf(item1, item2, item3, item4, item5)

//                 if (JSON.stringify(expected) !== JSON.stringify(result)) {
//                     errors.push({
//                         expected,
//                         result
//                     })
//                 }
//             }
//             console.log(`500 testes aleatórios em cima do método newArrayOf, ${errors.length} erros.`)
//             if (errors.length !== 0) {
//                 console.log(`Erros na função newArrayOf:`)
//                 console.log(errors)
//             } else {
//                 grade += 1
//             }
//             console.log("---------------------------------")
//         })()
//     } catch (error) {
//         console.log(`Erro na função newArrayOf:`, error)
//         console.log("---------------------------------")
//     }
// }



console.log(`Grade final: ${grade}/21`)