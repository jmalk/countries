async function nameSearch (name) {
  const response = await fetch(`https://restcountries.eu/rest/v2/name/${name}`)
  return response.json()
}

function UL(array) {
  return `
    <ul>
      ${array.map(string => `<li>${string}</li>`).join('')}
    </ul>
  `
}

function renderResults(markup) {
  const $searchResults = document.querySelector('#search-results');
  $searchResults.innerHTML = markup;
}

function onSubmit(event) {
  event.preventDefault();

  const value = event.srcElement[0].value;
  console.log(value);

  const $search = document.querySelector('#search');
  $search.reset();

  // TODO: Gracefully handle 404s.
  nameSearch(value)
    .then(countries => countries.map(country => country.name))
    .then(UL)
    .then(renderResults)
    .catch(e => console.error(e));
}

const $search = document.querySelector('#search');
$search.addEventListener('submit', onSubmit);