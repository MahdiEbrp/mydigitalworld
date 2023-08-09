export type Book = {
    title: string;
    author: string;
    summary: string;
    genres: string[];
    cover: string;
    format: {
        pages: number;
        binding: string;
    };
    publicationDate: string;
    publisher: string;
    ISBN: {
        ISBN10: string;
        ISBN13: string;
    };
    language: string;
    setting: string;
    literaryAwards: string;
    quote: string;
};

export type BookList = {
    books: Book[];
};
