//Conditional Statement

//1. If

// let number = 10;
// if (number>5){
//     console.log("ini bernilai benar");
// }

//---------------------------------------------------------

//2. If..Else
//contoh 1
// let number = -1;
// if (number > 0){
//     console.log("ini bernilai positif");
// }else{
//     console.log("ini bernilai negatif");
// }

//contoh 2

import readlineSync from "readline-sync";

let kkm = 75;
let inputNilai ="";

inputNilai = readlineSync.question("Masukkan Nilai Anda : ");

if (inputNilai >= kkm){
    console.log("Selamat kamu LULUS dengan Predikat A !");
}else if (inputNilai === kkm) { 
    console.log("Selamat Kamu LULUS dengan Predikat B");
}else{
    console.log("Maaf Anda harus Remedial !");
}