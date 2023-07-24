import React from "react";
import { Piece, Pawn, Rook, Knight, Bishop, Queen, King, Color } from "./PieceModel";


export interface Coordinates {
    row: number;
    col: number;
}

export function createBoardFromString(simplifiedBoard: string[][]): (Piece | null)[][] {

    let board: (Piece | null)[][] = [];
    for (let i = 0; i < 8; i++) {
        let row: (Piece | null)[] = [];
        for (let j = 0; j < 8; j++) {
            let piece: Piece | null = initializePieceFromString(simplifiedBoard[i][j], { row: i, col: j });
            row.push(piece);
        }
        board.push(row);
    }
    return board;
}

export const initBoard = [
    ["R", "N", "B", "Q", "K", "B", "N", "R"],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    ["r", "n", "b", "q", "k", "b", "n", "r"]
];

export function initializePieceFromString(simplifiedPiece: string, coordinates: Coordinates): Piece | null {
    let color: Color = simplifiedPiece.toUpperCase() === simplifiedPiece ? Color.white : Color.black;
    switch (simplifiedPiece.toLowerCase()) {
        case "p":
            return new Pawn(color, coordinates);
        case "r":
            return new Rook(color, coordinates);
        case "n":
            return new Knight(color, coordinates);
        case "b":
            return new Bishop(color, coordinates);
        case "q":
            return new Queen(color, coordinates);
        case "k":
            return new King(color, coordinates);
        default:
            return null;
    }
}

export class Board {
    constructor(simplifiedBoard?: string[][], direction?: Color, currentPlayer?: Color) {
        this.board = createBoardFromString(simplifiedBoard ?? initBoard);
        this.direction = direction ?? Color.white;
        this.currentPlayer = currentPlayer ?? Color.white;
    }
    board: (Piece | null)[][];
    direction: Color;
    currentPlayer: Color;

    getPieceAt(coordinates: Coordinates): Piece | null {
        return this.board[coordinates.row][coordinates.col];
    }

    movePiece(from: Coordinates, to: Coordinates) {
        console.log(this.toString())
        let piece = this.board[from.row][from.col];
        if (piece === null) {
            throw new Error(`No piece at from coordinates: ${from} -> ${to}`);
        }
        piece.moveTo(to);
        this.board[from.row][from.col] = null;
        this.board[to.row][to.col] = piece;
        this.currentPlayer = this.currentPlayer === Color.white ? Color.black : Color.white;
    }

    isLegalMove(from: Coordinates, to: Coordinates): boolean {
        let piece = this.board[from.row][from.col];
        if (piece === null) {
            throw new Error(`No piece at from coordinates: ${from} -> ${to}`);
        }
        let legalMoves = piece.getLegalMoves(this);
        for (let i = 0; i < legalMoves.length; i++) {
            if (legalMoves[i].row === to.row && legalMoves[i].col === to.col) {
                return true;
            }
        }
        return false;
    }


    toString(): string {
        let boardString = "";
        if (this.direction === Color.white) {
            for (let i = 7; i >= 0; i--) {
                let rowString = "";
                for (let j = 0; j < 8; j++) {
                    let piece = this.board[i][j];
                    if (piece === null) {
                        rowString += ".";
                    }
                    else {
                        rowString += piece.assetAlt;
                    }
                }
                boardString += rowString + "\n";
            }
            return boardString;
        }
        for (let i = 0; i < 8; i++) {
            let rowString = "";
            for (let j = 0; j < 8; j++) {
                let piece = this.board[i][j];
                if (piece === null) {
                    rowString += ".";
                }
                else {
                    rowString += piece.assetAlt;
                }
            }
            boardString += rowString + "\n";
        }
        return boardString;
    }
}



