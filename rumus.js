// rumus.js

export function kalkulator(angka1, angka2, operator) {
    switch (operator) {
        case "+":
            return angka1 + angka2;
        
        // tambahkan case untuk pengurangan
        case "-":
            return angka1 - angka2;
        
        // tambahkan case untuk pembagian
        case "/":
            if (angka2 === 0) {
                return "Error: Pembagian dengan nol!";
            }
            return angka1 / angka2;
        
        // tambahkan case untuk perkalian
        case "*":
            return angka1 * angka2;
        
        default:
            return "Operator tidak valid!";
    }
}

//module.exports = {kalkulator};