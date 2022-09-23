import logo from './logo.svg';
import './App.css';
import {useEffect, useState, useRef} from 'react';

function App() {
  const [block, setBlock] = useState(null);
  const [val, setValue] = useState(false);
  const [count, setCount] = useState(false);
  const [winner, setWinner] = useState(null);
  const ref =useRef();
  useEffect(() => {
    const grid = new Array(3).fill(null).map(() => Array(3).fill(null));
    setBlock(grid);
  }, []);
  function blockClicked(e) {
    const value = e.target.innerHTML;
    console.log(ref.current);
    if(!value) {
      let copy = [...block];
      let attr = e.target.getAttribute('attr');
      let [row, col] = attr.split(',');
      copy[row][col] = val ? '0' : 'X';
      setCount(count => count + 1);
      checkWinner(row, col, val ? '0' : 'X');
      setValue(!val);
    }
  }
  function checkWinner(row, col, value) {
    // check col
    for(let i = 0; i < 3; i++) {
      if(block[row][i] !== value) break;
      if(i == 2) setWinner(value);
    }
    // check for row
    for(let i = 0; i < 3; i++) {
      if(block[i][col] !== value) break;
      if(i == 2) setWinner(value);
    }
    // diagnonal
    if(row === col) {
      for(let i = 0; i < 3; i++) {
        if(block[i][i] !== value) break;
        if(i == 2) setWinner(value);
      }
    }
    // anti diagnal
    if(row + col == 2){
      for(let i = 0; i < 3; i++){
        if(block[i][(2)-i] != value)
            break;
        if(i == 2) setWinner(value);
      }
    }
    if(count === 9) setWinner(false);
  }
  return (
    <div className="App">
      Tic Tac Toe
      <div onClick={blockClicked} className="grid" ref={ref}>{block?.map((item,row) => {
        return (item.map((itemList, col) => {
          return (
            <div attr={[row,col]} key={`${row}_${col}`}>{itemList}</div>
          );
        }))
      })}</div>
      {winner && <alert>{`Winner is ${val ? 'X' : '0'}`}</alert>}
      {winner == 'false' && <div> Match Tie</div>}
      {count}
    </div>
  );
}

export default App;
