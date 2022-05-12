import MovieItem from './MovieItem';
import { IMovieList } from 'types/movie';

interface Props {
  movieList: IMovieList[];
}

const MovieList = ({ movieList }: Props) => {
  return (
    <ul>
      {movieList.map((movie, index) => {
        const key = `${movie.imdbID}-${index}`;
        return <MovieItem key={key} movie={movie} />;
      })}
    </ul>
  );
};

export default MovieList;
