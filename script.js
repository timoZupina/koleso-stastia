let selectedCategory = 0;
let spinning = false;

const prizesLevel1 = ["Zľava 10%", "Zľava 15%", "Tričko", "Kľúčenka", "Pero"];
const prizesLevel2 = ["Zľava 25%", "Káva zdarma", "Power banka", "Reproduktor", "Darčekový poukaz"];

function startWheel(category) {
    selectedCategory = category;
    document.getElementById("category-selection").style.display = "none";
    document.getElementById("wheel-container").style.display = "block";

    if (selectedCategory === 1) {
        setPrizes(prizesLevel1);
    } else if (selectedCategory === 2) {
        setPrizes(prizesLevel2);
    }
}

function setPrizes(prizes) {
    // Nastavenie názvov cien do segmentov
    for (let i = 0; i < prizes.length; i++) {
        document.getElementById(`segment-text-${i+1}`).textContent = prizes[i];
    }
}

function spinWheel() {
    if (spinning) return; // Zabezpečíme, že ak je už koleso točené, ďalšie kliknutia sa ignorujú
    spinning = true;

    const wheel = document.getElementById("wheel");
    const spinButton = document.getElementById("spin-btn");
    const backButton = document.getElementById("back-btn");

    // Deaktivujeme tlačidlo na roztočenie kolesa
    spinButton.classList.add("disabled");

    const randomDegree = Math.floor(Math.random() * 7200) + 360;

    // Nastavíme, aby rotácia trvala vždy 10 sekúnd
    wheel.style.transition = "transform 10s cubic-bezier(0.2, 0.9, 0.3, 1)";
    wheel.style.transform = `rotate(${randomDegree}deg)`; 

    setTimeout(() => {
        spinning = false;
        const finalDegree = randomDegree % 360;
        const adjustedDegree = (450 - finalDegree) % 360;

        const prizeIndex = Math.floor(adjustedDegree / (360 / 5));

        const selectedPrize = selectedCategory === 1 ? prizesLevel1[prizeIndex] : prizesLevel2[prizeIndex];

        // Zvýraznenie výherného segmentu
        document.getElementById(`segment-text-${prizeIndex+1}`).classList.add("highlight");

        // Spustenie konfet po výhre (konfety padajú minimálne 15 sekúnd)
        startConfetti(8000); // Spustíme konfety na 15 sekúnd
        
        // Zobrazenie modálneho okna po 2 sekundách
        setTimeout(() => {
            showModal(selectedPrize);

            // Odstránenie triedy "disabled" po zobrazení modálneho okna
            spinButton.classList.remove("disabled");

            // Skrytie tlačidla na roztočenie ostáva po modálnom okne
            spinButton.style.display = "none";
            // Zobrazenie tlačidla na návrat
            backButton.style.display = "inline-block";
        }, 2000);  // 2-sekundové oneskorenie
    }, 10000);  // Čas pre rotáciu a spomalenie je teraz 10 sekúnd
}

// Funkcia na spustenie konfet, ktoré padajú minimálne 15 sekúnd
function startConfetti(duration) {
    const confettiContainer = document.getElementById('confetti-container');

    // Generovanie konfet každých 100 ms
    confettiInterval = setInterval(() => {
        createConfetti();
    }, 100); // Vytvára nové konfety každých 100 ms

    // Zastavenie generovania konfet po uplynutí daného času
    setTimeout(() => {
        clearInterval(confettiInterval); // Zastavíme generovanie konfet po 15 sekundách
    }, duration);
}

function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');

    for (let i = 0; i < 8; i++) { // Počet konfet
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Náhodná pozícia a farba konfety
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's'; // Náhodná rýchlosť pádu
        
        confettiContainer.appendChild(confetti);

        // Odstránenie konfety po skončení animácie
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Funkcia na získanie náhodnej farby konfety
function getRandomColor() {
    const colors = ['#FF0D00', '#0DFF00', '#00D4FF', '#FF00A1', '#FFD700'];
    return colors[Math.floor(Math.random() * colors.length)];
}


function showModal(prize) {
    // Zobrazenie modálneho okna a výhry
    const modal = document.getElementById("win-modal");
    const winMessage = document.getElementById("win-message");
    winMessage.textContent = `Vyhrali ste: ${prize}!`;
    modal.style.display = "flex";  // Zobrazíme modálne okno
}

// Funkcia na zatvorenie modálneho okna
function closeModal() {
    const modal = document.getElementById("win-modal");
    modal.style.display = "none";
    clearInterval(confettiInterval); // Zastavenie generovania konfet po kliknutí na tlačidlo späť
}


function resetGame() {
    // Zobrazenie kategórie výberu a skrytie kolesa
    document.getElementById("category-selection").style.display = "block";
    document.getElementById("wheel-container").style.display = "none";
    
    // Zobrazenie tlačidla na roztočenie kolesa
    const spinButton = document.getElementById("spin-btn");
    spinButton.style.display = "inline-block"; // Znovu zobrazíme tlačidlo na roztočenie

    // Skryjeme tlačidlo na návrat
    const backButton = document.getElementById("back-btn");
    backButton.style.display = "none";

    // Odstránenie zvýraznenia výherného segmentu
    const highlightedSegment = document.querySelector(".highlight");
    if (highlightedSegment) {
        highlightedSegment.classList.remove("highlight");
    }

    // Nastavenie premenných do pôvodného stavu
    spinning = false;
}


