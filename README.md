# Movie Web

## Description
Movie Web is a full-stack web application that allows users to browse and watch movies. Users can filter movies by genre or country and post comments after registering. Administrators can manage the movie database, including adding, editing, or deleting movies and updating thumbnails and descriptions.

The project integrates Redis for caching movie data to enhance performance, is containerized using Docker, and includes a basic CI/CD pipeline with Jenkins for automated build and deployment.

## Features

### User
- Browse movies by genre or country
- View movie details and watch trailers
- Post comments on movies (requires login)

### Admin
- Add new movies
- Edit movie names, descriptions, and thumbnail images
- Delete movies
- Access secured admin panel with authentication

## Technologies Used
- Backend: Spring Boot, Spring Security, Spring Data JPA
- Frontend: Angular, Typescript, Tailwind.
- Database: MS SQL Server
- Cache: Redis
- Containerization: Docker
- CI/CD: Jenkins

## Screenshots

### Home Page
![Home page](https://res.cloudinary.com/dwhlihfnn/image/upload/v1754494878/524d30ffb84b3115685a_cok67f.jpg)

### Movie Details
![Movie details](https://res.cloudinary.com/dwhlihfnn/image/upload/v1754495708/5567b04201f688a8d1e7_e7xeps.jpg)

