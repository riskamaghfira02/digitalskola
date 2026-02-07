//jenis variabel : let, var, const

// 1. Reassign
// let ReassignLet = "Riska Let"
// var ReassignVar = "Riska Var"
// const ReassignConst ="Riska Const" //const > tetap, 1 nilai variable tidak dapat dirubah dan di proses

// console.log(ReassignLet)
// console.log(ReassignVar)
// console.log(ReassignConst)

// //re assign nilai variabelnya 
// ReassignLet = "Riska Let New"
// ReassignVar = "Riska Var New"
// ReassignConst = "Riska Const New"

// console.log(ReassignLet)
// console.log(ReassignVar)
// console.log(ReassignConst)
//---------------------------------------------------------
// 2. Redeclear
// let RedeclearLet = "Riska Let"
// var RedeclearVar = "Riska Var"
// const RedeclearConst ="Riska Const" //const > tetap, 1 nilai variable tidak dapat dirubah dan di proses

// //let RedeclearLet = "Riska Let New" //error : karena sebelumnya sudah di declear
// var RedeclearVar = "Riska Var New" //dapat di declare
// //const RedeclearConst ="Riska Const New"

// console.log(RedeclearLet)
// console.log(RedeclearVar)
// console.log(RedeclearConst)

// //re assign nilai variabelnya 
// ReassignLet = "Riska Let New"
// ReassignVar = "Riska Var New"
// ReassignConst = "Riska Const New"

// console.log(ReassignLet)
// console.log(ReassignVar)
// console.log(ReassignConst)
//---------------------------------------------------------
//2. Scope

//Var
export function variabel(){
    if (true){
        var nama ="Riska"
    }
        console.log(nama)
}

//Memanggil Variable
variabel()

//---------------------------------------------------------
//Let
// if (true) {
//     let kelas = "QA Engineer"
//     kelas = "SDET"

//     console.log(kelas)
// }

//---------------------------------------------------------
//Const
// if (true) {
//     const usia = "30 tahun"
//    // usia = "29 tahun"

//     console.log(usia)
// }