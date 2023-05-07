export function fetchCountries(countryName) {
  const BASE_URL = 'https://restcountries.com/v3.1/name';
  return fetch(
    `${BASE_URL}/${countryName}?fields=name,capital,population,flag,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error('Oops, there is no country with that name');
      }

      return response.json();
    })
    .then(country => {
      console.log(country);
    })
    .catch(error => {
      console.log(error);
    });
}
