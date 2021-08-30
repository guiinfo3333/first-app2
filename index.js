/*
* Exemplo de aplicação Node.js com MongoDB
* Autor: Wellington Wagner F. Sarmento
* 
*
* Este exemplo foi baseado no código escrito em:
* Utilizando a engine EJS para aplicações em NodeJS 
* (https://www.codementor.io/@nulldreams/utilizando-a-engine-ejs-para-aplicacoes-em-nodejs-dok81l3si)
*
*
*/

const express = require("express");
const app = express();
const routes = require("./routes");
const expressLayouts = require("express-ejs-layouts");
const { urlencoded } = require("express");
const path = require('path');


const port = 3030;
const address = "localhost";

const utils = require("./utils");

const faker = require("faker"); //modulo usado para criar dados fakes aleatorios para testes

let toggleBol = true;


// a palavra reservada "global" cria uma variável ou objeto global para o sistemas. Ele pode ser visto em qualquer parte do código ou dos módulos do projeto. Assim, Users podem ser vistos tanto aqui no index.js quanto em routes.js
// global.users =[
//     {name:"Wellington W. F. Sarmento",address:"Rua Dom Jeronimo, 666",email:"wwagner@virtual.ufc.br",age:46,heigth:1.70,vote:true},
//     {name:"Patricia S. Paula",address:"Rua Dom Jeronimo, 666",email:"patricia@virtual.ufc.br",age:46,heigth:1.70,vote:true},ß
//     {name:"Henrique Sérgio L. Pequeno",address:"Rua do Henrique, 666",email:"henrique@virtual.ufc.br",age:46,heigth:1.70,vote:true}];
global.users = [];

for (let cont = 0; cont < 20; cont++) {
    users.push({ name: faker.name.findName(), address: faker.address.streetAddress(), email: faker.internet.email(), age: utils.getRandomByInterval(15, 50, true), heigth: utils.getRandomByInterval(1.50, 1.70, false).toFixed(2), vote: toggleBol });
    toggleBol = !toggleBol;
}


//ativa uso do EJS e do Express-ejs-layouts
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "..", "public")))

app.use(express.urlencoded({ extended: false })); //prepara a aplicacao para receber dados na forma de query string
app.use(express.json()); //prepara a aplicacao para receber dados no formato JSON

//esse codigo abaixo foi criado para testar variacoes de tempo de resposta do servidor, simulando problemas de lentidao na conexcao e/ou retardos no tempo de resposta do computador onde esta a aplicacao (servidor)
//espera um tempo de 2 segundos (2000 milissegundos) para responder a qualquer requisicao do cliente. Isso gera um delay (espera) proposital para testes do codigo e condicoes de erro.
//app.use(utils.delay(2000));



//Criando usando rotas simples que estão no arquivo routes.js
app.use('/', routes);

//Criando um servidor simples com o Node.js e o Express
const server = app.listen(port, address, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log(`Servidor executando no endereço ${host} e porta ${port}`);
});