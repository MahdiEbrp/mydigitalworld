export type Movie = {
    title: string;
    imdbId: string;
    releaseYear: number;
    cast: { name: string; role: string; }[];
    plot: string;
    genre: string[];
    originalLanguage: string;
    director: string;
    writer: string;
    boxOfficeGrossUsa: string;
    budget: string;
    runtime: string;
    aspectRatio: string;
    rating: { imdb: string; rottenTomatoes: string; };
    awards: string;
    quote: string;
};

export type MovieList = {
    movies: Movie[];
};