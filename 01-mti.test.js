import test from 'ava'
import util from './util'
import mtiUtil from './mti.js'

//comando para rodar este teste: 
//npm run test:mti

util.printSeparator()
util.print('Idendificador do tipo da mensagem (MTI) são os primeiros 04 caracteres da mensagem')
console.log('[ABCD]')
console.log('A: Versão do ISO, ex: 0 - 8583 de 1987, 1 - 8583 de 1993')
console.log('B: Classe da mensagem, ex: 1 - Mensagem de Autorização, 2 - Mensagem financeiro')
console.log('C: Função da mensagem, ex: 0 - Requisição, 1 - Requisição de Resposta')
console.log('D: Origem da mensagem, ex: 0 - Adquirente, 2 - Emissor')



test('Verificando tipo de mensagem' , t=> {     
    const tipoMensagem = mtiUtil.getTipoMensagem('0200')
    t.is(tipoMensagem, 'Mensagem Financeira')
})

test('Verificando função de mensagem' , t=> {     
    const funcaoMensagem = mtiUtil.getFuncaoMensagem('0200')
    t.is(funcaoMensagem, 'Requisição')
})

