const gameBoard = document.getElementById('game-board');
const statusMessage = document.getElementById('status');
const livesDisplay = document.getElementById('lives');
const scoreDisplay = document.getElementById('score');

let score = 0;
let lives = 3;

// Define the image paths for fruits (correct) and bad foods (incorrect)
const fruitImages = [
    'images/apple.png',
    'images/pear.png',
    'images/pineapple.png',
    'images/kiwi.png',
];
const badFoodImages = [
    'images/burger.png',
    'images/fries.png',
    'images/hotdog.png',
    'images/cookie.png',
    'images/donut.png',
    'images/icecream.png',
    'images/pizza.png',
    'images/popcorn.png',
    'images/soda.png',
    'images/turkeyleg.png',
    'images/cake.png',
    'images/chips.png',
];

// Combine and shuffle the images
const allImages = [
    ...fruitImages,
    ...badFoodImages,
];
allImages.sort(() => 0.5 - Math.random());

// Create cards
allImages.forEach((imageSrc) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.correct = fruitImages.includes(imageSrc); // Mark as correct if it's a fruit

    const img = document.createElement('img');
    img.src = imageSrc;
    card.appendChild(img);

    card.addEventListener('click', handleCardClick);
    gameBoard.appendChild(card);
});

function handleCardClick(event) {
    const clickedCard = event.currentTarget;

    // If the card is already flipped, do nothing
    if (clickedCard.classList.contains('flipped')) return;

    // Reveal the card
    clickedCard.classList.add('flipped');

    if (clickedCard.dataset.correct === "true") {
        // Correct choice
        statusMessage.textContent = "Congrats! You found the loot!";
        statusMessage.style.color = "green";

        // Award points and update the score
        score += 5;
        scoreDisplay.textContent = `Score: ${score}`;

        // Disable the clicked card
        clickedCard.removeEventListener('click', handleCardClick);
    } else {
        // Incorrect choice
        statusMessage.textContent = "Try again!";
        statusMessage.style.color = "red";

        // Deduct a life and update the display
        lives -= 1;
        livesDisplay.textContent = `Lives Remaining: ${lives}`;

        // End the game if lives reach 0
        if (lives === 0) {
            statusMessage.textContent = "Game Over! You've run out of lives.";
            statusMessage.style.color = "red";

            // Disable all remaining cards
            document.querySelectorAll('.card').forEach(card => {
                card.removeEventListener('click', handleCardClick);
            });
        }
    }
}
