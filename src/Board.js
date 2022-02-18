import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25
  }

  constructor(props) {
    super(props);
    this.state = {
      board: this.createBoard(),
      hasWon: false
    }
    this.flipCellsAroundMe = this.flipCellsAroundMe.bind(this)
  }

  createBoard() {
    const { nrows, ncols, chanceLightStartsOn } = this.props
    let board = [];

    for (let i = 0; i < nrows; i++) {
      let row = []
      for (let j = 0; j < ncols; j++) {
        row.push(Math.random() < chanceLightStartsOn)
      }
      board.push(row)
    }

    return board
  }

  flipCellsAroundMe(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y, x)
    flipCell(y + 1, x)
    flipCell(y - 1, x)
    flipCell(y, x + 1)
    flipCell(y, x - 1)

    let hasWon = board.every(row => row.every(col => !col))

    this.setState({ board, hasWon });
  }

  render() {

    if (this.state.hasWon) return (
      <div className="Board-title">
        <div className="Board-winner">
          <span className="neon-orange">You</span>
          <span className="neon-blue">Win!</span>
        </div>
      </div>
    )

    return (
      <>
        <div className="Board-title">
          <div className="neon-orange">Ligts</div>
          <div className="neon-blue">Out</div>
        </div>
        <table className="Board">
          <tbody>
            {this.state.board.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((col, colIndex) => {
                  let coord = `${rowIndex}-${colIndex}`
                  return (
                    <Cell
                      key={coord}
                      isLit={col}
                      flipCellsAroundMe={() => this.flipCellsAroundMe(coord)}
                    />
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  }
}


export default Board;
