import { Component } from 'react';
import { getImages } from './services/Api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Modal from './Modal';
import Button from './Button';

class App extends Component {
  state = {
    images: [],
    render: false,
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

    if (
      prevState.imageName !== this.state.imageName ||
      prevState.page !== this.state.page
    ) {
      try {
        const response = await getImages(this.state.page, this.state.imageName);
        this.setState(prevState => {
          return {
            render: true,
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

  loadMoreBtn = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1, isLoading: true };
    });
  };

  render() {
    const { showModal, images, render, isLoading, largeImageURL, isLoadMore } =
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
        {render && (
          <ImageGallery images={images} showModal={this.toggleModal} />
        )}
        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.toggleModal} />
        )}
        {isLoading && <Loader />}
        {isLoadMore && <Button images={images} onClick={this.loadMoreBtn} />}
      </div>
    );
  }
}

export default App;
