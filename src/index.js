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

refs.searchCountry.addEventListener(
  'input',
  debounce(() => {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';

    const searchValue = refs.searchCountry.value.trim();
    if (searchValue !== '') {
      fetchCountries(searchValue)
        .then(countries => {
          if (countries.length > 10) {
            Notiflix.Notify.info(
              'Too many matches found. Please enter a more specific name.'
            );
          } else if (countries.length >= 2 && countries.length <= 10) {
            const markupList = countries
              .map(
                country =>
                  `<li class="all-countries-item">
                    <img class="flags-img" src="${country.flags.svg}" alt="${country.name.common}"  >
                    <h3 class="country-name">${country.name.common}</h3>
                  </li>`
              )
              .join('');
            refs.countryList.innerHTML = markupList;
          } else if (countries.length === 1) {
            const country = countries[0];
            const {
              name: { official },
              capital,
              population,
              flags,
              languages,
            } = country;
            const markupCard = `<div class="country-card">
                                  <div class="header">
                                    <img class="flag-img" src="${
                                      flags.svg
                                    }" alt="${official}"  >
                                    <h1 class="name">${official}</h1>
                                  </div>
                                  <p class="capital">Capital: ${capital}</p>
                                  <p class="population">Population: ${population}</p>
                                  <p class="languages">Languages: ${Object.values(
                                    languages
                                  ).join(', ')}</p> 
                                </div>`;
            refs.countryInfo.innerHTML = markupCard;
          }
          //   else {
          //     throw new Error('Oops, there is no country with that name');
          //   }
        })
        .catch(error => {
          Notiflix.Notify.failure(error.message);
        });
    }
  }, refs.DEBOUNCE_DELAY)
);
