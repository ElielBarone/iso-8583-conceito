const tagsDefinition = require('./tagsDefinition')
const util = require('./util')

exports.lerTagsEmUmDataElement = lerTagsEmUmDataElement
exports.getTagsPorBitsAtivos = getTagsPorBitsAtivos


//recebe um DE (Data Element) e um array indicando os bits ativos que iremos ler na tag
//retorna as informações extraídas
function lerTagsEmUmDataElement(de, bitsAtivos){
    var tags = getTagsPorBitsAtivos(bitsAtivos)
    tags = tags.map(adicionaInformacoesTamanhoNaTag)

    var dadosDaTransacao = {}
    var tamanhoRealTag
    var dadosParts
    var dadosFaltaLer = de

    tags.map(t => {

        //Neste caso a tag não tem tamanho fixo, por isso será necessário extrair os caracteres
        //que informam o tamanho real da tag, para somente depois ler o seu conteúdo
        if(t.quantidadeCaracteresInformacaoTamanho > 0){
            dadosParts =  util.mordeParteDados(dadosFaltaLer, t.quantidadeCaracteresInformacaoTamanho)
            tamanhoRealTag = dadosParts.mordida
            dadosFaltaLer = dadosParts.dadoRestante
        }else{
           tamanhoRealTag = t.tamanho
        }

        dadosParts = util.mordeParteDados(dadosFaltaLer, tamanhoRealTag)
        dadosFaltaLer = dadosParts.dadoRestante
        dadosDaTransacao[t.nome] = dadosParts.mordida
    })

    util.print(`Tendo o seguinte DE (Data Element) '${de}' que possui informações dos bits a seguir: ${bitsAtivos}` )
    console.log('Lemos os dados da seguinte forma ', dadosDaTransacao)
    
    return dadosDaTransacao
}




function getTagsPorBitsAtivos(bits){
    var tag;
    var tags = bits.map(bit => {
        //O bit 1 não é tag, e sim a indicação de próximo bitmap        
        if(bit == 1){
            return
        }

        tag = tagsDefinition.tagsPorBit[bit]
        return tag    
    })

    tags = tags.filter(t=> t)

    util.print('Recuperando tags para os seguintes bits ', bits)
    console.log('Tags recuperadas ', tags)

    return tags
}

//Adiciona quantidade de caracteres que guardam a informação 
//sobre o comprimento real da tag 
function adicionaInformacoesTamanhoNaTag(tag){
    
    const tagComInformacaoTamanho = {...tag}
    const ocorenciasDePonto = tag.formato.match(/\./g)
    const quantidadeCaracteresInformacaoTamanho = ocorenciasDePonto ? ocorenciasDePonto.length : 0
    tagComInformacaoTamanho.quantidadeCaracteresInformacaoTamanho = quantidadeCaracteresInformacaoTamanho
    tagComInformacaoTamanho.tamanho = tag.formato.replace(/\D/g, "")

    util.print('a tag ', tag, (quantidadeCaracteresInformacaoTamanho > 0 ?  `CONTÉM ${quantidadeCaracteresInformacaoTamanho}` : 'NÃO CONTÉM'), ' caracteres que informam o tamanho da tag')

    return tagComInformacaoTamanho
}