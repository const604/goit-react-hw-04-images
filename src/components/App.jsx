import { useState, useEffect } from 'react';
import { getImages } from './services/Api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Modal from './Modal';
import Button from './Button';

export default function App() {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [render, setRender] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [page, setPage] = useState(1);

  const formSubmitHandler = imageName => {
    setImageName(imageName);
    setIsLoading(true);
    setImages([]);
    setPage(1);
  };

  useEffect(() => {
    if (!imageName) {
      return
    }
    async function fetchData() {
      try {
        const response = await getImages(imageName, page);
        setRender(true);
        setIsLoading(false);
        setImages(images.concat(response.data.hits));
        setIsLoadMore(true);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [imageName, page]);

  const toggleModal = largeImageURL => {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
  };

  const loadMoreBtn = () => {
    setPage(page + 1);
    setIsLoading(true);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: 16,
        paddingBottom: 24,
      }}
    >
      <Searchbar onFormSubmit={formSubmitHandler} />
      {render && <ImageGallery images={images} showModal={toggleModal} />}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={toggleModal} />
      )}
      {isLoading && <Loader />}
      {isLoadMore && <Button images={images} onClick={loadMoreBtn} />}
    </div>
  );
}
