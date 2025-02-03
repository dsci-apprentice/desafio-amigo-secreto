let amigos = [];
let sorteioFinalizado = false; // flag para indicar se o sorteio acabou

function adicionarAmigo() {
    let addNome = document.querySelector('input').value.trim();
    addNome = normalizarNome(addNome);
   
    // checando se o campo está vazio 
    if (addNome === '') {
        alert('Por favor, insira um nome!');
    } else if (amigos.includes(addNome)) {  // evitando repetição de nome
        alert('Este nome já foi adicionado!');
    } else {
        amigos.push(addNome);
        console.log(amigos);
        atualizarAmigos();
    }

    limparCampo();
}

function normalizarNome(nome) {
    // padronizando o formato dos nomes
    return nome
    .split(' ')                                                           // fatiando nome em palavras
    .map(palavra =>                                                       // considerando cada palavra
        palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase()  // primeira letra maiúscula, etc minúsculo
    )
    .join(' ');                                                           // fazendo junção
}

function atualizarAmigos() {
    let listaAmigos = document.getElementById('listaAmigos');

    // evitando duplicatas
    listaAmigos.innerHTML = "";

    // percorrendo a lista e exibindo apenas os amigos ainda não sorteados
    for (let i = 0; i < amigos.length; i++) {
        let amigo = amigos[i];

        // novo item
        let li = document.createElement('li');
        li.textContent = amigo;
        listaAmigos.appendChild(li);
    }
}

function limparCampo() {
    addNome = document.querySelector('input');
    addNome.value = '';
}

function sortearAmigo() {
    // verifica se há amigos na lista
    if (amigos.length === 0 && sorteioFinalizado == false) {
        alert('Não há amigos para sortear! Por favor, insira nomes.');
        return;
    }

    // verifica se o sorteio foi finalizado 
    if (sorteioFinalizado) {
        alert('Sorteio já finalizado! Por favor, reinicie o sorteio.');
        return;
    }

    // sorteia um amigo aleatório
    let posNomeSorteado = Math.floor(Math.random() * amigos.length);
    let amigoSorteado = amigos.splice(posNomeSorteado, 1)[0];  // remoção do amigo sorteado

    // ocultando lista de amigos
    document.getElementById('listaAmigos').style.display = 'none';

    // exibição do resultado 
    document.getElementById('resultado').innerHTML = `<li>O amigo sorteado foi: ${amigoSorteado}</li>`;

    // atualiza a lista sem o amigo sorteado
    atualizarAmigos();

    // verificação se todos os amigos já foram sorteados
    if (amigos.length === 0) {
        setTimeout(function() {
            document.getElementById('resultado').innerHTML = `<li>Sorteio finalizado!`;
            document.getElementById('reiniciar').disabled = false; // ativa o reiniciar
            sorteioFinalizado = true;  // flag fica verdadeira, pois sorteio foi finalizado
        }, 500);  // delay
    }
}

// função para reiniciar o sorteio
function reiniciarSorteio() {
    // reinicialização
    amigos = [];
    sorteioFinalizado = false;
    atualizarAmigos();  // atualiza a lista de amigos após reiniciar o sorteio
    document.getElementById('reiniciar').disabled = true;  // desabilita o botão de reiniciar
    document.getElementById('resultado').innerHTML = '';  // limpa o resultado de sorteio anterior
    document.getElementById('listaAmigos').style.display = 'block';  // reexibe a lista de amigos quando o sorteio for reiniciado

    alert('O sorteio foi reiniciado. Adicione novos amigos.');
}

// evento DOMContentLoaded para outras operações
document.addEventListener('DOMContentLoaded', function() {
    let inputNome = document.querySelector('input');
    // permitir adicionar nome por enter por questões de praticidade
    inputNome.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            adicionarAmigo();
        } 
    });
});