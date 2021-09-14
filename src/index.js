import { MidAutumn } from './common';
import './style/main.less';

import $ from "jquery";



class Game {
    result = [];
    position = [];

    midAutumn = new MidAutumn();

    start() {
        this.result = this.midAutumn.start();
        // this.result = this.midAutumn.setResult([4, 4, 4, 4, 1, 1]).getResult();
        console.log(this.midAutumn.getAward());
        this.setDice();
    }

    getPosition() {
        let position = []
        this.position = [1, 2, 3, 4, 5, 6, 7];
        for (let i = 0; i < 6; i++) {
            position.push(this.position.splice(Math.floor(Math.random() * this.position.length), 1)[0])
        }
        return position;
    }

    setDice() {
        $("#bowl").removeClass('active');
        const position = this.getPosition();
        $.each($("#bowl .dice"), (index, item) => {
            $(item).removeClass();
            $(item).addClass(`sprite dice dice${this.result[index]} dice-position${position[index]}`)
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