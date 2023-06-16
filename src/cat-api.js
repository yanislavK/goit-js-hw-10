const baseUrl = `https://api.thecatapi.com/v1`;

const breedsUrl = `${baseUrl}/breeds`;

const api_key =
  'live_NxGLi8FWn8k1hltrjCukr33VwfMjLE2OPv6AHvAYi5KyY2XSsAKqSoCh8T7CqgSv';

const options = {
  headers: {
    'x-api-key': api_key,
  },
};

export function fetchBreeds() {
  return fetch(breedsUrl, options).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function fetchCatByBreed(id) {
  return fetch(`${baseUrl}/images/search?breeds_ids=${id}`, options).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}
