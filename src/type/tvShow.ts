export type TVShow = {
    title: string;
    seasons: number;
    episodes: number;
    originalRelease: string;
    cast: {
        name: string;
        role: string;
    }[];
    plot: string;
    genre: string[];
    originalLanguage: string;
    director: string;
    writer: string;
    creator: string;
    runtime: string;
    aspectRatio: string;
    rating: {
        imdb: string;
        rottenTomatoes: string;
    };
    awards: string;
    network: string;
    quote: string;
};
export type TVShowList = {
    tvShows: TVShow[];
};

