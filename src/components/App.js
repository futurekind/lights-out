import React, { Component } from 'react';

import { createGame } from '../lib/game';
import Board from './Board'


class App extends Component {
    
    constructor(props) {
        super(props);

        this.game = createGame({
            boardSize: 3
        });

        this.state = {
            board: this.game.getBoard()
        }
    }

    render () {
        const { board } = this.state;
        
        return (
            <div>
                <Board 
                    board={ board } 
                    onLightClick={ this.handleLightClick }
                />
            </div>
        )
    }

    handleLightClick = (row, col) => {
        this.game.toggleField({row, col})

        this.setState({
            board: this.game.getBoard()
        })
    }
}

export default App