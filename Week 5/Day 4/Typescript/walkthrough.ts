function getBeers() {
  return fetch("https://api.punkapi.com/v2/beers");
}

getBeers()
  .then((r) => r.json())
  .then((response) => {
    response.forEach((beer) => {
      console.log(beer.name);
    });
  });
