import './style/main.less';

import $ from "jquery";



class Game {
    result = [];
    position = [];


    start() {
        this.result.length = 0;
        this.getPoint();
    }

    getPoint() {
        for (let i = 0; i < 6; i++) {
            this.result.push(Math.floor(Math.random() * 6) + 1)
        }
        this.setDice();
    }

    getPosition() {
        let position = []
        this.position = [1,2,3,4,5,6,7];
        for( let i = 0; i < 6; i++) {
            position.push(this.position.splice(Math.floor(Math.random() * this.position.length), 1)[0])
        }
        return position;
    }

    setDice() {
        $("#bowl").removeClass('active');
        const position = this.getPosition();
        $.each($("#bowl .dice"), (index, item) => {
            $(item).removeClass();
            $(item).addClass(`sprite dice dice${this.result[index]} dice-position${position[index]}` )
        })
        setTimeout(() => {
            $("#bowl").addClass('active');
        }, 200)
    }
}

$(() => {
    const game = new Game();
    $("#startGame").click(() => {
        game.start();
    })
});