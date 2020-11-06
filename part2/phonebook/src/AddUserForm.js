import React from 'react';
import personService from './services/persons';

export const AddUserForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  persons,
  setPersons,
  setSuccessMessage,
  setErrorMessage,
}) => {
  // Displays error message for 3 seconds
  const displayErrorMessage = (error) => {
    console.log(error.response.data.error);
    const errorText = error.response.data.error;
    setErrorMessage(errorText);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  // Displays success message for 3 seconds
  const displaySuccessMessage = () => {
    setSuccessMessage(`${newName} added`);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    // Checks if newly created name exists in contacts list
    const contactExists = persons
      .map((p) => p.name.toLowerCase())
      .includes(newName.toLowerCase());

    // Existing contact replacement text
    const confirmText = `${newName} is already added to phonebook, replace the old number with a new one?`;

    if (contactExists) {
      if (window.confirm(confirmText)) {
        // Finds old person in the contacts list
        const oldPersonIndex = persons
          .map((p) => p.name.toLowerCase())
          .indexOf(newName.toLowerCase());
        const oldPerson = persons[oldPersonIndex];

        // Updates old person object & all person list
        const updatedPerson = { ...oldPerson, number: newNumber };
        const updatedPersonList = [...persons];
        updatedPersonList[oldPersonIndex] = updatedPerson;

        // Tires updating person in the phonebook
        personService
          .updatePerson(updatedPerson)
          .then((_) => {
            // Updates person List & resets local state
            setNewName('');
            setNewNumber('');
            setPersons(updatedPersonList);
          })
          .catch((e) => displayErrorMessage(e));
      }
    } else {
      // Creates a new contact
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      // Saves data in db.json
      personService
        .addPerson(newPerson)
        .then((_) => {
          // Updates person List & resets local state
          setPersons([...persons, newPerson]);
          setNewName('');
          setNewNumber('');
          displaySuccessMessage();
        })
        .catch((e) => displayErrorMessage(e));
    }
  };

  return (
    <form>
      <div>
        name:{' '}
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>
      <div>
        number:{' '}
        <input
          type="text"
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit" onClick={handleSaveClick}>
          add
        </button>
      </div>
    </form>
  );
};
