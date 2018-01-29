import test from 'ava'

const primeiroBitmap = 'B220000000100000'

//Recebe o bitmap e converte em binário
function bmp2Binary(bitmap){    
    var hex = bitmap.split('').map(char2Binary)
    return hex.join('')
}

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

    
    return activeBits
}

test('Conertendo primeiro bitmap em binário', t => {
    var bmpBinary = bmp2Binary(primeiroBitmap)
    console.log('o primeiro bitmap é ', primeiroBitmap, ' e seu valor binário é ', bmpBinary    )
    t.is(bmpBinary, '1011001000100000000000000000000000000000000100000000000000000000')
})



test('Verificando bits ativos do binário', t => {
    const bmpBinary = bmp2Binary(primeiroBitmap)
    const activeBits = getActiveBits(bmpBinary)
    console.log('os bits ativos de 1011001000100000000000000000000000000000000100000000000000000000 são ', activeBits)
    t.is(activeBits.join(','), '1,3,4,7,11,44')
})


