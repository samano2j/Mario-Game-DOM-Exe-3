function isTouching(a, b) {
	const aRect = a.getBoundingClientRect();
	const bRect = b.getBoundingClientRect();

	return !(
		aRect.top + aRect.height < bRect.top ||
		aRect.top > bRect.top + bRect.height ||
		aRect.left + aRect.width < bRect.left ||
		aRect.left > bRect.left + bRect.width
	);
}

const maxHeight = window.innerHeight - 100;
const maxWidth = window.innerWidth - 100;

//get the avatar
const avatar = document.querySelector("#avatar");
//get the coin
const coin = document.querySelector("#coin");

const footstepSound = new Audio("/MarioChallenge/audio/smw_footstep.wav");
const coinSound = new Audio("/MarioChallenge/audio/smw_coin.wav");
const scoreBoard = document.createElement('h1');
var score = 0;
scoreBoard.innerHTML = "Score: " + score;
document.querySelector("body").append(scoreBoard);

const init = () => {

    moveCoin();
    window.addEventListener('keyup', function(e){
        if(e.key === 'ArrowUp' || e.key === 'Up'){
            moveVertical(avatar, -50);
            footstepSound.play();
        }

        if(e.key === 'ArrowDown' || e.key === 'Down'){
            moveVertical(avatar, 50);
            footstepSound.play();
        }

        if(e.key === 'ArrowLeft' || e.key === 'Left'){
            moveHorizontal(avatar, -50);
            footstepSound.play();
            avatar.style.backgroud = "red";
        }
        
        if(e.key === 'ArrowRight' || e.key === 'Right'){
            moveHorizontal(avatar, 50);
            footstepSound.play();
        }

        if(isTouching(avatar,coin)) {
            coinSound.play();
            score++;
            scoreBoard.innerHTML = "Score: " + score;
            moveCoin();
        }
    });

}

const moveVertical = (element, amount) => {
    const currTop = extractPos(element.style.top);

    if(amount < 0)
        avatar.style.transform = "rotate(-90deg)";
    else
        avatar.style.transform = "rotate(90deg)";

    if ((currTop + amount) >= 0 && (currTop + amount) < maxHeight)
        element.style.top = `${currTop + amount}px`;
}

const moveHorizontal = (element, amount) => {
    const currLeft = extractPos(element.style.left);

    if(amount < 0)
        avatar.style.transform = "scaleX(-1)";
    else
        avatar.style.transform = "scaleX(1)";


    if ((currLeft + amount) >= 0 && (currLeft + amount) < maxWidth)
        element.style.left = `${currLeft + amount}px`;
}

const extractPos = (position) => {
    if(!position) return 100;
    return parseInt(position.slice(0, -2))
}

const moveCoin = () => {
    const x = Math.floor(Math.random() * (maxWidth));
    const y = Math.floor(Math.random() * (maxHeight));
    
    coin.style.left = `${x}px`;
    coin.style.top = `${y}px`;
}

init();
