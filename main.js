const winarr = [[0,3,6],[0,1,2],[0,4,8],[1,4,7],[3,4,5],[2,4,6],[2,5,8],[6,7,8]];

const para = document.getElementById("para");
const reset = document.getElementById("reset");

let board = ["","","","","","","","",""];
let currentplayer = "X";
let gameOver = false;
const boxes = document.querySelectorAll(".box");

let xwin = 0;
let ywin = 0;
const p1 = document.getElementById("p1")
const p2 = document.getElementById("p2")


boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(gameOver) {
            console.log("GAME OVER");
            return;
        }
        const index = box.dataset.index;
        
        if(box.innerHTML === ''){
        board[index] = currentplayer;
        box.innerHTML = board[index];
        currentplayer = currentplayer === "X" ? "O" : "X";
        para.innerText = `${currentplayer}`+'s turn';
        }
        checkWinner();
        tie();
    })
})
const tie = () =>{
    let count = 0 ;
    boxes.forEach((box) => {
        if(box.innerHTML !== "") count++;
    })
    if(count === 9) {
        // console.log("Tie");
        para.innerText = " TIE "
        board = ["","","","","","","","",""];
        gameOver = true;
        // boxes.forEach((box) =>{
        //     box.innerHTML = "";
        // });
    }
}
const checkWinner = () =>{
    for(let subarr of winarr){
        const a = subarr[0];
        const b = subarr[1];
        const c = subarr[2];
        if(
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) { 
            para.innerText = `${board[a]}` + " is the winner";
            
            if(board[a] == 'X') xwin++;
            if(board[a] == 'O') ywin++;
            // console.log("score : X:" +xwin + "  O:" +ywin);
            p1.innerText = xwin;
            p2.innerText = ywin;

            boxes[a].classList.add("win");
            boxes[c].classList.add("win");
            boxes[b].classList.add("win");
            gameOver = true;
            return;
        }
    }
}
reset.addEventListener("click",() => {
    board = ["","","","","","","","",""];
    boxes.forEach((box) =>{
        box.innerHTML = "";
        box.classList.remove("win");
    })
    gameOver = false;
})