module.exports = function toReadable (number) {
  const arrNumber = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
  const objNumber = {
    10: 'ten',
    11: 'eleven',
    12: 'twelve',
    13: 'thirteen',
    14: 'fourteen',
    15: 'fifteen',
    16: 'sixteen',
    17: 'seventeen',
    18: 'eighteen',
    19: 'nineteen'
  }

  const splitter = (number, divider) => number % divider

  if (String(number).length === 1) {
    return arrNumber[number]
  }

  if (String(number).length === 2 && number < 20) {
    return objNumber[number]
  }

  function forTensOver20(digit) {
    let tens = Math.trunc(digit/10)
    let units = arrNumber[splitter(digit, 10)]
    if (tens >= 2 && tens <= 5 || tens == 8) {
      switch (tens) {
        case 2: tens = 'twenty'; break;
        case 3: tens = 'thirty'; break;
        case 4: tens = 'forty'; break;
        case 5: tens = 'fifty'; break;
        case 8: tens = 'eighty'; break;
      }
      if (units === 'zero') {
        return tens
      }
      return tens +  ` ${units}`
    }
    if (units === 'zero') {
      return `${arrNumber[tens]}` + 'ty'
    }
    return `${arrNumber[tens]}` + 'ty' + ` ${units}`
  }

  if (String(number).length === 2 && number >= 20) {
    return forTensOver20(number)
  }

  if (String(number).length === 3) {
    let hundreds =  arrNumber[Math.trunc(number/100)] + ' hundred'
    let rest = splitter(number, 100)

    if (rest === 0) {
      return hundreds
    }

    if (String(rest).length === 1) {
      return hundreds + ` ${arrNumber[rest]}`
    }

    if (String(rest).length === 2 && rest < 20) {
      return hundreds + ` ${objNumber[rest]}` 
    }

    if (String(rest).length === 2 && rest >= 20) {
      let res = forTensOver20(rest)
      return hundreds + ` ${res}`
    }
  }
}

