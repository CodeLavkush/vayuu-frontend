
export default function generateId(prefix){
    let digits = []
    for (let i = 0; i < 8; i++){
        let digit = Math.floor(Math.random() * 10)
        digits.push(digit)
    }
    return [prefix.toUpperCase(), digits.join("")].join("")
}