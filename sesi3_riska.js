let tinggi = 4; //banyak baris yang diinginkan

//loop pertama untuk menentukan jumlah baris 
for (let jumlah_baris = 1; jumlah_baris <= tinggi; jumlah_baris++) { 
    let baris = "";
    //loop kedua untuk menentukan jumlah isi pada setiap 
    for (let jumlah_isi = 1; jumlah_isi <= jumlah_baris; jumlah_isi++) {
        baris += "*"; //isi yang akan dicetak
    }
    console.log(baris);
}