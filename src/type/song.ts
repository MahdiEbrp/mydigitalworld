export type Song = {
    artist: string;
    title: string;
    album: string;
    length: string;
    genres: string[];
    releaseDate: string;
    recordLabels: string[];
    writers: string[];
    awards: string;
    lyrics: string;
};
export type SongList = {
    songs: Song[];
};
