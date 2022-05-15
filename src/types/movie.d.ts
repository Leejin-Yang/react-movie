interface IMovieList {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface IMovieAPIRes {
  Search: IMovieList[];
  totalResults: string;
  Response: string;
  Error?: string;
}
