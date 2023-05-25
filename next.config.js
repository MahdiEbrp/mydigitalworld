/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "covers.openlibrary.org",
      "avatars.githubusercontent.com",
      "*.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
