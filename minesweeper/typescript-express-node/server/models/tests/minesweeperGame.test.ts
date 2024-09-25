import { describe, test, expect } from 'vitest';
import { MinesweeperGame, gameBoardSizes, tBoardCell } from "../minesweeperGame";



describe("MinesweeperGame", function () {

    describe("isMineSurrounded", function () {

        const board: tBoardCell[][] = [
            ["", "*", "*", "*"], // 3rd and 4th are surrounded
            ["", "*", "*", "*"], // 3rd and 4th are surrounded
            ["", "*", "*", "*"],
            ["", "", "", ""],
        ]

        test("not surrounded", function (){
            expect(MinesweeperGame.isMineSurrounded(board, 1, 1)).toBeFalsy();
        })

        test("fully surrounded", function (){
            expect(MinesweeperGame.isMineSurrounded(board, 1, 2)).toBeTruthy();
        })

        test("edge not surrounded", function (){
            expect(MinesweeperGame.isMineSurrounded(board, 0, 1)).toBeFalsy();
        })

        test("edge fully surrounded", function (){
            expect(MinesweeperGame.isMineSurrounded(board, 0, 2)).toBeTruthy();
        })
    })

    describe("makeRealBoard", function () {

        test("beginner", function () {
            const beginnerGame = new MinesweeperGame("beginner");

            expect(beginnerGame.realBoard[0].length).toEqual(gameBoardSizes.beginner.colNum)
            expect(beginnerGame.realBoard.length).toEqual(gameBoardSizes.beginner.rowNum)

            for (let i = 0; i < gameBoardSizes.beginner.colNum; i++) {
                for (let j = 0; j < gameBoardSizes.beginner.rowNum; j++) {
                    expect(MinesweeperGame.isMineSurrounded(beginnerGame.realBoard, j, i)).toBeFalsy();
                }
            }
        });

        test("easy", function () {
            const easyGame = new MinesweeperGame("easy");

            expect(easyGame.realBoard[0].length).toEqual(gameBoardSizes.easy.colNum)
            expect(easyGame.realBoard.length).toEqual(gameBoardSizes.easy.rowNum)

            for (let i = 0; i < gameBoardSizes.easy.colNum; i++) {
                for (let j = 0; j < gameBoardSizes.easy.rowNum; j++) {
                    expect(MinesweeperGame.isMineSurrounded(easyGame.realBoard, j, i)).toBeFalsy();
                }
            }
        });

        test("normal", function () {
            const normalGame = new MinesweeperGame("normal");

            expect(normalGame.realBoard[0].length).toEqual(gameBoardSizes.normal.colNum)
            expect(normalGame.realBoard.length).toEqual(gameBoardSizes.normal.rowNum)

            for (let i = 0; i < gameBoardSizes.normal.colNum; i++) {
                for (let j = 0; j < gameBoardSizes.normal.rowNum; j++) {
                    expect(MinesweeperGame.isMineSurrounded(normalGame.realBoard, j, i)).toBeFalsy();
                }
            }
        });

        test("hard", function () {
            const hardGame = new MinesweeperGame("hard");

            expect(hardGame.realBoard[0].length).toEqual(gameBoardSizes.hard.colNum)
            expect(hardGame.realBoard.length).toEqual(gameBoardSizes.hard.rowNum)

            for (let i = 0; i < gameBoardSizes.hard.colNum; i++) {
                for (let j = 0; j < gameBoardSizes.hard.rowNum; j++) {
                    expect(MinesweeperGame.isMineSurrounded(hardGame.realBoard, j, i)).toBeFalsy();
                }
            }
        });

        test("expert", function () {
            const expertGame = new MinesweeperGame("expert");

            expect(expertGame.realBoard[0].length).toEqual(gameBoardSizes.expert.colNum)
            expect(expertGame.realBoard.length).toEqual(gameBoardSizes.expert.rowNum)

            for (let i = 0; i < gameBoardSizes.expert.colNum; i++) {
                for (let j = 0; j < gameBoardSizes.expert.rowNum; j++) {
                    expect(MinesweeperGame.isMineSurrounded(expertGame.realBoard, j, i)).toBeFalsy();
                }
            }
        });

        test("advanced", function () {
            const advancedGame = new MinesweeperGame("advanced");

            expect(advancedGame.realBoard[0].length).toEqual(gameBoardSizes.advanced.colNum)
            expect(advancedGame.realBoard.length).toEqual(gameBoardSizes.advanced.rowNum)

            for (let i = 0; i < gameBoardSizes.advanced.colNum; i++) {
                for (let j = 0; j < gameBoardSizes.advanced.rowNum; j++) {
                    expect(MinesweeperGame.isMineSurrounded(advancedGame.realBoard, j, i)).toBeFalsy();
                }
            }
        });
    });

});