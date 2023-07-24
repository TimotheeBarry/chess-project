import React from 'react';
import './styles/App.css';
import {  ChessBoard } from './components/ChessBoard';
import { Board,  } from './model/BoardModel';


function App() {

  return (
    <div className="App">
      <ChessBoard initialBoard={new Board()} />
    </div>
  );
}

export default App;
