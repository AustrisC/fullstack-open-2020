import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Country = ({ country }) => {
  const [weather, setWeather] = useState({});
  // Fetches weather data
  useEffect(() => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const requestUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${country.capital}`;

    axios.get(requestUrl).then((response) => {
      setWeather(response.data);
    });
  }, []);

  return (
    <div>
      <h2>{country.name}</h2>
      <p>{`Capital: ${country.capital}`}</p>
      <p>{`Population: ${country.population}`}</p>
      <h4>Languages</h4>
      <ul>
        {country.languages.map((l) => (
          <li key={l.iso639_1}>{l.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="Flag" width={150} />
      <h4>Weather in {country.capital}</h4>
      {Object.keys(weather).length > 0 ? (
        <div>
          <p>{`Temperature: ${weather.current.temperature} Celsius`}</p>
          <img src={weather.current.weather_icons[0]} alt="weather_icon" />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
