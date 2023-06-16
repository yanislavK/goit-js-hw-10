import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelector = document.querySelector(`.breed-select`);
const catInfoContainer = document.querySelector('.cat-info');
const loading = document.querySelector(`.loader`);
const error = document.querySelector(`.error`);

const store = { breeds: null };

async function getAndUpdBreeds() {
  try {
    loading.style.display = `block`;
    error.style.display = `none`;
    const response = (await fetchBreeds()).filter(
      img => img.image?.url != null
    );
    loading.style.display = `none`;
    store.breeds = response;
    response.forEach((breed, index) => {
      let option = document.createElement('option');
      option.value = index;
      option.innerHTML = `${breed.name}`;
      breedSelector.appendChild(option);
    });
  } catch (error) {
    error.style.display = `block`;

    console.error(error);
  }
}

getAndUpdBreeds();

async function selectHandler(evt) {
  try {
    const { value } = evt.target;
    loading.style.display = `block`;
    error.style.display = `none`;
    const response = await fetchCatByBreed(store.breeds[value].id);
    loading.style.display = `none`;
    const wrapper = document.createElement(`div`);
    wrapper.style = `display:flex; gap:16px;`;
    const image = document.createElement(`img`);
    image.style = 'width:340px;';
    image.src = response[0].url;
    wrapper.appendChild(image);
    const textContent = document.createElement(`div`);
    textContent.style = `flex:1;`;
    const title = document.createElement(`h1`);
    title.innerHTML = store.breeds[value].name;
    textContent.appendChild(title);
    const description = document.createElement(`p`);
    description.innerHTML = store.breeds[value].description;
    textContent.appendChild(description);
    const temperament = document.createElement(`p`);
    temperament.innerHTML = `<strong>Temperament: </strong><span>${store.breeds[value].temperament}</span>`;
    textContent.appendChild(temperament);
    wrapper.appendChild(textContent);
    catInfoContainer.innerHTML = null;
    catInfoContainer.appendChild(wrapper);
  } catch (error) {
    error.style.display = `block`;
    console.error(error);
  }
}

breedSelector.addEventListener('change', selectHandler);

// test build
//dd
