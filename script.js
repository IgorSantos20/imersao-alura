const searchInput = document.getElementById('campo-busca');
const cardContainer = document.querySelector('.card-conteiner');
const searchButton = document.getElementById('botao-busca');
const dataUrl = 'data.json';
let allData = [];

/**
 * Carrega os dados do arquivo JSON.
 */
async function loadData() {
    try {
        const response = await fetch(dataUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allData = await response.json();
        // Exibe todos os cards ao carregar a página inicialmente
        displayCards(allData);
    } catch (error) {
        console.error("Não foi possível carregar os dados:", error);
        cardContainer.innerHTML = '<p>Erro ao carregar os dados. Tente novamente mais tarde.</p>';
    }

}

/**
 * Exibe os cards na tela com base nos dados fornecidos.
 * @param {Array} data - Um array de objetos a serem exibidos como cards.
 */
function displayCards(data) {
    cardContainer.innerHTML = ''; // Limpa os resultados anteriores

    if (data.length === 0) {
        cardContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
        return;
    }

    data.forEach(item => {
        const card = `
            <article class="card" style="display: flex; align-items: flex-start;">
                <div class="card-content" style="flex: 1;">
                    <h2>${item.titulo}</h2>
                    <p>Ano da Premiação: ${item.ano_premiacao}</p>
                    <p>Diretor: ${item.diretor}</p>
                    <p>Gênero: ${item.genero}</p>
                    <a href="${item.link}" target="_blank">Saiba mais</a>
                </div>
                <div class="card-image" style="margin-left: 20px;">
                    <img src="${item.capa}" alt="Capa do filme ${item.titulo}" style="max-width: 150px; height: auto;">
                </div>
            </article>
        `;
        cardContainer.innerHTML += card;
    });
}

/**
 * Inicia a busca com base no valor do input.
 */
function iniciarBusca() {
    const query = searchInput.value.toLowerCase();
    let searchTerm = query;
    let searchField = 'all';

    if (query.includes(':')) {
        const parts = query.split(':');
        const key = parts[0].trim();
        const value = parts[1].trim();

        if (['titulo', 'ano', 'diretor'].includes(key)) {
            searchField = key;
            searchTerm = value;
        }
    }

    const filteredData = allData.filter(item => {
        if (searchField === 'titulo') return item.titulo.toLowerCase().includes(searchTerm);
        if (searchField === 'ano') return item.ano_premiacao.includes(searchTerm);
        if (searchField === 'diretor') return item.diretor.toLowerCase().includes(searchTerm);
        
        // Busca geral se nenhum campo específico for fornecido
        return item.titulo.toLowerCase().includes(searchTerm) || item.ano_premiacao.includes(searchTerm) || item.diretor.toLowerCase().includes(searchTerm);
    });
    displayCards(filteredData);
}

// Adiciona o event listener para acionar a busca com o clique do botão
searchButton.addEventListener('click', iniciarBusca);

// Carrega os dados quando o script é executado
loadData();