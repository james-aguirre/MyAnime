// global dom variables
const $navbarForm = document.querySelector('.navbar-form');
const $mainForm = document.querySelector('.home-form');
const $resultList = document.querySelector('#result-list');
const $searchPage = document.querySelector('.main-search');
const $resultPage = document.querySelector('#results');
const $navbarIcon = document.querySelector('#navbar-icon');
const $resultsHeader = document.querySelector('.results-header');

// navbar search bar function
$navbarForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const $search = event.target.elements.search.value;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://api.jikan.moe/v4/anime?limit=5&q=${$search}&rating=tv`);
  xhr.responseType = 'json';
  removeAllChildNodes($resultList);
  xhr.addEventListener('load', function () {
    switchContent($search, xhr);
  });
  $navbarForm.reset();
  viewSwap('results');
  xhr.send();
});

// home page search bar function
$mainForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const $search = event.target.elements.homesearch.value;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://api.jikan.moe/v4/anime?limit=5&q=${$search}&rating=tv`);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    switchContent($search, xhr);
  });
  $mainForm.reset();
  viewSwap('results');
  xhr.send();
});

function switchContent($search, xhr) {
  $resultsHeader.textContent = `Search results for ${$search}`;
  for (let i = 0; i < xhr.response.data.length; i++) {
    $resultList.appendChild(renderEntry(xhr.response.data[i]));
  }

}

// render entries to DOM
function renderEntry(entry) {
  const $li = document.createElement('li');
  $resultList.appendChild($li);

  const $row = document.createElement('div');
  $row.classList.add('row', 'slide-container');
  $li.appendChild($row);

  const $columnThird = document.createElement('div');
  $columnThird.className = 'column-third';
  $row.appendChild($columnThird);

  const $img = document.createElement('img');
  $img.src = entry.images.jpg.image_url;
  $img.setAttribute('alt', `a picture of ${entry.title}`);
  $columnThird.appendChild($img);

  const $columnTwoThirds = document.createElement('div');
  $columnTwoThirds.className = 'column-two-thirds';
  $row.appendChild($columnTwoThirds);

  const $slideHeader = document.createElement('div');
  $slideHeader.className = 'slide-header';
  $columnTwoThirds.appendChild($slideHeader);

  const $headerTitle = document.createElement('h3');
  $headerTitle.textContent = entry.title;
  $slideHeader.appendChild($headerTitle);

  const $fontAwesome = document.createElement('i');
  $fontAwesome.className = 'fa-solid fa-plus';
  $slideHeader.appendChild($fontAwesome);

  const $description = document.createElement('p');
  $description.textContent = entry.synopsis;
  $columnTwoThirds.appendChild($description);

  return $li;
}

// swap views without page reload
function viewSwap(string) {
  if (string === 'results') {
    $resultPage.classList.remove('hidden');
    $searchPage.classList.add('hidden');
  } else if (string === 'search') {
    $resultPage.classList.add('hidden');
    $searchPage.classList.remove('hidden');
    removeAllChildNodes($resultList);
  }
}

// function to clear results page on viewSwap
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
// to swap views to home page search bar
$navbarIcon.addEventListener('click', function (event) {
  viewSwap('search');
});
