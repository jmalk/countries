async function nameSearch (name) {
  const response = await fetch(`https://restcountries.eu/rest/v2/name/${name}`)
  if (!response.ok) {
    throw new Error(`Response not ok, status ${response.status}.`)
  }
  return response.json()
}

function UL(array) {
  return `
    <ul>
      ${array.map(string => `<li>${string}</li>`).join('')}
    </ul>
  `
}

function errorMessage(value) {
  return `<p>Sorry, no countries were found matching your search term "${value}".`
}

function renderResults(markup) {
  const $searchResults = document.querySelector('#search-results');
  $searchResults.innerHTML = markup;
}

function onSubmit(event) {
  event.preventDefault();

  const value = event.srcElement[0].value;

  const $search = document.querySelector('#search');
  $search.reset();

  nameSearch(value)
    .then(countries => countries && countries.map(country => country.name))
    .then(UL)
    .then(renderResults)
    .catch(() => handleError(value));
}

function handleError(value) {
  // TODO: More reasons this could go wrong than just no results,
  // e.g. API down would error even if you searched "United".
  const markup = errorMessage(value);
  renderResults(markup);
}

const $search = document.querySelector('#search');
$search.addEventListener('submit', onSubmit);