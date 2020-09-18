import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CountryList } from './CountryList';

const COUNTRIES_API_URL = 'https://restcountries.eu/rest/v2/all';

const Countries = ({ countries, search }) => {
  const filteredCountries = countries.filter((c) =>
    search === '' ? true : c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {filteredCountries.length > 10 ? (
        <div>
          <p>Too many matches, specify another filter</p>
        </div>
      ) : (
        <div>
          <CountryList countries={filteredCountries} />
        </div>
      )}
    </div>
  );
};

function App() {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);

  // Fetches initial data
  useEffect(() => {
    console.log('effect');
    axios.get(COUNTRIES_API_URL).then((response) => {
      console.log('promise fulfilled');
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      <div>
        Find countries{' '}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Countries countries={countries} search={search} />
    </div>
  );
}

export default App;
