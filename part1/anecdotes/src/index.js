import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(initPointObject(anecdotes));

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>{`Has ${points[selected]} points`}</p>

      <div>
        <Button onClick={() => vote(selected, points, setPoints)} text="vote" />
        <Button
          onClick={() => setSelected(randomIndex(selected, anecdotes.length))}
          text="next anecdote"
        />
      </div>

      <h1>Anecdote with most votes</h1>
      {
        anecdotes[
          Object.keys(points).find(
            (k) => points[k] === Math.max(...Object.values(points))
          )
        ]
      }
    </div>
  );
};

const initPointObject = (array) => {
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [array.indexOf(item)]: 0,
    };
  }, {});
};

const vote = (index, points, setPoints) => {
  const updatedPoints = { ...points };
  updatedPoints[index] = points[index] + 1;
  setPoints(updatedPoints);
};

const randomIndex = (oldValue, length) => {
  const newRandomIndex = ~~(Math.random() * length);

  // Avoids same anecdote to be returned 2 times in a row
  return newRandomIndex !== oldValue
    ? newRandomIndex
    : randomIndex(oldValue, length);
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
