import React, { PropTypes } from 'react'

import Light from './Light';

const Board = ({
    board,
    isSolved,
    onLightClick
}) => {
    return (
        <div className={`board ${ isSolved ? 'board--solved' : ''}`}>
            { board.map((row, rowIndex) => {
                return (
                    <div className="board__row" key={ rowIndex }>
                        { row.map((item, itemIndex) => {
                            return (
                                <Light 
                                    key={ itemIndex } 
                                    on={ item } 
                                    onClick={ () => onLightClick(rowIndex, itemIndex) }
                                />
                            )
                        }) }
                    </div>
                )
            }) }
        </div>
    )
}

Board.propTypes = {
    board: PropTypes.arrayOf(
        PropTypes.array,
    ).isRequired,
    isSolved: PropTypes.bool,
    onLightClick: PropTypes.func.isRequired,   
}

export default Board