const formatMoney = money => {
    let decimal = money % 1
    decimal = decimal.toFixed(2)
    decimal = decimal.toString()
    decimal = decimal.slice(2, 4)
    const money_str = money.toString()
    let money_arr = money_str.split('')
    money_arr.reverse()

    const formatted_money_arr = []
    money_arr.forEach((cur, i) => {
        formatted_money_arr.push(cur)
        if ((i + 1) % 3 === 0 && (i + 1) < money_arr.length) {
            formatted_money_arr.push(',')
        }
    })

    const formatted_money = formatted_money_arr.reverse().join('')

    return formatted_money + '.' + decimal
}


export default formatMoney;
