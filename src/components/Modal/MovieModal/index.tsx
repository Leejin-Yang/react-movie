import { useRecoilState } from 'recoil';
import styles from './MovieModal.module.scss';

import { favoriteMovieListState } from 'states/movie';
import { IMovieList } from 'types/movie';
import { handleImgError } from 'utils/image';
import DEFAULT_IMG from 'assets/img/default-movie.png';

interface Props {
  movie: IMovieList;
  onClose: () => void;
}

const ADD_FAVORITES = '즐겨찾기';
const DELETE_FAVORITES = '즐겨찾기 제거';
const CANCEL = '취소';

const MovieModal = ({ movie, onClose }: Props) => {
  const { Poster, Title, Year, Type, imdbID } = movie;
  const [favoriteMovieList, setFavoriteMovieList] = useRecoilState(favoriteMovieListState);

  const isFavorite = () => {
    return favoriteMovieList.find((item) => item.imdbID === imdbID);
  };

  const addMovie = () => {
    setFavoriteMovieList((prev) => {
      if (prev.find((item) => item.imdbID === imdbID)) return prev;

      return [...prev, movie];
    });
  };

  const deleteMovie = () => {
    setFavoriteMovieList((prev) => prev.filter((item) => item.imdbID !== imdbID));
  };

  const handleFavoriteButton = (e: { currentTarget: { name: string } }) => {
    const { name } = e.currentTarget;

    if (name === ADD_FAVORITES) {
      addMovie();
    } else if (name === DELETE_FAVORITES) {
      deleteMovie();
    }

    onClose();
  };

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
            <button type='button' name={isFavorite() ? DELETE_FAVORITES : ADD_FAVORITES} onClick={handleFavoriteButton}>
              {isFavorite() ? DELETE_FAVORITES : ADD_FAVORITES}
            </button>
            <button type='button' name={CANCEL} onClick={onClose}>
              {CANCEL}
            </button>
          </section>
        </main>
      </div>
    </>
  );
};

export default MovieModal;
