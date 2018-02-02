import test from 'ava'
import util from './util'
import bitmapUtil from './bitmap.js'

//comando para rodar este teste: 
//npm run test:bitmap

const primeiroBitmapHexa = 'B220000000100000'
const segundoBitpamHexa = '0000000000800000'

util.printSeparator()
util.print('Bitmap ')
util.print('Conjunto de 16 caracteres Hexadecimais')
util.print('Para desvendar um BITMAP, o mesmo deve ser convertido em binário')
console.log('ex: B220000000100000 convertido seria 1011001000100000000000000000000000000000000100000000000000000000')
console.log('Cada bit marcado (1) é considerado como bit ativo,')
console.log('neste caso os bits 1, 3, 4, 7, 11 e 44 estariam presentes na mensagem')
util.print('Caso o primeiro bit de um bitmap estiver marcado, isso significa que haverá um próximo bitmap')


test('Convertendo bitmap para binário' , t=> {     
    const formatoBinario = bitmapUtil.bmp2Binary(primeiroBitmapHexa)
    t.is(formatoBinario, '1011001000100000000000000000000000000000000100000000000000000000')
})

test('Verificando bits ativos' , t=> {
    const formatoBinario = bitmapUtil.bmp2Binary(primeiroBitmapHexa) 
    const bitsAtivos = bitmapUtil.getActiveBits(formatoBinario)
    t.is(formatoBinario, '1011001000100000000000000000000000000000000100000000000000000000')
})

test('Verificando se há próximo bitmap' , t=> {
    const primeiroBitmapIndicaProximo = bitmapUtil.possuiProximoBitmap(primeiroBitmapHexa)    
    const segundoBitmapIndicaProximo = bitmapUtil.possuiProximoBitmap(segundoBitpamHexa)    
    t.is(primeiroBitmapIndicaProximo, true)
    t.is(segundoBitmapIndicaProximo, false)
})