import { log10, log, abs } from 'mathjs'

function factorFriccion({ k, d, Re }) {
  let initialValue = 0.001
  if (Re <= 2200) {
    return 64 / Re
  } else {
    let current
    let func
    let der
    let next = 1 / initialValue ** 0.5
    do {
      current = next
      func = -2 * log10(k / (3.7 * d) + (2.51 * current) / Re)
      der =
        (-2 / log(10)) * (2.51 / Re / (k / (3.7 * d) + (2.51 * current) / Re))
      next = current - (func - current) / (der - 1)
    } while (abs(next - current) > 0.000001)

    return (1 / next) ** 2
  }
}

console.log(factorFriccion({ k: 1.5 * 10 ** -6, d: 0.2, Re: 913063 }))
console.log(factorFriccion({ k: 2 * 10 ** -6, d: 0.25, Re: 20000 }))
console.log(factorFriccion({ k: 2.5 * 10 ** -6, d: 0.3, Re: 15000 }))
console.log(factorFriccion({ k: 2.5 * 10 ** -6, d: 0.3, Re: 2000 }))
