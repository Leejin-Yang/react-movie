import styles from './MovieItem.module.scss';

import { IMovieList } from 'types/movie.d';
import DEFAULT_IMG from 'assets/img/default-movie.png';

interface Props {
  movie: IMovieList;
}

const MovieItem = ({ movie }: Props) => {
  const { Poster, Title, Year, Type } = movie;

  const handleImgError = (e: { currentTarget: { src: string } }) => {
    e.currentTarget.src = DEFAULT_IMG;
  };

  return (
    <li className={styles.movieItem}>
      <img src={Poster} alt={Title} className={styles.moviePoster} onError={handleImgError} />
      <div className={styles.movieInfo}>
        <span>{Title}</span>
        <span>{Year}</span>
        <span>{Type}</span>
      </div>
    </li>
  );
};

export default MovieItem;
