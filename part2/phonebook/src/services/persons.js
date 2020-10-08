import axios from 'axios';
const BASE_URL = 'api/persons';

const getAll = () => {
  return axios.get(BASE_URL);
};

const addPerson = (person) => {
  return axios.post(BASE_URL, person);
};

const updatePerson = (person) => {
  return axios.put(`${BASE_URL}/${person.id}`, person);
};

const deletePerson = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

export default {
  getAll,
  addPerson,
  updatePerson,
  deletePerson,
};
