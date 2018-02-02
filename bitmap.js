const util = require('./util')

exports.bmp2Binary              = bmp2Binary
exports.getActiveBits           = getActiveBits
exports.possuiProximoBitmap     = possuiProximoBitmap


//Recebe o bitmap e converte em binário
function bmp2Binary(bitmap){   
    //converte cada caractere em binario
    var hex = bitmap.split('').map(char2Binary)
    hex = hex.join('')

    util.print(`O bitmap ${bitmap} foi convertido para binário: ${hex}`)
    return hex;
}

//Converte o caractere de hexa para binário, preenchendo com zeros a esquerda
//ex: B -> 1011
function char2Binary(char){
    return ('0000' + parseInt(char, 16).toString(2)).slice(-4)
}

//Verifica cada bit se é 1 é um bit ativo, se zero é descartado, retornando um array dos bits ativos
//ex: 1000010 -> [1,6]
function getActiveBits(binary){
    const activeRegexp = /1/g
    const activeBits = []
    var match;
    
    do{
      match = activeRegexp.exec(binary)   
      if(match){
        activeBits.push(match.index + 1)
      }
    }while(match)

    util.print(`O binário ${binary} tem os seguintes bits marcados ${activeBits.join(',')}` )
    return activeBits
}

//Converte o bitmap em binário e verifica se o primeiro bit é ativo
function possuiProximoBitmap(bitmap){
    const formatoBinario = bmp2Binary(bitmap)
    const bitsAtivos = getActiveBits(formatoBinario)
    const possui = bitsAtivos.includes(1)

    util.print(`O bitmap ${bitmap} convertido: ${formatoBinario} ${possui ? 'INDICA' : 'NÃO INDICA '} próximo bitmap`)
    return possui;
}