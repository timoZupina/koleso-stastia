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
    if (spinning) return;
    spinning = true;

    const wheel = document.getElementById("wheel");
    const randomDegree = Math.floor(Math.random() * 3600) + 360; // Náhodný počet otáčok

    wheel.style.transition = "transform 4s ease-out";
    wheel.style.transform = `rotate(${randomDegree}deg)`; // Otáčanie kolesa

    setTimeout(() => {
        spinning = false;
        const finalDegree = randomDegree % 360;  // Konečný uhol po rotácii
        const adjustedDegree = (450 - finalDegree) % 360;  // Uhol vzhľadom na pozíciu ukazovateľa na 0° (pravá strana)

        const prizeIndex = Math.floor(adjustedDegree / (360 / 5)); // Výber segmentu podľa uhla

        // Výber správnych cien podľa zvolenej úrovne
        const selectedPrize = selectedCategory === 1 ? prizesLevel1[prizeIndex] : prizesLevel2[prizeIndex];

        alert(`Vyhrali ste: ${selectedPrize}!`);
        document.getElementById("back-btn").style.display = "inline-block"; // Zobrazenie tlačidla na návrat
    }, 4000); // Časovač na 4 sekundy, synchronizovaný s animáciou
}

function resetGame() {
    document.getElementById("category-selection").style.display = "block";
    document.getElementById("wheel-container").style.display = "none";
    document.getElementById("back-btn").style.display = "none";
}
