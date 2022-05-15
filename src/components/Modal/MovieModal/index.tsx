import { useRecoilState } from 'recoil';
import styles from './MovieModal.module.scss';

import { favoriteMovieListState } from 'states/movie';
import { IMovieList } from 'types/movie.d';
import { FAVORITE_MOVIE_KEY, setLocalStorage } from 'services/store';

interface Props {
  movie: IMovieList;
  onClose: () => void;
}

const ADD_FAVORITES = '즐겨찾기';
const DELETE_FAVORITES = '즐겨찾기 제거';
const CANCEL = '취소';

export const MovieModal = ({ movie, onClose }: Props) => {
  const { Poster, Title, Year, Type, imdbID } = movie;
  const [favoriteMovieList, setFavoriteMovieList] = useRecoilState(favoriteMovieListState);

  const isFavorite = () => {
    return favoriteMovieList.find((item) => item.imdbID === imdbID);
  };

  const addMovie = () => {
    const newFavorites = isFavorite() ? favoriteMovieList : [...favoriteMovieList, movie];

    setFavoriteMovieList(newFavorites);
    setLocalStorage(FAVORITE_MOVIE_KEY, newFavorites);
  };

  const deleteMovie = () => {
    const newFavorites = favoriteMovieList.filter((item) => item.imdbID !== imdbID);

    setFavoriteMovieList(newFavorites);
    setLocalStorage(FAVORITE_MOVIE_KEY, newFavorites);
  };

  const handleFavoriteButton = async (e: { currentTarget: { name: string } }) => {
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
          <section
            className={styles.movie}
            style={{
              background: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 39%, rgba(0, 0, 0, 0) 41%, rgba(0, 0, 0, 65%) 100%), url(${Poster}), #1c1c1c`,
              backgroundSize: '100%, cover',
              backgroundPosition: 'center, center',
              backgroundRepeat: 'no-repeat',
            }}
          >
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
