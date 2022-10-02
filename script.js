const Game = () => {    
    let cells = "123456789".split('') //creates cells array
    let round = 1
    let player_x = null;
    let player_o = null;
    const game_setup = () => {
        player_x = Player("x")
        player_o = Player("o")
    }

    const play = () => {
        game_setup();
        document.querySelectorAll(".square").forEach((value)=>{
            value.addEventListener("click",(e)=> {   
                if (round%2 != 0) {
                    e.target.querySelector(".x").style.display = "block"
                    cells = removeItemOnce(cells, e.target.id, player_x.move)
                    round += 1
                    console.log(game_over())
                }  
                else {
                    e.target.querySelector(".o").style.display = "block"
                    cells = removeItemOnce(cells, e.target.id, player_o.move)
                    round += 1
                    console.log(game_over())
                }
            },{ once: true })
        })
    }

    const removeItemOnce = (arr, value, new_value) => {
        var index = arr.indexOf(value);
        if (index > -1) {
          arr.splice(index, 1, new_value);
        }
        return arr;
      }

    

    const WINNING_COMBOS = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
        [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ]

    const game_over = () => {
        let true_or_not = null

        WINNING_COMBOS.some((combo) => {
            unique = [cells[combo[0]], cells[combo[1]], cells[combo[2]]].filter(onlyUnique)
            if (unique.length == 1) {
                console.log(`TRUE TRUE TRUE`)
                true_or_not = true
                return true_or_not === true
            } 
        })
        return true_or_not    
    }   

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    function printhello() {
        console.log("hello")
    }

    return {cells, play}
};

const Player = (move) => {
    return {move}
};


game = Game()
game.play()

