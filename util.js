print  = (...args) => {
    console.log('') 
    console.log(...args)
}
printSeparator = () => console.log("**************************************************************")

function mordeParteDados(dados, quantidadeCaracteres){
    const partesDado = {}
    partesDado.mordida = dados.substring(0, quantidadeCaracteres)
    partesDado.dadoRestante = dados.substring(quantidadeCaracteres, dados.length)
    return partesDado
}

exports.print               = print
exports.printSeparator      = printSeparator
exports.mordeParteDados     = mordeParteDados
