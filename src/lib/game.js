const getRandomCellIndex = rowSize => Math.floor(Math.random() * rowSize)

const makeRow = (row, options) => {
    const value = options.withRandomness
        ? getRandomCellIndex(options.boardSize) !== row.length
        : true

    if(row.length < options.boardSize) {
        return makeRow([
            ...row,
            value
        ], options)
    } else {
        return row
    }
}

const makeBoard = (board, options) => {
    if(board.length < options.boardSize) {
        return makeBoard([
            ...board,
            makeRow([], options)
        ], options)
    } else {
        return board;
    }     
}

const getField = (board, props) => {
    const { row, col } = props;

    if(
        typeof props !== 'object' &&
        !col && !row
    ) throw new Error(`No correct props parameter is given.`)

    if(typeof col !== 'number' || typeof row !== 'number')
        throw new Error(`Please provide numbers for row and col`)

    return board[row] 
        ? board[row][col]
        : undefined
}

const updateBoard = (board, row, col) => {
    const field = getField(board, {
        row, col
    })

    if(field === undefined) return board;

    return board.reduce((prevBoard, boardRow, index) => {
        if(index === row) {
            return [
                ...prevBoard,
                [
                    ...boardRow.slice(0, col),
                    !field,
                    ...boardRow.slice(col + 1)
                ]
            ]
        }
        return [
            ...prevBoard,
            boardRow
        ]
    }, [])
}

const countInactiveFields = (board) => {
    return board.reduce((prev, row) => {
        const rowValues = row.reduce((prevRow, cell) => {
            if(cell === false) return prevRow + 1;
            return prevRow
        }, 0)

        return rowValues + prev
    }, 0);
}

const toggleFieldOnBoard = (board, props) => {
    const { row, col } = props;

    board = updateBoard(board, row, col)
    board = updateBoard(board, row - 1, col)
    board = updateBoard(board, row + 1, col)
    board = updateBoard(board, row, col - 1)
    board = updateBoard(board, row, col + 1)

    return board;
}

const isSlovable = (board, options) => {

}

export const createGame = (settings = {}) => {
    const options = {
        boardSize: 5,
        withRandomness: false,
        ...settings
    }

    let board = makeBoard([], options);

    const toggleField = props => {
        board = toggleFieldOnBoard(board, props)
    }

    return {
        getBoard: () => board,
        getField: props => getField(board, props),
        toggleField,
        isBoardSolved: () => countInactiveFields(board) === options.boardSize * options.boardSize, 
        ...process.env.NODE_ENV === 'test' 
            && { TEST: {
                options
            } }
    }
}