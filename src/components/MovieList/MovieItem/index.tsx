import { useState } from 'react';
import styles from './MovieItem.module.scss';

import ModalPortal from 'components/Modal/modalPortal';
import { MovieModal } from 'components/Modal';

import { cx } from 'styles';
import { FAVORITE_MOVIE_KEY, getLocalStorage } from 'services/store';
import { IMovieList } from 'types/movie.d';
import { handleImgError } from 'utils/image';
import { FavoriteIcon } from 'assets/svgs';
import DEFAULT_IMG from 'assets/img/default-movie.png';

interface Props {
  movie: IMovieList;
}

const MovieItem = ({ movie }: Props) => {
  const { Poster, Title, Year, Type, imdbID } = movie;
  const [movieModal, setMovieModal] = useState<boolean>(false);
  const favoriteMovieList = getLocalStorage(FAVORITE_MOVIE_KEY) || [];

  const isFavorite = () => {
    return favoriteMovieList.find((item: IMovieList) => item.imdbID === imdbID);
  };

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
          <dl className={styles.movieInfo}>
            <dt>{Title}</dt>
            <dd>{Year}</dd>
            <dd>{Type}</dd>
          </dl>
          <FavoriteIcon className={cx({ [styles.favorite]: isFavorite() })} />
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
