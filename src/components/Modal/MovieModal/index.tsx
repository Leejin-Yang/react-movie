import styles from './MovieModal.module.scss';

import { IMovieList } from 'types/movie';
import { handleImgError } from 'utils/image';
import DEFAULT_IMG from 'assets/img/default-movie.png';

interface Props {
  movie: IMovieList;
  onClose: () => void;
}

const ADD_FAVORITES = '즐겨찾기 추가';
const CANCEL = '취소';

const MovieModal = ({ movie, onClose }: Props) => {
  const { Poster, Title, Year, Type } = movie;

  return (
    <>
      <button type='button' className={styles.background} onClick={onClose} aria-label='hidden' />
      <div className={styles.modalContainer}>
        <main className={styles.modal}>
          <section className={styles.movie}>
            <img
              src={Poster}
              alt={Title}
              className={styles.moviePoster}
              onError={(e) => handleImgError(e, DEFAULT_IMG)}
            />
            <p className={styles.movieTitle}>{Title}</p>
            <div className={styles.movieInfo}>
              <p>
                <strong>Year</strong>
                <br />
                {Year}
              </p>
              <p>
                <strong>Type</strong>
                <br />
                {Type}
              </p>
            </div>
          </section>
          <section className={styles.buttons}>
            <button type='button'>{ADD_FAVORITES}</button>
            <button type='button' onClick={onClose}>
              {CANCEL}
            </button>
          </section>
        </main>
      </div>
    </>
  );
};

export default MovieModal;
