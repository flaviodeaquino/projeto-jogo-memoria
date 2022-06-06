// criar animação de virar a carta quando clicar nela

const cards = document.querySelectorAll('.card');  // são todas as cartas
let hasFlipperCard = false;
let firstCard, secondCard;
let lockBoard = false

// adiciona uma classe flip ao nosso elemento card toda vez que o card for clicado
function flipcard() { 
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlipperCard) {
        hasFlipperCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlipperCard = false;
    checkForMatch();
}

function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards(); //desabilita o click na carta se você encontrou cartas iguais
        return;
    }

    unflipCards();
}

function disableCards () {
    firstCard.removeEventListener('click', flipcard);
    secondCard.removeEventListener('click', flipcard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500)
}

function resetBoard() {
    [hasFlipperCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random()*12)
        card.style.order = ramdomPosition;
    })
})();

cards.forEach ((card) => {
    card.addEventListener('click', flipcard)
})