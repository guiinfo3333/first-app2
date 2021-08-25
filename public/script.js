let cadastro;


function update(index, link) {
    //seleciona todas as tags que sejam td 
    let tds = document.querySelectorAll(`td[data-index-row='${index}']`);
    let spans = document.querySelectorAll(`td[data-index-row='${index}'] > span`);
    let inputs = document.querySelectorAll(`td[data-index-row='${index}'] > input`);

    let lenTds = tds.length - 1; //numero de tds de uma linha da tabela
    let linkUpdate = tds[lenTds - 1]; //retorna o conteudo da penultima td, no caso, o link de update
    let linkRemove = tds[lenTds];

    let lenInputs = inputs.length; //pega numero de inputs

    let button = inputs[lenInputs - 1]; //cria uma conexao com o input que é do tipo button



    linkUpdate.className = 'hidden';
    linkRemove.className = 'hidden';
    tds[lenTds - 2].className = 'show'; //mostra butao de envio

    //esconde todos os campos de exibição de dados do cadastro
    for (let cont = 0; cont < spans.length; cont++) {
        if (spans[cont].className == "show") {
            spans[cont].className = "hidden";
        } else {
            spans[cont].className = "show";
        }
    }
    //mostra os campos de preenchimento para o cadastro
    for (let cont = 0; cont < inputs.length; cont++) {
        if (inputs[cont].className == "hidden") {
            inputs[cont].className = "show";
        }
    }

    //escuta se o botao foi clicado
    button.addEventListener('click', () => {
        const http = new XMLHttpRequest(); //XHR - cria um objeto para requisição ao servidor
        const url = link; //"/cadastro/update";
        let data = { id: "", name: "", email: "", address: "", age: "", heigth: "", vote: "" };
        let dataToSend;



        http.open("POST", link, true); //abre uma comunicação com o servidor através de uma requisição POST
        //Se no servidor nao houver um elemento esperando por uma mensagem POST (ex. router.post()) para a rota /cadastro/update ocorrerar um erro: 404 - File Not Found

        //Dados HTML teria no cabecalho HEADER (da mensagem HTTP) - Content-Type= text/html
        //Dados estruturados como querystring (ex: http//www.meu.com.br:3030/?campo=meu&campo2=10) -  Content-Type=x-www-form-urlencoded
        //Dados no formato de Objeto Javascript para troca de informacoes (JSON) Content-Type=application/json : Ex.: {key1:value1,key2:value2}
        http.setRequestHeader('Content-Type', 'application/json'); //constroi um cabecalho http para envio dos dados

        for (let cont = 0; cont < inputs.length; cont++) { //desabilita todos os inputs para escrita ou acesso (no caso do button)
            if (inputs[cont].disabled == true) {
                inputs[cont].disabled = false;
            } else inputs[cont].disabled = true;
        }
        //    // essa suncao esta sendo colocada aqui só para dar uma parada e você poder ver os inputs desabilitados
        //    //funcao que espera um tempo N, dado em milissegundos, e então chama uma função (callback). No caso, vamos usar 2000 ms = 2s
        //    //essa funcao foi construida somente para que voce possa ver os inputs ficando desabilitados. Nao precisa usar.
        //    function sleep(milliseconds) {
        //         const date = Date.now();
        //         let currentDate = null;
        //         do {
        //             currentDate = Date.now();
        //         } while (currentDate - date < milliseconds);
        //     }
        //     console.log("Mostra essa mensagem no console, primeiro!");
        //     sleep(2000)
        //     console.log("Pronto, você consegue ver seus inputs desabilitados!");
        //    //fim do codigo usado para ver os inputs desabiulitados

        //preenche um objeto com o indice da linha da tabela e os valores dos campos input do tipo text
        data.id = index; //esse dado nao existe no vetor Users do lado do servidor (backend), mas preciso dele para apontar o indice do vetor que quero modificar
        data.name = inputs[0].value;
        data.email = inputs[1].value;
        data.address = inputs[2].value;
        data.age = inputs[3].value;
        data.heigth = inputs[4].value;
        data.vote = inputs[5].value;

        dataToSend = JSON.stringify(data); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON. Se quisesse o objeto no formato binario, usaria: JSON.parse(data)

        http.send(dataToSend);//envia dados para o servidor na forma de JSO

        /* este codigo abaixo foi colocado para que a interface de cadastro so seja modificada quando se receber um aviso do servidor que a modificacao foi feita com sucesso. No caso o aviso vem na forma do codigo 200 de HTTP: OK */
        http.onload = () => {

            /*
            readyState:
            0: request not initialized
            1: server connection established
            2: request received
            3: processing request
            4: request finished and response is ready

            status:
            200: "OK"
            403: "Forbidden"
            404: "Page not found"
            */
            // baseado nos valores acima apresentados, o codigo abaixo mostra o que foi enviado pelo servidor como resposta ao envio de dados. No caso, se o request foi finalizado e o response foi recebido, a mensagem recebida do servidor eh mostrada no console do navegador. esse codigo foi feito apenas para verificar se tudo ocorreu bem no envio

            if (http.readyState === 4 && http.status === 200) { //testa se o envio foi bem sucedido
                for (let cont = 0; cont < spans.length; cont++) {
                    if (spans[cont].className == "hidden") {
                        spans[cont].innerHTML = inputs[cont].value;
                        spans[cont].className = "show";
                    } else {
                        spans[cont].className = "hidden";
                    }
                }

                //esconde os campos de preenchimento para o cadastro
                for (let cont = 0; cont < inputs.length; cont++) {
                    if (inputs[cont].className == "show") {
                        inputs[cont].className = "hidden";
                        if (inputs[cont].disabled == false) {//habilita novamente os inputs para escrita
                            inputs[cont].disabled = true;
                        }
                    }
                }

                linkUpdate.className = 'show';
                linkRemove.className = 'show';
                tds[lenTds - 2].className = 'hidden';
            } else {

                console.log("Ocorreu erro no processamento dos dados no servidor: ", http.responseText);
            }
        }
        /*
        readyState:
        0: request not initialized
        1: server connection established
        2: request received
        3: processing request
        4: request finished and response is ready
    
        status:
        200: "OK"
        403: "Forbidden"
        404: "Page not found"
        */
        // baseado nos valores acima apresentados, o codigo abaixo mostra o que foi enviado pelo servidor como resposta ao envio de dados. No caso, se o request foi finalizado e o response foi recebido, a mensagem recebida do servidor eh mostrada no console do navegador. esse codigo foi feito apenas para verificar se tudo ocorreu bem no envio

        // http.onreadystatechange = (e)=>{
        //     if (http.readyState === 4 && http.status === 200) { //testa se o envio foi bem sucedido
        //         console.log(http.responseText);

        //     }
        // }

    });

}

function remove(index, _name, link) { //(index,link)

    //escuta se o botao foi clicado

    const http = new XMLHttpRequest(); //cria um objeto para requisição ao servidor
    const url = link;

    http.open("POST", link, true); //abre uma comunicação com o servidor através de uma requisição POST
    http.setRequestHeader('Content-Type', 'application/json'); //constroi um cabecalho http para envio dos dados

    //dataToSend = JSON.stringify({id:index}); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON
    dataToSend = JSON.stringify({ name: _name }); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON

    http.send(dataToSend);//envia dados para o servidor na forma de JSON

    /* este codigo abaixo foi colocado para que a interface de cadastro so seja modificada quando se receber um aviso do servidor que a modificacao foi feita com sucesso. No caso o aviso vem na forma do codigo 200 de HTTP: OK */

    /*
    readyState:
    0: request not initialized
    1: server connection established
    2: request received
    3: processing request
    4: request finished and response is ready

    status:
    200: "OK"
    403: "Forbidden"
    404: "Page not found"
    */

    // baseado nos valores acima apresentados, o codigo abaixo mostra o que foi enviado pelo servidor como resposta ao envio de dados. No caso, se o request foi finalizado e o response foi recebido, a mensagem recebida do servidor eh mostrada no console do navegador. esse codigo foi feito apenas para verificar se tudo ocorreu bem no envio

    http.onload = () => {

        //seleciona todas as tags que sejam td 
        let tr = document.querySelector(`table#list > tbody > tr[data-index-row='${index}']`);

        if (http.readyState === 4 && http.status === 200) {
            tr.remove();
            console.log(`Item ${index} removido com sucesso!`);

        } else {
            console.log(`Erro durante a tentativa de remoção do usuário: ${_name}! Código do Erro: ${http.status}`);
        }


    }
}


function validacao(nome, email, endereco, altura, age, vote) {

    var nome1 = document.getElementById('_name');
    var emai1 = document.getElementById('_email');
    var endereco1 = document.getElementById('_address');
    var altura1 = document.getElementById('_heigth');
    var age1 = document.getElementById('_age');
    var vote1 = document.getElementById('_vote');

    var validacaonome = document.getElementsByClassName('validacaonome')[0];
    var validacaoemail = document.getElementsByClassName('validacaoemail')[0];
    var validacaoendereco = document.getElementsByClassName('validacaoendereco')[0];
    var validacaoaltura = document.getElementsByClassName('validacaoaltura')[0];
    var validacaoage = document.getElementsByClassName('validacaoidade')[0];
    var validacaovore = document.getElementsByClassName('validacaovote')[0];

    var boolean = true
    if (nome == "") {
        nome1.classList.add('dadoinconsistente');
        validacaonome.style.display = "block"
        boolean = false;
    } else {
        nome1.classList.remove('dadoinconsistente');
        validacaonome.style.display = "none"
    }
    if (email == "") {
        emai1.classList.add('dadoinconsistente');
        validacaoemail.style.display = "bloc"
        boolean = false;
    } else {
        emai1.classList.remove('dadoinconsistente');
        validacaoemail.style.display = "none"
    }
    if (endereco == "") {
        endereco1.classList.add('dadoinconsistente');
        validacaoendereco.style.display = "bloc"
        boolean = false;
    } else {
        endereco1.classList.remove('dadoinconsistente');
        validacaoendereco.style.display = "none"
    }
    if (altura == "" || altura < 0.00) {
        altura1.classList.add('dadoinconsistente');
        validacaoaltura.style.display = "block"
        boolean = false;
    } else {
        altura1.classList.remove('dadoinconsistente');
        validacaoaltura.style.display = "none"
    }
    if (age == "") {
        age1.classList.add('dadoinconsistente');
        validacaoage.style.display = "block"
        boolean = false;
    } else {
        age1.classList.remove('dadoinconsistente');
        validacaoage.style.display = "none"
    }
    if (vote == "") {
        vote1.classList.add('dadoinconsistente');
        vote1.style.display = "block"
        boolean = false;
    } else {
        vote1.classList.remove('dadoinconsistente');
        vote1.style.display = "none"
    }
    return boolean
}

function add() {

    var nome = document.getElementById('_name').value;
    var email = document.getElementById('_email').value;
    var endereco = document.getElementById('_address').value;
    var altura = document.getElementById('_heigth').value;
    var age = document.getElementById('_age').value;
    var vote = document.getElementById('_vote').value;

    if (validacao(nome, email, endereco, altura, age, vote)) {
        console.log(nome.value)
        const http = new XMLHttpRequest();
        const link = "/cadastro/add"
        let data = { id: "", name: nome, email: email, address: endereco, age: age, heigth: altura, vote: vote };
        let dataToSend
        http.open("POST", link, true);
        http.setRequestHeader('Content-Type', 'application/json');
        dataToSend = JSON.stringify(data);
        console.log("log dat:")
        console.log(dataToSend)
        http.send(dataToSend)
        http.onload = () => {
            if (http.readyState === 4 && http.status === 200) {
                window.location.href = "/cadastro";
            }
        }
    }

}

function list() {
    //fazer em casa. Lista de usuários.

    //Primeira parte: envia mensagem para o servidor pedindo uma listagem dos usuários

    //Segunda parte: apos recebimento da lista de usuarios, no formato JSON, colocar os usuarios na interface
    let tableList = document.getElementById("list");

    let tr = document.createElement("tr");
    let td = document.createElement("td");
    let span = document.createElement("span");
    let cont;
    //for(let cont=0;cont<datas.length;cont++){ 
    td.setAttribute(`data-index-row=${cont}`);
    span.innerHTML = Object.keys(datas[cont])[0] //keys 0 - name, 1 - email
    span.className = "show";
    td.appendChild(span);
    tr.appendChild(td);

    tableList.appendChild(tr);
    //}

}






