import React from 'react';
import personService from './services/persons';

export const Persons = ({ persons, filter, setPersons }) => {
  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      setPersons(...[persons.filter((p) => p.id !== person.id)]);
      personService.deletePerson(person.id);
    }
  };

  return (
    <div>
      {persons
        .filter((p) =>
          filter === ''
            ? true
            : p.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((p, i) => (
          <div key={`${p.name} ${i}`}>
            <p>
              {`${p.name} ${p.number} `}{' '}
              <button onClick={() => deletePerson(p)}>delete</button>
            </p>
          </div>
        ))}
    </div>
  );
};
