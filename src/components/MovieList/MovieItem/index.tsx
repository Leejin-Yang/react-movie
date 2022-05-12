import { useState } from 'react';
import styles from './MovieItem.module.scss';

import ModalPortal from 'components/Modal/modalPortal';
import { MovieModal } from 'components/Modal';

import { IMovieList } from 'types/movie.d';
import { handleImgError } from 'utils/image';
import DEFAULT_IMG from 'assets/img/default-movie.png';

interface Props {
  movie: IMovieList;
}

const MovieItem = ({ movie }: Props) => {
  const { Poster, Title, Year, Type } = movie;
  const [movieModal, setMovieModal] = useState<boolean>(false);

  const handleModalOpen = () => {
    setMovieModal(true);
  };

  const handleModalClose = () => {
    setMovieModal(false);
  };

  return (
    <>
      <li className={styles.movieItem}>
        <button type='button' onClick={handleModalOpen}>
          <img
            src={Poster}
            alt={Title}
            className={styles.moviePoster}
            onError={(e) => handleImgError(e, DEFAULT_IMG)}
          />
          <div className={styles.movieInfo}>
            <span>{Title}</span>
            <span>{Year}</span>
            <span>{Type}</span>
          </div>
        </button>
      </li>
      {movieModal && (
        <ModalPortal>
          <MovieModal onClose={handleModalClose} movie={movie} />
        </ModalPortal>
      )}
    </>
  );
};

export default MovieItem;
