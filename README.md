# ISO-8583
Entenda de vez de uma maneira simples e verbosa o conceito do padrão ISO8583 utilizado em meios de pagamento.
Você encontrará classes bem comentadas, explicando cada parte da mensagem.


## Dependências
[Node versão 8 ou superior](https://nodejs.org/en/)

## Como Rodar
Primeiro baixe as dependências mapeadas
```
npm i
```

**O projeto é definido em 4 arquivos de testes, que validam e explicam as seguintes partes:**

**MTI** [01-mti.test](01-mti.test.js) *Responsável por testar a primeira parte da mensagem ISO (Message Type Identifier)*
```
npm run test:mti
```

**BITMAP** [02-bitmap.test](02-bitmap.test.js) *Responsável por testar a segunda parte da mensagem ISO (Bitmap - Onde marcamos os bits das informações que iremos enviar na mensagem)*
```
npm run test:bitmap
```

**DE** [03-de.test](03-de.test.js) *Responsável por testar a terceira parte da mensagem ISO (Data Element - Onde consta os dados da mensagem)*

```
npm run test:de
```

**MENSAGEM COMPLETA** [04-mti-bitmap-de.test](04-mti-bitmap-de.test.js)  *Contém a leitura de uma mensagem completa*
```
npm run test:all
```

## Referências
[Jimmy's Blog](http://jimmod.com/blog/2011/07/25/jimmys-blog-iso-8583-introduction-beginners-tutorial/)

[Wikipedia](https://en.wikipedia.org/wiki/ISO_8583)


## Dúvidas?

Para que o estudo fique simples, trabalharemos apenas algumas tags, contudo na [wikipedia](https://en.wikipedia.org/wiki/ISO_8583) você pode ver a configuração de todas as tags, então você poderá alterar o arquivo tagsDefinition.json, assim poderá utilizar qualquer tag desejada.