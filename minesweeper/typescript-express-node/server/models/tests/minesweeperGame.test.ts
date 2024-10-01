import { describe, test, expect } from 'vitest';
import { MinesweeperGame, gameBoardSizes, tBoardCell } from "../minesweeperGame";
import exp from "node:constants";


describe("MinesweeperGame", function () {

    describe("isMineSurrounded", function () {

        const board: tBoardCell[][] = [
            ["", "*", "*", "*"], // 3rd and 4th are surrounded
            ["", "*", "*", "*"], // 3rd and 4th are surrounded
            ["", "*", "*", "*"],
            ["", "", "", ""],
        ]

        test("not surrounded", function () {
            expect(MinesweeperGame.isMineSurrounded(board, 1, 1)).toBeFalsy();
        })

        test("fully surrounded", function () {
            expect(MinesweeperGame.isMineSurrounded(board, 1, 2)).toBeTruthy();
        })

        test("edge not surrounded", function () {
            expect(MinesweeperGame.isMineSurrounded(board, 0, 1)).toBeFalsy();
        })

        test("edge fully surrounded", function () {
            expect(MinesweeperGame.isMineSurrounded(board, 0, 2)).toBeTruthy();
        })
    })

    describe("makeRealBoard", function () {

        test("beginner", function () {
            const beginnerGame = new MinesweeperGame("beginner");

            expect(beginnerGame.realBoard[0].length).toEqual(gameBoardSizes.beginner.colNum)
            expect(beginnerGame.realBoard.length).toEqual(gameBoardSizes.beginner.rowNum)


            let mineCount = 0;
            for (let col = 0; col < gameBoardSizes.beginner.colNum; col++) {
                for (let row = 0; row < gameBoardSizes.beginner.rowNum; row++) {
                    //No mine should be surrounded
                    expect(MinesweeperGame.isMineSurrounded(beginnerGame.realBoard, row, col)).toBeFalsy();

                    if(beginnerGame.realBoard[row][col] === "*") mineCount++
                }
            }

            expect(mineCount).toEqual(gameBoardSizes.beginner.mineAmt);
        });

        test("easy", function () {
            const easyGame = new MinesweeperGame("easy");

            expect(easyGame.realBoard[0].length).toEqual(gameBoardSizes.easy.colNum)
            expect(easyGame.realBoard.length).toEqual(gameBoardSizes.easy.rowNum)

            let mineCount = 0;
            for (let col = 0; col < gameBoardSizes.easy.colNum; col++) {
                for (let row = 0; row < gameBoardSizes.easy.rowNum; row++) {
                    //No mine should be surrounded
                    expect(MinesweeperGame.isMineSurrounded(easyGame.realBoard, row, col)).toBeFalsy();

                    if(easyGame.realBoard[row][col] === "*") mineCount++
                }
            }

            expect(mineCount).toEqual(gameBoardSizes.easy.mineAmt);
        });

        test("normal", function () {
            const normalGame = new MinesweeperGame("normal");

            expect(normalGame.realBoard[0].length).toEqual(gameBoardSizes.normal.colNum)
            expect(normalGame.realBoard.length).toEqual(gameBoardSizes.normal.rowNum)

            let mineCount = 0;
            for (let col = 0; col < gameBoardSizes.normal.colNum; col++) {
                for (let row = 0; row < gameBoardSizes.normal.rowNum; row++) {
                    //No mine should be surrounded
                    expect(MinesweeperGame.isMineSurrounded(normalGame.realBoard, row, col)).toBeFalsy();

                    if(normalGame.realBoard[row][col] === "*") mineCount++
                }
            }

            expect(mineCount).toEqual(gameBoardSizes.normal.mineAmt);
        });

        test("hard", function () {
            const hardGame = new MinesweeperGame("hard");

            expect(hardGame.realBoard[0].length).toEqual(gameBoardSizes.hard.colNum)
            expect(hardGame.realBoard.length).toEqual(gameBoardSizes.hard.rowNum)

            let mineCount = 0;
            for (let col = 0; col < gameBoardSizes.hard.colNum; col++) {
                for (let row = 0; row < gameBoardSizes.hard.rowNum; row++) {
                    //No mine should be surrounded
                    expect(MinesweeperGame.isMineSurrounded(hardGame.realBoard, row, col)).toBeFalsy();

                    if(hardGame.realBoard[row][col] === "*") mineCount++
                }
            }

            expect(mineCount).toEqual(gameBoardSizes.hard.mineAmt);
        });

        test("expert", function () {
            const expertGame = new MinesweeperGame("expert");

            expect(expertGame.realBoard[0].length).toEqual(gameBoardSizes.expert.colNum)
            expect(expertGame.realBoard.length).toEqual(gameBoardSizes.expert.rowNum)

            let mineCount = 0;
            for (let col = 0; col < gameBoardSizes.expert.colNum; col++) {
                for (let row = 0; row < gameBoardSizes.expert.rowNum; row++) {
                    //No mine should be surrounded
                    expect(MinesweeperGame.isMineSurrounded(expertGame.realBoard, row, col)).toBeFalsy();

                    if(expertGame.realBoard[row][col] === "*") mineCount++
                }
            }

            expect(mineCount).toEqual(gameBoardSizes.expert.mineAmt);
        });

        test("advanced", function () {
            const advancedGame = new MinesweeperGame("advanced");

            expect(advancedGame.realBoard[0].length).toEqual(gameBoardSizes.advanced.colNum)
            expect(advancedGame.realBoard.length).toEqual(gameBoardSizes.advanced.rowNum)

            let mineCount = 0;
            for (let col = 0; col < gameBoardSizes.advanced.colNum; col++) {
                for (let row = 0; row < gameBoardSizes.advanced.rowNum; row++) {
                    //No mine should be surrounded
                    expect(MinesweeperGame.isMineSurrounded(advancedGame.realBoard, row, col)).toBeFalsy();

                    if(advancedGame.realBoard[row][col] === "*") mineCount++
                }
            }

            expect(mineCount).toEqual(gameBoardSizes.advanced.mineAmt);
        });
    });

    describe("clicks", function () {
        const game = new MinesweeperGame("easy");

        game.realBoard = [
            ["", "*", "", "*"],
            ["", "*", "", "*"],
            ["", "", "", "*"],
            ["", "", "", ""],
        ];
        /*
        * Winning Board
        [
            [2, "Mine", 4, "Mine"],
            [2, "Mine", 5, "Mine"],
            [1, 1, 3, "Mine"],
            [0, 0, 1, 1],
        ]
        * */

        game.userBoard = [
            ["Untouched", "Untouched", "Untouched", "Untouched"],
            ["Untouched", "Untouched", "Untouched", "Untouched"],
            ["Untouched", "Untouched", "Untouched", "Untouched"],
            ["Untouched", "Untouched", "Untouched", "Untouched"],
        ];

        describe("longClick", function () {
            test("numbered cell", function () {
                game.longClick(0, 0)

                expect(game.userBoard).toEqual([
                    ["Flag", "Untouched", "Untouched", "Untouched"],
                    ["Untouched", "Untouched", "Untouched", "Untouched"],
                    ["Untouched", "Untouched", "Untouched", "Untouched"],
                    ["Untouched", "Untouched", "Untouched", "Untouched"],
                ])
            })

            test("mine cell", function () {
                game.longClick(0, 1)

                expect(game.userBoard).toEqual([
                    ["Flag", "Flag", "Untouched", "Untouched"],
                    ["Untouched", "Untouched", "Untouched", "Untouched"],
                    ["Untouched", "Untouched", "Untouched", "Untouched"],
                    ["Untouched", "Untouched", "Untouched", "Untouched"],
                ])
            })
            test("unflagging", function () {
                game.longClick(0, 0)
                game.longClick(0, 1)

                expect(game.userBoard).toEqual([
                    ["Untouched", "Untouched", "Untouched", "Untouched"],
                    ["Untouched", "Untouched", "Untouched", "Untouched"],
                    ["Untouched", "Untouched", "Untouched", "Untouched"],
                    ["Untouched", "Untouched", "Untouched", "Untouched"],
                ])
            })
        })

        describe("shortClick", function () {

            test("reveals all chained blanks when 1 blank (aka 0) is clicked", function () {

                game.shortClick(3, 0) // bottom left
                expect(game.userBoard).toEqual([
                    ["Untouched", "Untouched", "Untouched", "Untouched"],
                    ["Untouched", "Untouched", "Untouched", "Untouched"],
                    [1, 1, 3, "Untouched"],
                    [0, 0, 1, "Untouched"],
                ])
            })

            test("nothing happens if a revealed number is clicked", function () {

                game.shortClick(3, 0)
                game.shortClick(3, 1)
                game.shortClick(3, 2)

                expect(game.userBoard).toEqual([
                    ["Untouched", "Untouched", "Untouched", "Untouched"],
                    ["Untouched", "Untouched", "Untouched", "Untouched"],
                    [1, 1, 3, "Untouched"],
                    [0, 0, 1, "Untouched"],
                ])
            })

            test("no chain reaction if it has mines near it", function () {

                game.shortClick(3, 3) // bottom RIGHT

                expect(game.userBoard).toEqual([
                    ["Untouched", "Untouched", "Untouched", "Untouched"],
                    ["Untouched", "Untouched", "Untouched", "Untouched"],
                    [1, 1, 3, "Untouched"],
                    [0, 0, 1, 1],
                ])
            })

            test("remaining numbered cells", function () {

                game.shortClick(0, 0);
                game.shortClick(0, 2);
                game.shortClick(1, 0);
                game.shortClick(1, 2);

                expect(game.userBoard).toEqual([
                    [2, "Untouched", 4, "Untouched"],
                    [2, "Untouched", 5, "Untouched"],
                    [1, 1, 3, "Untouched"],
                    [0, 0, 1, 1],
                ])
            })

            test("can't short click a flagged cell", function (){
                game.longClick(0, 3)
                game.shortClick(0, 3)

                expect(game.userBoard).toEqual([
                    [2, "Untouched", 4, "Flag"],
                    [2, "Untouched", 5, "Untouched"],
                    [1, 1, 3, "Untouched"],
                    [0, 0, 1, 1],
                ])
            })

            test("Mine explosion", function () {

                game.shortClick(0, 1);

                expect(game.state).toEqual("lost")
                expect(game.userBoard).toEqual([
                    [2, "Mine", 4, "Flag"],
                    [2, "Untouched", 5, "Untouched"],
                    [1, 1, 3, "Untouched"],
                    [0, 0, 1, 1],
                ])
            })
        })

    });

});