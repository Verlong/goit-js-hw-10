import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
// Notiflix.Notify.success('Sol lucet omnibus');
// Notiflix.Notify.failure('Qui timide rogat docet negare');
// Notiflix.Notify.warning('Memento te hominem esse');
// Notiflix.Notify.info('Cogito ergo sum');
const refs = {
  DEBOUNCE_DELAY: 300,
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
  searchCountry: document.querySelector('#search-box'),
};

fetchCountries('Canada').then(responce => console.log(responce));
