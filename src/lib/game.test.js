import { createGame } from './game';

describe('Game', () => {

    describe('constructor', () => {
        
        it('it uses 5 as default value', () => {
            const game = createGame();
            expect(game.TEST.options.boardSize).toBe(5)
        })

        it('sets size as parameter', () => {
            const game = createGame({
                boardSize: 7
            });
            expect(game.TEST.options.boardSize).toBe(7)
        })

    })

    describe('getBoard()', () => {
        let game;

        beforeAll(() => {
            game = createGame();
        })

        it('returns a matrix', () => {
            const board = game.getBoard()
            
            expect(board.length).toBe(5)
            expect(board[0].length).toBe(5)
            expect(board[1].length).toBe(5)
            expect(board[2].length).toBe(5)
            expect(board[3].length).toBe(5)
            expect(board[4].length).toBe(5)
        })
    })

    describe('getField()',  () => {
        let game;

        beforeAll(() => {
            game = createGame({
                boardSize: 3
            })
        })

        it('throws errors', () => {
            expect(() => {
                game.getField(3)
                game.getField('3')
                game.getField({
                    row: 3,
                    col: '3'
                })
            }).toThrow()
        })

        it('returns correct value', () => {
            expect(
                game.getField({
                    row: 1,
                    col: 1
                })
            ).toBe(true)
        })

        it('returns undefined when no row or col matches', () => {
            expect(
                game.getField({
                    row: 3,
                    col: 1
                })
            ).toBe(undefined)

            expect(
                game.getField({
                    row: 3,
                    col: -1
                })
            ).toBe(undefined)
        })

    })

    describe('toggleField()', () => {
        let game;

        beforeEach(() => {
            game = createGame({
                boardSize: 3
            })
        })

        it('toggles clicked field', () => {
            game.toggleField({
                row: 1,
                col: 1
            })

            expect(game.getField({
                row: 1, col: 1
            })).toBe(false)
        })

        it('also toggles neighbours', () => {
            const newBoard = game.toggleField({
                row: 1,
                col: 1
            })

            expect(game.getBoard()).toEqual([
                [true, false, true],
                [false, false, false],
                [true, false, true],
            ])
        })

        it('also toggles neighbours part 2', () => {
            const newBoard = game.toggleField({
                row: 0,
                col: 0
            })

            expect(game.getBoard()).toEqual([
                [false, false, true],
                [false, true, true],
                [true, true, true],
            ])
        })

        it('also toggles neighbours part 3', () => {
            const newBoard = game.toggleField({
                row: 0,
                col: 2
            })

            expect(game.getBoard()).toEqual([
                [true, false, false],
                [true, true, false],
                [true, true, true],
            ])
        })

        it('also toggles neighbours part 4', () => {
            const newBoard = game.toggleField({
                row: 1,
                col: 0
            })

            expect(game.getBoard()).toEqual([
                [false, true, true],
                [false, false, true],
                [false, true, true],
            ])
        })
    })

})