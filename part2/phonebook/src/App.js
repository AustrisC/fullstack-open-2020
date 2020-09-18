import React, { useState, useEffect } from 'react';
import { Search } from './Search';
import { AddUserForm } from './AddUserForm';
import { Persons } from './Persons';
import personService from './services/persons';
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Fetches initial data
  useEffect(() => {
    console.log('effect');
    personService.getAll().then((response) => {
      console.log('promise fulfilled');
      setPersons(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      {successMessage && (
        <div className="success">
          <p>{successMessage}</p>
        </div>
      )}
      {errorMessage && (
        <div className="error">
          <p>{errorMessage}</p>
        </div>
      )}
      <Search filter={filter} setFilter={setFilter} />
      <h2>Add a new</h2>
      <AddUserForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
        setSuccessMessage={setSuccessMessage}
        setErrorMessage={setErrorMessage}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} setPersons={setPersons} />
    </div>
  );
};

export default App;
