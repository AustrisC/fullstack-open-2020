import React from 'react';

export const Search = ({ filter, setFilter }) => {
  return (
    <div>
      filter shown with{' '}
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};
