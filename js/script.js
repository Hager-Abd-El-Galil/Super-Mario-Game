function isTouching(a,b){
    const aRect = a.getBoundingClientRect(); 
    const bRect = b.getBoundingClientRect(); 

  return !(
    aRect.top + aRect.height < bRect.top ||
    aRect.top > bRect.top + bRect.height ||
    aRect.left + aRect.width < bRect.left ||
    aRect.left > bRect.left + bRect.width 
    );
}

const avatar = document.querySelector("#mario");
const coin = document.querySelector("#coin");
const score = document.querySelector("#scoreUpdate");

avatar.style.top = "550px" ;  //initial value

window.addEventListener('keyup', function(e)
{
    if (e.key === "ArrowDown" || e.key === "Down") 
    {
        if (((extractPos(avatar.style.top) + 50) + avatar.clientHeight) < window.innerHeight) {
            moveVertical(avatar,50);
        }
    }
    else if (e.key === "ArrowUp" || e.key === "Up") 
    {
        if ((extractPos(avatar.style.top) - 50) >= 0) 
        {
            moveVertical(avatar,-50);
        }
    }
    else if (e.key === "ArrowRight" || e.key === "Right") 
    {
        if (((extractPos(avatar.style.left) + 50) + avatar.clientWidth) < window.innerWidth) 
        {
            moveHorizontal(avatar,50);
            avatar.style.transform = "scale(1, 1)";
        }
    }
    else if (e.key === "ArrowLeft" || e.key === "Left") 
    {
        if ((extractPos(avatar.style.left) - 50) >= 0) {
            moveHorizontal(avatar,-50);
            avatar.style.transform = "scale(-1, 1)";
        }
    }

    if(isTouching(avatar,coin))
    {
        moveCoin();
        let counter = Number(score.innerText);
        counter++;
        score.innerText = counter.toString();
    }
});

const moveVertical = (element,amount) => {
    const currTop = extractPos(element.style.top);
    element.style.top = `${currTop + amount}px`;
}

const moveHorizontal = (element,amount) => {
    const currLeft = extractPos(element.style.left);
    element.style.left = `${currLeft + amount}px`;
}

/*---------Convert Position String to Integer---------*/
const extractPos = (pos) => {
    if(!pos) return 0;
    return parseInt(pos.slice(0,-2)); 
}

/*---------Move Coin Randomly---------*/
function moveCoin() {
    const x = Math.floor(Math.random() * (window.innerWidth - coin.clientWidth));
    const y = Math.floor(Math.random() * (500 - coin.clientHeight));

    if(x < (window.innerWidth) && y < 500)
    {
       coin.style.top = `${y}px`;
       coin.style.left = `${x}px`; 
    }  
}

moveCoin();
