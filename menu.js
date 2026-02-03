//import module
import { kalkulator } from './rumus.js';
import readline from 'readline';

// Membuat interface untuk input dari terminal
const inputUser = readline.createInterface({
    input: process.stdin, 
    output: process.stdout
});

// Minta input dari pengguna
inputUser.question('Masukkan angka pertama: ', angka1 => {
    inputUser.question('Masukkan angka kedua: ', angka2 => {
        inputUser.question('Masukkan operator (+, -, /, *): ', operator => {
		//proses perhitungan
            console.log(
                `Hasil: ${kalkulator(
                    parseFloat(angka1), //mengubah string pada inputan menjadi tipe data float
                    parseFloat(angka2), //mengubah string pada inputan menjadi tipe data float
                    operator
                )}`
            );
            inputUser.close();
        });
    });
});