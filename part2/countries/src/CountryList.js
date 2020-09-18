import React, { useState } from 'react';
import { Country } from './Country';

export const CountryList = ({ countries }) => {
  const [idx, setIdx] = useState(null);
  const [visible, setVisible] = useState(false);

  // Toggles visibility of countries
  // Shows / hides countries
  const toggleCountry = (i) => {
    // Hides current country if it's already visible
    if (visible) hideCountry();

    // If other country selected, show that instead
    if (idx !== i) {
      setIdx(i);
      setVisible(true);
    }
  };

  // Hides country
  const hideCountry = () => {
    setIdx(null);
    setVisible(false);
  };

  return countries.length === 1 ? (
    <Country country={countries[0]} />
  ) : (
    <div>
      {countries.map((country, i) => (
        <div key={`${country.name} ${i}`}>
          {`${country.name}`}
          <button onClick={() => toggleCountry(i)}>
            {visible && i === idx ? 'hide' : 'show'}
          </button>
          {idx != null && i === idx ? <Country country={country} /> : null}
        </div>
      ))}
    </div>
  );
};
