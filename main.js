const main = () => {
  const searchElement = document.querySelector('#searchElement');
  const buttonSearchElement = document.querySelector('#searchButtonElement');
  const mealListElement = document.querySelector('#mealList');

  const onButtonSearchClicked = async () => {
    try {
      const result = await DataSource.searchMeal(searchElement.value);
      renderResult(result);
    } catch (message) {
      fallbackResult(message);
    }
  };

  const renderResult = results => {
    mealListElement.innerHTML = '';

    results.forEach(meal => {
      const {strMeal, strMealThumb, strArea, strInstructions} = meal;
      const mealElement = document.createElement('div');
      mealElement.setAttribute('class', 'meal');

      mealElement.innerHTML = `
        <img class="fan-art-meal" src="${strMealThumb}" alt="Fan Art">
        <div class="meal-info">
          <h2>${strMeal}</h2>
          <h3>${strArea}</h3>
          <p>${strInstructions}</p>
        </div>
      `;

      mealListElement.appendChild(mealElement);
    });
  };

  const fallbackResult = message => {
    mealListElement.innerHTML = '';
    mealListElement.innerHTML += `<h2 class="placeholder">${message}</h2>`;
  };

  buttonSearchElement.addEventListener('click', onButtonSearchClicked);
};