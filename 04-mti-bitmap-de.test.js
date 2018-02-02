import test from 'ava'
import util from './util'
import mtiUtil from './mti'
import bitmapUtil from './bitmap'
import deUtil from './dataElement'
//comando para rodar este teste: 
//npm run test:all

const mti = '0200'
const primeiroBitmap = 'B220000000100000'
const segundoBitmap = '0000000000800000'
const dataElement = '201234000000010000110722183012345606A5DFGR021ABCDEFGHIJ1234567890'
const isoMessage = mti + primeiroBitmap + segundoBitmap + dataElement

util.printSeparator()
util.print('Vamos tratar de todos os dados juntos')
console.log('MTI - BITMAP - DE')
console.log('MTI - ', mti)
console.log('BITMAP 01 - ', primeiroBitmap)
console.log('BITMAP 02 - ', segundoBitmap)
console.log('DE - ', dataElement)
util.print(isoMessage)


function readMessageTypeIdentifier(mensagemCompleta){    
    const dadosPart = util.mordeParteDados(mensagemCompleta, 4)
    const tipoMensagem = mtiUtil.getTipoMensagem(dadosPart.mordida)
    const funcaoMensagem = mtiUtil.getFuncaoMensagem(dadosPart.mordida)
    return {tipoMensagem, funcaoMensagem}
}

function readBitmaps(mensagemCompleta){
    var mensagemRestante = mensagemCompleta
    var mensagemInfo =  []

    //Removendo mti
    var mensagemParts = util.mordeParteDados(mensagemRestante, 4)
    mensagemRestante = mensagemParts.dadoRestante

    //Mordendo o primeiro bitmap
    mensagemParts = util.mordeParteDados(mensagemRestante, 16)
    const primeiroBitmap = mensagemParts.mordida
    mensagemRestante = mensagemParts.dadoRestante
    mensagemInfo.push(primeiroBitmap)


    const possuiProximoBitmap = bitmapUtil.possuiProximoBitmap(primeiroBitmap)

    if(possuiProximoBitmap){
        mensagemParts = util.mordeParteDados(mensagemRestante, 16)
        const segundoBitmap = mensagemParts.mordida
        mensagemRestante = mensagemParts.dadoRestante        
        mensagemInfo.push(segundoBitmap)
    }

    return mensagemInfo
}

function readDataElements(isoMessage){    
    const allBitmaps    = readBitmaps(isoMessage)  
    const dataElement   = getDataElement(isoMessage, allBitmaps.length)    
    const bitmapsinary  = bitmapUtil.bmp2Binary(allBitmaps.join(''))
    const bitsAtivos   = bitmapUtil.getActiveBits(bitmapsinary)
    const dadosLidos    = deUtil.lerTagsEmUmDataElement(dataElement, bitsAtivos)
    util.print('Lendo data element ', dataElement)
    util.print('Resultado da leitura ', dadosLidos)
    return dadosLidos
}

function getDataElement(isoMessage, qtdBitmaps){
    const caracteresMti = 4
    const caracteresBitmap = 16
    const caracteresMtiEBitmaps = qtdBitmaps * caracteresBitmap
    const dataElement = util.mordeParteDados(isoMessage, caracteresMti + caracteresMtiEBitmaps)
    return dataElement.dadoRestante
}

test('Verificando mti' , t=> {
    const mtiInfo = readMessageTypeIdentifier(isoMessage)
    t.is(mtiInfo.tipoMensagem, 'Mensagem Financeira')
    t.is(mtiInfo.funcaoMensagem, 'Requisição')
})


test('Verificando bitmaps' , t=> {     
    const bitmapInfo = readBitmaps(isoMessage)
    t.is(bitmapInfo[0], primeiroBitmap)
    t.is(bitmapInfo[1], segundoBitmap)
})

test('Verificando Data Elements' , t=> {     
    const dataElementRead = readDataElements(isoMessage)
    t.is(dataElementRead.CodProcessamento, '201234')           
    t.is(dataElementRead.DadosAdicionaisResposta,  'A5DFGR')
    t.is(dataElementRead.DataTransacao,  '1107221830')
    t.is(dataElementRead.NumRastreamento,  '123456')
    t.is(dataElementRead.ReservadoISO,  'ABCDEFGHIJ1234567890')
    t.is(dataElementRead.ValorTransacao,  '000000010000')
         
})