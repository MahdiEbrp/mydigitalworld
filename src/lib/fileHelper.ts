import fs from 'fs';
import path from 'path';

const getMarkdownSlugs = () => {
    const cwd = process.cwd();
    const folderPath = path.join(cwd, '/posts/');
    const fileNames = fs.readdirSync(folderPath);
    const markdownFileNames = fileNames.filter(fileName => fileName.endsWith('.md'));
    const slugs = markdownFileNames.map(fileName => fileName.slice(0, -3));

    return slugs;
};
export const getThumbnails = () => {
    const cwd = process.cwd();
    const folderPath = path.join(cwd, '/public/images/blog');
    const fileNames = fs.readdirSync(folderPath);
    const markdownFileNames = fileNames.filter(fileName => fileName.endsWith('.jpg'));
    const slugs = markdownFileNames.map(fileName => fileName.slice(0, -4));

    return slugs;
};

export const getPostContentBySlug = (slug: string): string => {
    const cwd = process.cwd();
    const postsFolderPath = path.join(cwd, '/posts/');
    const postFilePath = `${postsFolderPath}${slug}.md`;
    const content = fs.readFileSync(postFilePath, 'utf8');

    return content;
};

export default getMarkdownSlugs;
