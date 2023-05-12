import axios from 'axios';

export const getImages = (imageName, page) => {
  const url = 'https://pixabay.com/api/';
  const KEY = '34367091-415fdde7ec5b95c0f515d26a0';
  const options = {
    params: {
      key: KEY,
      q: imageName,
      image_type: 'photo',
      orientation: 'horizontal',
      ID: 12345,
      page: page,
      per_page: 12,
    },
  };
  return axios.get(url, options);
};
