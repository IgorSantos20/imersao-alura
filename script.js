const searchInput = document.getElementById('campo-busca');
const cardContainer = document.querySelector('.card-conteiner');
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
            <article class="card">
                <h2>${item.titulo}</h2>
                <p>Ano de lançamento: ${item.ano_lancamento}</p>
                <p>Gênero: ${item.genero}</p>
                <p>Diretor: ${item.diretor}</p>
                <a href="${item.link}" target="_blank">Saiba mais</a>
            </article>
        `;
        cardContainer.innerHTML += card;
    });
}

/**
 * Inicia a busca com base no valor do input.
 */
function iniciarBusca() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredData = allData.filter(item => {
        const searchInTags = item.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        return item.titulo.toLowerCase().includes(searchTerm) ||
               item.genero.toLowerCase().includes(searchTerm) ||
               item.diretor.toLowerCase().includes(searchTerm) ||
               searchInTags;
    });
    displayCards(filteredData);
}

// Adiciona o event listener para acionar a busca em tempo real
searchInput.addEventListener('keyup', iniciarBusca);

// Carrega os dados quando o script é executado
loadData();