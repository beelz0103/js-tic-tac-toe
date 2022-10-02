const Helper = (() => {
    const onGameOver = (current_player) => {
    if (Board.game_over()) {
        console.log(current_player,`wins`)  
    }
    else {
        console.log("DRAW")
    }    
    document.querySelector(".modal").classList.add("show-modal")
    }  
    
    return {onGameOver}
})()


const Board = (() => {
    const WINNING_COMBOS = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
        [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ]

    let cells = "123456789".split('')    

    const updateCells = (old_value, new_value) => {
        let index = cells.indexOf(old_value);
        if (index > -1) {
            cells.splice(index, 1, new_value);
        } 
    }    

    const game_over = () => {
        return WINNING_COMBOS.some((combo) => {
            unique = [cells[combo[0]], cells[combo[1]], cells[combo[2]]].filter(onlyUnique)
            return unique.length == 1 
        })   
    }   

    const onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
    }

    return {WINNING_COMBOS, updateCells, game_over, cells}
})();



const Game = () => {
    let cells = "123456789".split('')
    let round = 1
    let players = []
    let current_player = players[0]

    const game_setup = () => {
        players.push(Player("x"))
        players.push(Player("o"))
    }

    const start_game = () => {
        document.querySelectorAll(".square").forEach((square)=>{
            square.addEventListener("click", playerInputs, { once: true })
        })
    }

    const playerInputs = (e) => {             
        if (round%2 != 0) {
            e.target.querySelector(".x").style.display = "block"
            Board.updateCells(e.target.id, players[0].move)    
            current_player = players[0] 
        }  
        else {
            e.target.querySelector(".o").style.display = "block"
            Board.updateCells(e.target.id, players[1].move)       
            current_player = players[1]      
        }
        round += 1  
        if (Board.game_over() || round == 10) Helper.onGameOver(current_player)        
    }    

    const play = () => {
        game_setup();
        start_game();
    }

    return {play}
};

const Player = (move) => {
    return {move}
};

game = Game()
game.play()