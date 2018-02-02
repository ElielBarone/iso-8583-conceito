import test from 'ava'
import util from './util'
import tagsDefinition from './tagsDefinition'
import deUtil from './dataElement'

//comando para rodar este teste: 
//npm run test:de

const dataElement = '201234000000010000110722183012345606A5DFGR021ABCDEFGHIJ1234567890'


util.printSeparator()
util.print('DE - Data Elements ')
util.print('São as informações da mensagem')
util.print('Para cada bit marcado como ativo, são concatenadas as informações neste elemento')
console.log('ex: codigoProcessamento + valorDaTransacao + dataDaTransacao')
util.print('Existem alguns tipos de tags, que são compostas como à seguir')
console.log('a - Alfa, inclui espaço vazio')
console.log('n - Valor numérico')
console.log('s - Caracteres especiais')
util.print('Estas tipos de tags podem ser combinados, ex: an')
util.print('As tags tem ainda um tamanho pré definido, que são expressas no seguinte formato')
console.log('x - Tamanho fixo, ex: a1')
console.log('.x - Tamanho máximo é x, ex: a.9 (pode conter até 9 caracteres)')
console.log('..xx - Tamanho máximo é xx, ex: a.99 (pode conter até 99 caracteres)')
console.log('..xxx - Tamanho máximo é xxx, ex: a.754 (pode conter até 754 caracteres)')

util.print('No caso das tags com tamanhos variáveis, os primeiros dígitos do DE (Data Element)')
console.log('irão conter os caracteres necessários para expressar o tamanho da tag, ex: a.5 -> 5ABCDE')
console.log('onde 5 é o comprimento real da tag, e o valor é ABCDE')

util.print('Em nossos testes utilizaremos as seguintes tags')
console.log(tagsDefinition.tagsPorBit)

util.print('')



test('Lendo tags de um DataElement' , t=> { 
    //Abaixo os bits que queremos passar em nossa mensagem
    const bitsAtivos = [3,44]

    //Abaixo o valor da tag referente ao bit 3
    const codigoProcessamento = '201234'

    //A tag 44 não tem tamanho fixo, então será necessário adicionar aos dados da tag, a quantidade de 
    //caracteres que desejamos utilizar
    const quantidadeCaracteresDadosAdicionais = '06'
    const dadosAdicionais = 'A5DFGR'

    //O DE (Data Element) deve conter todos os dados da mensagem concatenados na ordem
    const dataElement = codigoProcessamento + quantidadeCaracteresDadosAdicionais + dadosAdicionais
  
    const dadosLidos = deUtil.lerTagsEmUmDataElement(dataElement, bitsAtivos)
    t.is(dadosLidos.CodProcessamento, codigoProcessamento)
    t.is(dadosLidos.DadosAdicionaisResposta, dadosAdicionais)
})