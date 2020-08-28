const randomArray = (size) => {
    const arr = []
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * (size - 1)))
    }
    return arr
}

const linearArray = (size) => {
    const arr = []
    for (let i = 1; i <= size; i++) {
        arr.push(i)
    }
    return arr
}

const polynomialArray = (size, degree) => {
    const arr = []

    for (let i = 0; i < size; i++) {
        arr.push(Math.pow(i, degree))
    }
    return arr
}

const zeroCentredPolynomialArray = (size, degree) => {
    let arr = []

    const lo = -Math.floor(size / 2)
    const hi = Math.ceil(size / 2)

    for (let i = lo; i < hi; i++) {
        arr.push(Math.pow(i, degree))
    }

    if (degree % 2 !== 0) {
        const translation = Math.pow(Math.ceil(size / 2), degree)
        arr = arr.map((element) => element + translation)
    }

    return arr
}

const quadraticArray = (size) => {
    return zeroCentredPolynomialArray(size, 2)
}

const cubicArray = (size) => {
    return zeroCentredPolynomialArray(size, 3)
}

const quinticArray = (size) => {
    return zeroCentredPolynomialArray(size, 5)
}

const arrayGenerators = {
    linear: linearArray,
    random: randomArray,
    quadratic: quadraticArray,
    cubic: cubicArray,
    quintic: quinticArray,
}

export default arrayGenerators
