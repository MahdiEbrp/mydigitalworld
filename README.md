# My Personal Website Project

This repository contains the code and configuration files for my personal website. The website showcases my portfolio, blog posts, and other information about me. It is built using Next.js, and the data is stored in a PostgreSQL database with Prisma as the ORM.

## Environment Variables

To set up this project, you'll need to define the following environment variables in your preferred deployment method or development environment:

### PostgreSQL Configuration

- `POSTGRES_URL`: The URL for the main PostgreSQL database.
- `POSTGRES_PRISMA_URL`: The URL for the Prisma client to connect to the PostgreSQL database.
- `POSTGRES_URL_NON_POOLING`: The URL for a non-pooling connection to the PostgreSQL database.

### User Configuration

- `SUPERUSER_EMAIL`: The email address of the superuser/administrator.

### Next.js Configuration

- `NEXTAUTH_URL`: The URL for the Next.js authentication system.
- `NEXT_PUBLIC_HOST`: The public host URL for the Next.js application.

### GitHub Authentication

- `GITHUB_ID`: The client ID for GitHub OAuth.
- `GITHUB_SECRET`: The client secret for GitHub OAuth.

### Google Authentication

- `GOOGLE_ID`: The client ID for Google OAuth.
- `GOOGLE_SECRET`: The client secret for Google OAuth.

### JWT Secret

- `JWT_SECRET`: The secret key used for JSON Web Token (JWT) encryption.

Make sure to provide appropriate values for these environment variables before running the application.

## Development

To run the website locally, you can follow these steps:

1. Clone this repository to your local machine.
2. Install the required dependencies using your preferred package manager (e.g., npm or yarn).
3. Set up the necessary environment variables as mentioned above.
4. Run the development server using the provided scripts.

Feel free to explore the code and make any contributions or improvements. I appreciate any feedback or suggestions you may have!

## License

This project is licensed under the [MIT License](LICENSE), so feel free to fork, modify, and use it as you see fit.

Thank you for visiting my personal website repository!

