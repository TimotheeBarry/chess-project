import React from "react";
import { Board, Coordinates } from "./BoardModel";

export enum Color {
    white,
    black
}

export class Piece {
    constructor(color: Color, coordinates: Coordinates) {
        this.color = color;
        this.coordinates = coordinates;
        this.asset = null;
        this.assetAlt = null;

    }
    color: Color;
    coordinates: Coordinates;
    asset: any;
    assetAlt: string | null;

    getLegalMoves(board: Board): Coordinates[] {
        return [];
    }

    isAtCoords(coordinates: Coordinates): boolean {
        return this.coordinates.row === coordinates.row && this.coordinates.col === coordinates.col;
    }

    moveTo(to: Coordinates) {
        this.coordinates = to;
    }

}

export class Pawn extends Piece {
    constructor(color: Color, coordinates: Coordinates) {
        super(color, coordinates);

        this.canBeTakenEnPassant = false;
        this.asset = require(`../assets/pieces/${this.color === Color.white ? "white" : "black"}/pawn.svg`);
        this.assetAlt = this.color === Color.white ? 'P' : 'p'
    }
    canBeTakenEnPassant: boolean;

    get isAtStartingPosition(): boolean {
        if (this.color === Color.white) {
            return this.coordinates.row === 1;
        }
        else {
            return this.coordinates.row === 6;
        }
    }

    getLegalMoves(board: Board): Coordinates[] {
        let legalMoves: Coordinates[] = [];
        if (this.color !== board.currentPlayer) {
            return legalMoves;
        }
        let oneRowForward: number;
        let twoRowsForward: number;
        if (this.color === Color.white) {
            oneRowForward = Math.min(this.coordinates.row + 1, 7);
            twoRowsForward = Math.min(this.coordinates.row + 2, 7);
        }
        else {
            oneRowForward = Math.max(this.coordinates.row - 1, 0);
            twoRowsForward = Math.max(this.coordinates.row - 2, 0);
        }
        //check if the pawn can move one row forward
        if (board.board[oneRowForward][this.coordinates.col] === null) {
            legalMoves.push({ row: oneRowForward, col: this.coordinates.col });
            if (this.isAtStartingPosition) {
                //check if the pawn can move two rows forward
                if (board.board[twoRowsForward][this.coordinates.col] === null) {
                    legalMoves.push({ row: twoRowsForward, col: this.coordinates.col });
                }
            }
        }
        //check if the pawn can take a piece diagonally
        for (var horizonalMove of [-1, 1]) {
            var nextCol = this.coordinates.col + horizonalMove;
            if (nextCol >= 0 && nextCol < 8 && board.board[oneRowForward][nextCol] !== null && board.board[oneRowForward][nextCol]!.color !== this.color) {
                legalMoves.push({ row: oneRowForward, col: nextCol });
            }
        }
        return legalMoves;

    }
}

export class Knight extends Piece {
    constructor(color: Color, coordinates: Coordinates) {
        super(color, coordinates);
        this.asset = require(`../assets/pieces/${this.color === Color.white ? "white" : "black"}/knight.svg`);
        this.assetAlt = this.color === Color.white ? 'N' : 'n'
    }

    getLegalMoves(board: Board): Coordinates[] {
        var legalMoves: Coordinates[] = [];
        if (this.color !== board.currentPlayer) {
            return legalMoves;
        }
        var horizontalMoves = [1, 2, 2, 1, -1, -2, -2, -1];
        var verticalMoves = [2, 1, -1, -2, -2, -1, 1, 2];

        for (var i = 0; i < 8; i++) {
            var nextRow = this.coordinates.row + verticalMoves[i];
            var nextCol = this.coordinates.col + horizontalMoves[i];
            if (nextRow >= 0 && nextRow < 8 && nextCol >= 0 && nextCol < 8 && (board.board[nextRow][nextCol] === null || board.board[nextRow][nextCol]!.color !== this.color)) {
                legalMoves.push({ row: nextRow, col: nextCol });
            }
        }
        return legalMoves;
    }
}

export class Bishop extends Piece {
    constructor(color: Color, coordinates: Coordinates) {
        super(color, coordinates);
        this.asset = require(`../assets/pieces/${this.color === Color.white ? "white" : "black"}/bishop.svg`);
        this.assetAlt = this.color === Color.white ? 'B' : 'b'
    }

    getLegalMoves(board: Board): Coordinates[] {
        let legalMoves: Coordinates[] = [];
        if (this.color !== board.currentPlayer) {
            return legalMoves;
        }
        for (var verticalMove of [-1, 1]) {
            for (var horizontalMove of [-1, 1]) {
                var nextRow = this.coordinates.row + verticalMove;
                var nextCol = this.coordinates.col + horizontalMove;
                while (nextRow >= 0 && nextRow < 8 && nextCol >= 0 && nextCol < 8) {
                    if (board.board[nextRow][nextCol] === null) {
                        legalMoves.push({ row: nextRow, col: nextCol });
                    }
                    else if (board.board[nextRow][nextCol]!.color !== this.color) {
                        legalMoves.push({ row: nextRow, col: nextCol });
                        break;
                    }
                    else {
                        break;
                    }
                    nextRow += verticalMove;
                    nextCol += horizontalMove;
                }
            }
        }
        return legalMoves;
    }
}

export class Rook extends Piece {
    constructor(color: Color, coordinates: Coordinates) {
        super(color, coordinates);
        this.asset = require(`../assets/pieces/${this.color === Color.white ? "white" : "black"}/rook.svg`);
        this.assetAlt = this.color === Color.white ? 'R' : 'r'
    }

    getLegalMoves(board: Board): Coordinates[] {
        let legalMoves: Coordinates[] = [];
        if (this.color !== board.currentPlayer) {
            return legalMoves;
        }
        for (var verticalMove of [-1, 1]) {
            var nextRow = this.coordinates.row + verticalMove;
            var nextCol = this.coordinates.col;
            while (nextRow >= 0 && nextRow < 8) {
                if (board.board[nextRow][nextCol] === null) {
                    legalMoves.push({ row: nextRow, col: nextCol });
                }
                else if (board.board[nextRow][nextCol]!.color !== this.color) {
                    legalMoves.push({ row: nextRow, col: nextCol });
                    break;
                }
                else {
                    break;
                }
                nextRow += verticalMove;
            }
        }
        for (var horizontalMove of [-1, 1]) {
            var nextRow = this.coordinates.row;
            var nextCol = this.coordinates.col + horizontalMove;
            while (nextCol >= 0 && nextCol < 8) {
                if (board.board[nextRow][nextCol] === null) {
                    legalMoves.push({ row: nextRow, col: nextCol });
                }
                else if (board.board[nextRow][nextCol]!.color !== this.color) {
                    legalMoves.push({ row: nextRow, col: nextCol });
                    break;
                }
                else {
                    break;
                }
                nextCol += horizontalMove;
            }
        }
        return legalMoves;
    }

}

export class Queen extends Piece {
    constructor(color: Color, coordinates: Coordinates) {
        super(color, coordinates);
        this.asset = require(`../assets/pieces/${this.color === Color.white ? "white" : "black"}/queen.svg`);
        this.assetAlt = this.color === Color.white ? 'Q' : 'q'
    }

    getLegalMoves(board: Board): Coordinates[] {
        let legalMoves: Coordinates[] = [];
        if (this.color !== board.currentPlayer) {
            return legalMoves;
        }
        //bishop moves
        for (var verticalMove of [-1, 1]) {
            for (var horizontalMove of [-1, 1]) {
                var nextRow = this.coordinates.row + verticalMove;
                var nextCol = this.coordinates.col + horizontalMove;
                while (nextRow >= 0 && nextRow < 8 && nextCol >= 0 && nextCol < 8) {
                    if (board.board[nextRow][nextCol] === null) {
                        legalMoves.push({ row: nextRow, col: nextCol });
                    }
                    else if (board.board[nextRow][nextCol]!.color !== this.color) {
                        legalMoves.push({ row: nextRow, col: nextCol });
                        break;
                    }
                    else {
                        break;
                    }
                    nextRow += verticalMove;
                    nextCol += horizontalMove;
                }
            }
        }
        //rook moves
        for (var verticalMove of [-1, 1]) {
            var nextRow = this.coordinates.row + verticalMove;
            var nextCol = this.coordinates.col;
            while (nextRow >= 0 && nextRow < 8) {
                if (board.board[nextRow][nextCol] === null) {
                    legalMoves.push({ row: nextRow, col: nextCol });
                }
                else if (board.board[nextRow][nextCol]!.color !== this.color) {
                    legalMoves.push({ row: nextRow, col: nextCol });
                    break;
                }
                else {
                    break;
                }
                nextRow += verticalMove;
            }
        }
        for (var horizontalMove of [-1, 1]) {
            var nextRow = this.coordinates.row;
            var nextCol = this.coordinates.col + horizontalMove;
            while (nextCol >= 0 && nextCol < 8) {
                if (board.board[nextRow][nextCol] === null) {
                    legalMoves.push({ row: nextRow, col: nextCol });
                }
                else if (board.board[nextRow][nextCol]!.color !== this.color) {
                    legalMoves.push({ row: nextRow, col: nextCol });
                    break;
                }
                else {
                    break;
                }
                nextCol += horizontalMove;
            }
        }
        return legalMoves;
    }
}

export class King extends Piece {
    constructor(color: Color, coordinates: Coordinates) {
        super(color, coordinates);
        this.canCastleRight = true;
        this.canCastleLeft = true;
        this.asset = require(`../assets/pieces/${this.color === Color.white ? "white" : "black"}/king.svg`);
        this.assetAlt = this.color === Color.white ? 'K' : 'k';

    }
    canCastleRight: boolean;
    canCastleLeft: boolean;

    getLegalMoves(board: Board): Coordinates[] {
        let legalMoves: Coordinates[] = [];
        if (this.color !== board.currentPlayer) {
            return legalMoves;
        }
        for (var verticalMove of [-1, 0, 1]) {
            for (var horizontalMove of [-1, 0, 1]) {
                if (verticalMove === 0 && horizontalMove === 0) {
                    continue;
                }
                var nextRow = this.coordinates.row + verticalMove;
                var nextCol = this.coordinates.col + horizontalMove;
                if (nextRow >= 0 && nextRow < 8 && nextCol >= 0 && nextCol < 8 && (board.board[nextRow][nextCol] === null || board.board[nextRow][nextCol]!.color !== this.color)) {
                    legalMoves.push({ row: nextRow, col: nextCol });
                }
            }
        }
        if (this.canCastleRight) {
            //check if the king can castle to the right
            if (board.board[this.coordinates.row][this.coordinates.col + 1] === null && board.board[this.coordinates.row][this.coordinates.col + 2] === null) {
                let rook = board.board[this.coordinates.row][this.coordinates.col + 3];
                if (rook !== null && rook.color === this.color && rook instanceof Rook) {
                    legalMoves.push({ row: this.coordinates.row, col: this.coordinates.col + 2 });
                }
            }
        }
        if (this.canCastleLeft) {
            //check if the king can castle to the left
            if (board.board[this.coordinates.row][this.coordinates.col - 1] === null && board.board[this.coordinates.row][this.coordinates.col - 2] === null && board.board[this.coordinates.row][this.coordinates.col - 3] === null) {
                let rook = board.board[this.coordinates.row][this.coordinates.col - 4];
                if (rook !== null && rook.color === this.color && rook instanceof Rook) {
                    legalMoves.push({ row: this.coordinates.row, col: this.coordinates.col - 2 });
                }
            }
        }
        return legalMoves;
    }

    isChecked(board: Board): boolean {
        return false;
    }
}