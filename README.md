# Native Burguers
  O Native Burguers é um aplicativo-desafio que se consiste num produto para gerir um negócio fictício de venda de lanches.

Basta executar o aplicativo pelo client, basta rodar os comandos:
```
git clone https://github.com/TheusBrz/native-burguer.git
```

Acesse a pasta clonada através do terminal e execute o seguinte comando para instalar as dependências:
```
yarn install 
```

Agora vamos linkar algumas dependências, execute: 
```
react-native link
```

Para executar na plataforma desejada, execute
Para IOs:
```
react-native run-ios 
```
Para Android:
```
react-native run-android
```

## Descrição
  Neste projeto a tipagem de variáveis foi feita através do PropTypes. Foi adotado o Redux como controlador de estados e o Redux Saga como Middleware para as requisições do Redux e aplicação da regra de negócio. Foi adotado o EsLint para o controle de qualidade de código e o Babel para configurações auxiliares.
