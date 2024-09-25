/*
* Minesweeper Game Logic
*
* */

const gameBoardSizes = {
    beginner: { rowNum: 12, colNum: 24, mineAmt: 10 },
    easy: { rowNum: 14, colNum: 26, mineAmt: 20 },
    normal: { rowNum: 16, colNum: 28, mineAmt: 40 },
    hard: { rowNum: 18, colNum: 30, mineAmt: 60 },
    expert: { rowNum: 20, colNum: 32, mineAmt: 80 },
    advanced: { rowNum: 22, colNum: 34, mineAmt: 100 },
} as const;

type tGameBoardSizes = typeof gameBoardSizes;
type tGameDifficulty = keyof tGameBoardSizes;

type tTileDisplay = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | "Untouched" | "" | "Flag" | "Mine";
type tBoardCell = "" | "*";

class MinesweeperGame {
    realBoard: tBoardCell[][];
    userBoard: tTileDisplay[][];

    constructor(difficulty: tGameDifficulty = "normal") {
        this.userBoard = MinesweeperGame.makeEmptyBoard<tTileDisplay>("Untouched", gameBoardSizes[difficulty].rowNum, gameBoardSizes[difficulty].colNum);
        this.realBoard = MinesweeperGame.makeRealBoard(difficulty);

        console.log("MinesweeperGame Constructor's Real Board", this.realBoard)
    }

    /* Make the boards with all mines placed */
    static makeRealBoard(difficulty: tGameDifficulty): tBoardCell[][] {
        const {
            rowNum,
            colNum,
            mineAmt } = gameBoardSizes[difficulty];

        const board =  MinesweeperGame.makeEmptyBoard<tBoardCell>("", rowNum, colNum);

        let minesPlaced = 0;

        // Place mines randomly but avoid fully surrounding mines
        while (minesPlaced < mineAmt) {
            const row = Math.floor(Math.random() * rowNum);
            const col = Math.floor(Math.random() * colNum);

            // Place a mine if the cell is empty and not surrounded by mines
            if (board[row][col] === "" && !MinesweeperGame.isMineSurrounded(board, row, col)) {
                board[row][col] = "*";
                minesPlaced++;
            }
        }

        return board;
    }

    private static makeEmptyBoard <T> ( fillValue: T, rowNum: number, colNum: number): T[][]{
         return Array.from({ length: rowNum }, () => Array(colNum).fill(fillValue));
    }

    static isMineSurrounded(board: tBoardCell[][], row: number, col: number): boolean {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1],
        ];

        for (const [dx, dy] of directions) {
            const newRow = row + dx;
            const newCol = col + dy;

            // Check boundaries and if the neighboring cell is a mine
            if (
                newRow >= 0 && newRow < board.length &&
                newCol >= 0 && newCol < board[0].length &&
                board[newRow][newCol] !== "*"
            ) {
                return false;
            }
        }
        return true;
    }
}

export { gameBoardSizes, MinesweeperGame, tBoardCell }
