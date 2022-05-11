import styles from './MovieItem.module.scss';

import { IMovieList } from 'types/movie.d';

interface Props {
  movie: IMovieList;
}

const MovieItem = ({ movie }: Props) => {
  const { Poster, Title, Year, Type } = movie;

  return (
    <li className={styles.movieItem}>
      <img src={Poster} alt={Title} className={styles.moviePoster} />
      <div className={styles.movieInfo}>
        <span>{Title}</span>
        <span>{Year}</span>
        <span>{Type}</span>
      </div>
    </li>
  );
};

export default MovieItem;
