const person1Input=document.getElementById("Person1");
const person2Input=document.getElementById("Person2");
const startButton=document.getElementById("Startgame");
 
startButton.addEventListener('click', () => {
    const person1Name=person1Input.value.trim();
    const person2Name=person2Input.value.trim();
    if (person1Name === '' || person2Name === '') {
        alert('Please enter both names.');
     return;
    }
    window.location.href = `game.html?player1=${encodeURIComponent(person1Name)}&player2=${encodeURIComponent(person2Name)}`;
})
