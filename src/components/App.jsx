import { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Modal from './Modal';
import Button from './Button';

// axios.defaults.baseURL = 'https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12';

class App extends Component {
  state = {
    images: [],
    isLoading: false,
    showModal: false,
    isLoadMore: false,
    largeImageURL: '',
    page: 1,
  };

  formSubmitHandler = imageName => {
    this.setState({ imageName, isLoading: true, images: [], page: 1 });
  };

  async componentDidUpdate(prevProps, prevState) {
    const url = 'https://pixabay.com/api/';
    const KEY = '34367091-415fdde7ec5b95c0f515d26a0';
    const options = {
      params: {
        key: KEY,
        q: this.state.imageName,
        image_type: 'photo',
        orientation: 'horizontal',
        ID: 12345,
        page: this.state.page,
        per_page: 12,
      },
    };

    if (
      prevState.imageName !== this.state.imageName ||
      prevState.page !== this.state.page
    ) {
      try {
        const response = await axios.get(url, options);
        this.setState(prevState => {
          return {
            isLoading: false,
            images: prevState.images.concat(response.data.hits),
            isLoadMore: true,
          };
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: largeImageURL,
    }));
  };

  LoadMoreBtn = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1, isLoading: true };
    });
  };

  render() {
    const { showModal, images, isLoading, largeImageURL, isLoadMore } =
      this.state;
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: 16,
          paddingBottom: 24,
        }}
      >
        <Searchbar onFormSubmit={this.formSubmitHandler} />
        <ImageGallery images={images} showModal={this.toggleModal} />
        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.toggleModal} />
        )}
        {isLoading && <Loader />}
        {isLoadMore && <Button images={images} onClick={this.LoadMoreBtn} />}
      </div>
    );
  }
}

export default App;
