//Loop Statement 
//---------------------------------------------------------
//1. For Loop

//Contoh 1
//jika <= maka angka terakhir akan masuk
// for (let a = 1; a<=6; a++){
//     console.log("Registrasi ke " + a)
// }

//contoh 2
//jika < maka angka terakhir tidak akan masuk
// for (let a = 1; a<6; a++){
//     console.log(a)
// }

//contoh 3
// let barang = ["Tas", "Buku", "Pulpen", "Penghapus", "Penggaris"]; //panjang array
// console.log(barang.length); //jumlah data
// let panjangArray = barang.length;
// for (let i =0; i<=panjangArray-1; i++){
//     console.log(barang[i]); 
// }
//---------------------------------------------------------
//2. While Loop

//Contoh 1
// let i = 1;
// while (i<=6){
//     console.log(i);
//     i++;
// }

//Contoh 2
// let coin = 1000;
// let i = 0;
// while (i < coin){
//     i+= 100;
//     //console.log(i)
//     if (i == coin){
//         console.log("Koin Anda "+i+", Silahkan lakukan penukaran hadiah !");
//     } else {
//         console.log("Maaf koin belum cukup, koin anda "+i);
//     }
// }
//---------------------------------------------------------

//3. Do While Loop

//Contoh 1

// let x = 0;
// do{
//     console.log(x);
//     i++;
// } while (x<i);

//Contoh 2
// import readlineSync from "readline-sync";

// let correctPIN ="1234";
// let inputPIN;

// do{
//     inputPIN = readlineSync.question("Masukkan PIN Anda : ");
//     if (inputPIN !== correctPIN){
//         console.log("PIN Salah. Coba lagi \n");
//     } else {
//         console.log("PIN Benar. Akses diterima.");
//     }
// }while (inputPIN !== correctPIN);

//---------------------------------------------------------

//4. For Each
//Contoh 
let namaBuah = ["apel", "semangka", "pir", "pepaya", "alpukat"];

namaBuah.forEach(function (buah){
    console.log(buah);
})