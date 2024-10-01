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

type tTileDisplay = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | "Untouched" | "Flag" | "Mine";
type tBoardCell = "" | "*";
type tGameStates = "playing" | "won" | "lost";

class MinesweeperGame {
    realBoard: tBoardCell[][];
    userBoard: tTileDisplay[][];
    state: tGameStates;

    constructor(difficulty: tGameDifficulty = "normal") {
        this.userBoard = MinesweeperGame.makeEmptyBoard<tTileDisplay>("Untouched", gameBoardSizes[difficulty].rowNum, gameBoardSizes[difficulty].colNum);
        this.realBoard = MinesweeperGame.makeRealBoard(difficulty);
        this.state = "playing";

        console.log("MinesweeperGame Constructor's Real Board", this.realBoard)
    }

    shortClick(rowNum: number, colNum: number): void {
        const userCell = this.userBoard[rowNum][colNum];
        const realCell = this.realBoard[rowNum][colNum];

        if (userCell === "Untouched") {
            if (realCell === "*") { //mine
                this.state = "lost";
                this.userBoard[rowNum][colNum] = "Mine";

                console.log("You lost!")
            } else { // blank
                this.updateMineNums(rowNum, colNum);
            }
        }
    }

    longClick(rowNum: number, colNum: number): void {
        const cell = this.userBoard[rowNum][colNum];

        if (cell === "Untouched") this.userBoard[rowNum][colNum] = "Flag";
        if (cell === "Flag") this.userBoard[rowNum][colNum] = "Untouched";
    }

    private updateMineNums(rowNum: number, colNum: number): void {
        // Update user board with mine count
        const mineCount = this.countSurroundingMines(rowNum, colNum);

        this.userBoard[rowNum][colNum] = mineCount;

        // if the cell clicked is blank, aka 0, then we need to recursively check
        // the other surrounding cells
        if (mineCount === 0) {
            const directions = [
                [-1, -1], [-1, 0], [-1, 1], // top
                [0, -1], [0, 1], // middle
                [1, -1], [1, 0], [1, 1], // bottom
            ];

            for (const [dx, dy] of directions) {
                const newRow = rowNum + dx;
                const newCol = colNum + dy;

                // Check boundaries and if the neighboring cell is a mine
                if (
                    newRow >= 0 && newRow < this.userBoard.length &&
                    newCol >= 0 && newCol < this.userBoard[0].length &&
                    this.realBoard[newRow][newCol] !== "*"
                ) {
                    if (this.userBoard[newRow][newCol] === "Untouched") {
                        this.updateMineNums(newRow, newCol);
                    }
                }
            }

        }
    }

    /* Make the real board with all mines placed */
    static makeRealBoard(difficulty: tGameDifficulty): tBoardCell[][] {
        const {
            rowNum,
            colNum,
            mineAmt
        } = gameBoardSizes[difficulty];

        const board = MinesweeperGame.makeEmptyBoard<tBoardCell>("", rowNum, colNum);

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

    private static makeEmptyBoard<T>(fillValue: T, rowNum: number, colNum: number): T[][] {
        return Array.from({ length: rowNum }, () => Array(colNum).fill(fillValue));
    }

    static isMineSurrounded(board: tBoardCell[][], row: number, col: number): boolean {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1], // top
            [0, -1], [0, 1], // middle
            [1, -1], [1, 0], [1, 1], // bottom
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

    countSurroundingMines(row: number, col: number):
        0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1], // top
            [0, -1], [0, 1], // middle
            [1, -1], [1, 0], [1, 1], // bottom
        ];
        const board = this.realBoard;

        let mineCount = 0;
        for (const [dx, dy] of directions) {
            const newRow = row + dx;
            const newCol = col + dy;

            // Check boundaries and if the neighboring cell is a mine
            if (
                newRow >= 0 && newRow < board.length &&
                newCol >= 0 && newCol < board[0].length &&
                board[newRow][newCol] === "*"
            ) {
                mineCount++
            }
        }

        return mineCount as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    }

}

export { gameBoardSizes, MinesweeperGame, tBoardCell }
