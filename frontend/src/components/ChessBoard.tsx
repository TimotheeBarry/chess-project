import React, { Component, useEffect, useState } from "react";
import { ChessSquare } from "./ChessSquare";
import { Board, Coordinates } from "../model/BoardModel";
import { Piece, Color } from "../model/PieceModel";

export interface ChessBoardProps {
    initialBoard: Board;
}

export interface ChessBoardState {
    selectedPiece: Piece | null;
    legalMoves: Coordinates[];
    board: Board
}


export class ChessBoard extends Component<ChessBoardProps, ChessBoardState> {
    constructor(props: ChessBoardProps) {
        super(props);
        this.state = {
            board: props.initialBoard,
            selectedPiece: null,
            legalMoves: [],
        };
    }


    handleClickedPiece(squareCoordinates: Coordinates) {
        const board = Object.assign(new Board(), this.state.board);
        const selectedPiece = this.state.selectedPiece;
        if (selectedPiece === null && board.getPieceAt(squareCoordinates) === null) {
            this.setState({ selectedPiece: null, legalMoves: [] });
        }
        else if (selectedPiece === null && board.getPieceAt(squareCoordinates) !== null) {
            let newSelectedPiece = board.getPieceAt(squareCoordinates)!;
            this.setState({ selectedPiece: newSelectedPiece, legalMoves: newSelectedPiece.getLegalMoves(board) });

        }
        else if (selectedPiece !== null) {
            let from = selectedPiece.coordinates!;
            let to = squareCoordinates;
            if (board.isLegalMove(from, to)) {
                board.movePiece(from, to);
                this.setState({ selectedPiece: null, board: board, legalMoves: [] });
            }
            else {
                this.setState({ selectedPiece: null, legalMoves: [] });
            }
        }
    }

    renderChessBoard() {
        const board = this.state.board;
        let renderedBoard = [];
        console.log(this.state.legalMoves)
        if (board.direction === Color.white) {
            for (let i = 7; i >= 0; i--) {
                let row = [];
                for (let j = 0; j < 8; j++) {
                    let coordinates: Coordinates = { row: i, col: j };
                    row.push(
                        <ChessSquare
                            key={8 * i + j}
                            piece={board.getPieceAt(coordinates)}
                            coordinates={coordinates}
                            onClick={() => this.handleClickedPiece(coordinates)}
                            isSelected={this.state.selectedPiece?.isAtCoords(coordinates) ?? false}
                            isLegalMove={this.state.legalMoves.some((move) => move.row === i && move.col === j)}
                        />
                    );
                }
                renderedBoard.push(<div key={i} className="chess-row">{row}</div>);
            }
        }
        else {
            for (let i = 0; i < 8; i++) {
                let row = [];
                for (let j = 7; j >= 0; j--) {
                    let coordinates: Coordinates = { row: i, col: j };
                    row.push(
                        <ChessSquare
                            key={8 * i + j}
                            piece={board.getPieceAt(coordinates)}
                            coordinates={coordinates}
                            onClick={() => this.handleClickedPiece(coordinates)}
                            isSelected={this.state.selectedPiece?.isAtCoords(coordinates) ?? false}
                            isLegalMove={this.state.legalMoves.some((move) => move.row === i && move.col === j)}
                        />
                    );
                }
                renderedBoard.push(<div key={i} className="chess-row">{row}</div>);
            }
        }
        return (<>{renderedBoard}</>);
    }

    render() {
        return (<div className="chess-board">
            {this.renderChessBoard()}
        </div>
        )
    }

}

