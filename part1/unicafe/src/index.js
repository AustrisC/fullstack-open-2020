import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>

      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

const StatisticRow = ({ text, value }) => (
  <tr key={text}>
    <td>{text}</td>
    <td>
      {/* Adds conditional percentage sign to positive row  */}
      {`${value}${text === 'positive' ? ' %' : ''}`}
    </td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total || 0;
  const positive = (good * 100) / total || 0;

  return total === 0 ? (
    <div>
      <p>No feedback given</p>
    </div>
  ) : (
    <div>
      <h2>Statistics</h2>

      <table>
        <tbody>
          <StatisticRow text="good" value={good} />
          <StatisticRow text="neutral" value={neutral} />
          <StatisticRow text="bad" value={bad} />
          <StatisticRow text="all" value={total} />
          <StatisticRow text="average" value={average} />
          <StatisticRow text="positive" value={positive} />
        </tbody>
      </table>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
