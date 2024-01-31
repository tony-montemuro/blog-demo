# Markdown Blog Demo

This was a fun web application I decided to build as preparation for a job interview. I want to learn PHP, as well as practice my React, so I decided that building a Laravel + React application was the best approach.

While I have about two years of experience writing React applications, PHP is a brand new experience for me, so forgive me for any questionable code. Overall, though, PHP pleasantly surprised me! In particular, Laravel was a great experience: great docs, fairly straightforward to setup and run.

I have always wanted a personal blog, so perhaps in the future I can use this code as a reference.

## About this Application

This application does not have too many bells and whistles, as it was mostly just created so that I could get familiar with Laravel and PHP: the React part was mostly just for practice.

**DISCLAIMER:** I used [this video tutorial](https://youtu.be/qJq9ZMB2Was) to get setup. Some of the React code, and most of the CSS, *is not my own!* However, I would say most of everything else is my own work.

### User Authentication

This application requires user's to sign up to view and post blogs:

**Login Screen:**
![Login Screen](https://i.imgur.com/TfbOb9h.png)

**Signup Screen:**
![Signup Screen](https://i.imgur.com/IgRqNhc.png)

User authentication is surprisingly straightforward in Laravel. Who would have thought?

### Blogs

Once you have logged in, you will gain access to the blogs. Immediately, you load onto this page:

**Home Page:**
![Home Page](https://i.imgur.com/OFmVHCu.png)

As you can see, this page renders a few things:

- Simple navigation bar
- A list of blogs to select from and open
- Buttons to create new blogs, and delete blogs belonging to the authenticated user

When you select a blog, you are able to see the contents of the blog in a new window.

**Blog Page:**
![Blog Page](https://i.imgur.com/qNaqn6L.png)

If, instead, you opt to create a blog post by selecting the `Upload Blog` button, you arrive at a window to write your markdown blog. 

**Create Post Page:**
![Create Post Page](https://i.imgur.com/PhkNKro.png)

Overall, I am relatively happy with this as a demo! Eventually, I will have to setup a personal blog.

## Running Locally

In order to run this application locally, you will need to setup development servers for both the frontend and backend.

Before you can get started, you will need to clone the repository to your machine. Navigate to your working directory, and run this command:

```bash
git clone https://github.com/tony-montemuro/blog-demo.git
```

Once this has finished, run:

```bash
cd blog-demo
```

### Backend Server Setup

**Note:** Before you begin, you must have the following software installed:

- [PHP](https://www.php.net/downloads.php)
- [Composer](https://getcomposer.org/download/)
- [SQLite](https://www.sqlite.org/download.html)

Begin at the root of the project directory. Once you have installed this software, begin:

1. Install dependencies, by running:

    ```bash
    composer install
    ```

2. Next, setup your `.env` file, by running:

    ```bash
    cp .env.example .env
    ```

3. Generate your Laravel application key, by running:

    ```bash
    php artisan key:generate
    ```

4. Perform database migrations, by running:

    ```bash
    php artisan migrate
    ```

    When prompted to create the SQLite database, select `Yes`.

5. Finally, begin your backend developer server, by running:

    ```bash
    php artisan serve
    ```

    The application should be accessible at `http://localhost:8000`.

### Frontend Server Setup

**Note:** Before you begin, you must have the following software installed:

- [Node.js](https://nodejs.org/en)

Begin at the root of the project directory. Once you have installed this software, begin:

1. Navigate to the client directory by running:

    ```bash
    cd react
    ```

2. The application code is dependent on a number of `npm` packages. To install them, run:

    ```
    npm i
    ```

3. Next, setup your `.env` file, by running:

    ```bash
    cp .env.example .env
    ```

4. Finally, begin your frontend developer server, by running:

    ```bash
    npm run dev
    ```

    The application should be accessible at `http://localhost:3000`.