import React, { useEffect, useState } from "react";
import '../styles/ChessBoard.css'
import { Coordinates } from "../model/BoardModel";
import { Piece } from "../model/PieceModel";

export interface ChessSquareProps {
    piece: Piece | null;
    coordinates: Coordinates;
    isSelected: boolean;
    isLegalMove?: boolean;
    onClick: () => void;
}

export class ChessSquare extends React.Component<ChessSquareProps> {

    constructor(props: ChessSquareProps) {
        super(props);
    }


    renderPiece() {
        const piece = this.props.piece;
        if (piece === null) {
            return;
        }

        return <img className="chess-piece" src={piece.asset!} alt={piece.assetAlt!} />;
    }

    render() {
        const row: number = this.props.coordinates.row;
        const col: number = this.props.coordinates.col;

        const squareColor = (row + col) % 2 === 0 ? "white" : "black";
        const piece = this.props.piece;

        return (
            <div className={`chess-square ${squareColor} ${this.props.isSelected ? 'selected' : ''}`} onClick={() => this.props.onClick()}>
                {this.props.isLegalMove && <div className={`legal-move-${piece === null ? 'no' : 'with'}-piece`}></div>}
                {this.renderPiece()}

            </div>
        );
    }
}