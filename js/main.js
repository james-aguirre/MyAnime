// global dom variables
const $form = document.querySelector('form');

// search button eventlistener/function
$form.addEventListener('submit', function (event) {
  event.preventDefault();
  const $search = event.target.elements.search.value;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://api.jikan.moe/v4/anime?limit=5&q=${$search}&rating=tv`);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
  //   console.log('xhr status', xhr.status);
  //   console.log('xhr response: ', xhr.response);
  });
  xhr.send();
});

// const xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://api.jikan.moe/v4/anime?limit=5&q=naruto&rating=tv');
// xhr.responseType = 'json';
// xhr.addEventListener('load', function () {
//   console.log('xhr status: ', xhr.status);
//   console.log('xhr response: ', xhr.response);
//   for (let i = 0; i < xhr.response.length; i++) {
//     const $li = document.createElement('li');
//     $li.textContent = xhr.response[i].name;
//     $list.appendChild($li);
//   }
// });
// xhr.send();
