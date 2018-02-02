const util = require('./util')

exports.getTipoMensagem     = getTipoMensagem
exports.getFuncaoMensagem   = getFuncaoMensagem 

//Esta função analisará o segundo caractere (x0xx) e informará o tipo de mensagem
function getTipoMensagem(messageFormat){
    //recupera o segundo caractere através do index 0 | 1 | 2 | 3
    const tipoMensagem = messageFormat[1]
    var descricaoTipoMensagem;
   
    //verifica o tipo da mensagem
    switch(tipoMensagem){
        case '2':
            descricaoTipoMensagem = 'Mensagem Financeira' 
            break
        case '4':
            descricaoTipoMensagem = 'Mensagem Reversa' 
            break        
        case '8':
            descricaoTipoMensagem = 'Gerenciamento da rede'
            break        
    }  
    
    util.print('verificando tipo da mensagem ', messageFormat, ` -> tipo: ${tipoMensagem} - ${descricaoTipoMensagem}`)  
    return descricaoTipoMensagem
}


//Esta função analisará o segundo caractere (xx0x) e informará a função da mensagem
function getFuncaoMensagem(messageFormat){
    
    //recupera o terceiro caractere através do index 0 | 1 | 2 | 3
    const funcaoMensagem = messageFormat[2]
    var descricaoFuncaoMensagem;
   
    //verifica a função da mensagem
    switch(funcaoMensagem){
        case '0':
            descricaoFuncaoMensagem =  'Requisição' 
            break
        case '1':
            descricaoFuncaoMensagem = 'Requisição de Resposta'
            break
    }    

    util.print('verificando função da mensagem ', messageFormat, ` -> funcao: ${funcaoMensagem} - ${descricaoFuncaoMensagem}`)
    return descricaoFuncaoMensagem;
}