// Start game
let btn = document.getElementsByTagName('button')[0]
let container = document.getElementById('container')
btn.addEventListener('click', () => {
    btn.className = "disabled"
    container.classList.remove('disabled')  
})
// Game
function getTextContentArray(className) {
    return Array.from(document.getElementsByClassName(className)).map(element => element.textContent);
}
let score = 0;
let scoreElement = document.getElementById('Score');
let box = [ [' ',' ',' ',' '], [' ',' ',' ',' '], [' ',' ',' ',' '],['2','2', ' ','2']];
let Boxes = document.getElementsByClassName('box');
creation(box)


let gameover = document.getElementById('GameOver')
let S = document.getElementById('score')

function convert(arr){
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        let temp = [];
        for (let j = 0; j < arr.length; j++) {
            temp.push(arr[j][i])
        }
        newArr.push(temp)
    }
    return newArr;
}

function left(box){
    
    for (let i = 0; i < box.length; i++) {
        let n = 0;
        let lastChar = 0;
        for (let j = 0; j < box[i].length; j++) {
            if (box[i][j] == " " && n < 4) {
                box[i].splice(j, 1);
                box[i].push(" ");
                n++;
                j = lastChar - 1;
                continue;
            }
            else if(box[i][j] !== " "){
                lastChar = j;
            }
            if(box[i][j] == box[i][j+1]  && box[i][j] !== ' '){
                box[i][j] = box[i][j] * 2;
                score += box[i][j];
                box[i][j+1] = ' ';
            }
            
        }
    }
}

function right(box){
    
    for (let i = 0; i < box.length; i++) {
        let n = 0;
        let lastChar = 0;
        for (let j = box[i].length; j > 0; j--) {
            if (box[i][j] == " " && n < 4) {
                box[i].splice(j, 1);
                box[i].unshift(" ");
                n++;
                j = lastChar + 1;
                continue;
            }
            else if(box[i][j] !== " "){
                lastChar = j;
            }
            if(box[i][j] == box[i][j-1] && box[i][j] !== ' '){
                box[i][j] = box[i][j] * 2;
                score += box[i][j];
                box[i][j-1] = ' ';
            }
        }
    }
}

function creation(box){
    let  n = 0;
    box.forEach((element,index) => {
        element.forEach((innerElement,innerindex) => {
            Boxes[n].textContent = innerElement
            if(innerElement == 2) Boxes[n].className = 'n2 box '
            if(innerElement == 4) Boxes[n].className = 'n4 box '
            if(innerElement == 8) Boxes[n].className = 'n8 box '
            if(innerElement == 16)Boxes[n].className = 'n16 box '
            if(innerElement == 32) Boxes[n].className = 'n32 box '
            if(innerElement == 64) Boxes[n].className = 'n64 box '
            if(innerElement == 128) Boxes[n].className = 'n128 box '
            if(innerElement == 256) Boxes[n].className = 'n256 box '
            if(innerElement == 512) Boxes[n].className = 'n512 box '
            if(innerElement == 1024) Boxes[n].className = 'n1024 box '
            if(innerElement == 2048) Boxes[n].className = 'n2048 box '
            if(innerElement == ' ') Boxes[n].className = ' box '
            
            n++
        });
    });
}


// action with keys
document.addEventListener('keydown' , function(event) {
    if(event.code === 'ArrowLeft') {
        left(box)
        scoreElement.textContent = 'Score : ' + score;

        let randomNumber = random()
        let Empty = empty(box)
        console.log('empty',Empty);

        if(Empty.length === 0){
            gameover.classList.remove("disabled")
            container.classList.add('disabled')
            S.textContent = 'Your score is : ' + score
        }
        let randomIndex = Math.floor(Math.random() * Empty.length);
        let randomEmptySlot = Empty[randomIndex];
        console.log('random empty slot',randomEmptySlot);
        addRandomToEmptySlot(randomEmptySlot,randomNumber)
        console.log('after click left',box);
        creation(box)
    }
    if(event.code === 'ArrowRight') {
        right(box)
        scoreElement.textContent = 'Score : ' + score;

        let randomNumber = random()
        let Empty = empty(box)
        console.log('empty',Empty);
        
        if(Empty.length === 0){
            gameover.classList.remove("disabled")
            container.classList.add('disabled')
            S.textContent = 'Your score is : ' + score
        }
        let randomIndex = Math.floor(Math.random() * Empty.length);
        let randomEmptySlot = Empty[randomIndex];
        console.log('random empty slot',randomEmptySlot);
        addRandomToEmptySlot(randomEmptySlot,randomNumber)
        
        console.log('after click right',box);
        creation(box)
    }
    if(event.code === 'ArrowUp') {
        let newBox = convert(box)
        left(newBox)
        scoreElement.textContent = 'Score : ' + score;
        box = convert(newBox)
        let randomNumber = random()
        let Empty = empty(box)
        console.log('empty',Empty);

        if(Empty.length === 0){
            gameover.classList.remove("disabled")
            container.classList.add('disabled')
            S.textContent = 'Your score is : ' + score
        }
        let randomIndex = Math.floor(Math.random() * Empty.length);
        let randomEmptySlot = Empty[randomIndex];
        console.log('random empty slot',randomEmptySlot);
        addRandomToEmptySlot(randomEmptySlot,randomNumber)
        console.log('after click up',box);
        creation(box)
    }
    if(event.code === 'ArrowDown') {
        let newBox = convert(box)
        right(newBox)
        scoreElement.textContent = 'Score : ' + score;

        box = convert(newBox)
        let randomNumber = random()
        let Empty = empty(box)
        console.log('empty',Empty);

        if(Empty.length === 0){
            gameover.classList.remove("disabled")
            container.classList.add('disabled')
            S.textContent = 'Your score is : ' + score
        }
        let randomIndex = Math.floor(Math.random() * Empty.length);
        let randomEmptySlot = Empty[randomIndex];
        console.log('random empty slot',randomEmptySlot);
        addRandomToEmptySlot(randomEmptySlot,randomNumber)
        console.log('after click down',box);
        creation(box)
    }
})

// random number generator
function random(){
    let numbersarr = [2,4,8,16,32,64,128,256,512,1024,2048];
    let randomIndex = Math.floor(Math.random() * 3);
    return numbersarr[randomIndex];
}

function empty(box){
    let empty = [];
    box.forEach((element,index1) => {
        element.forEach((innerElement,index2) => {
            if(innerElement === ' '){
                empty.push(index1 * 10 + index2)
            }
        });
    })
    return empty
}

function addRandomToEmptySlot(randomSlot , randomNumber){
    randomSlot = Number(randomSlot)
    let x = randomSlot % 10;
    randomSlot = Math.floor(randomSlot / 10);
    let y = randomSlot
    console.log('x',x,'y',y);
    box[y][x] = randomNumber
}


