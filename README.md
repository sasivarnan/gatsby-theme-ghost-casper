# gatsby-theme-ghost-casper

[Ghost Casper](https://github.com/tryghost/casper) theme for Gatsby blog.

### Usage

- Install the theme using `npm` or `yarn`

```bash
npm i --save gatsby react react-dom gatsby-theme-ghost-casper
```

or

```bash
yarn add gatsby react react-dom gatsby-theme-ghost-casper
```

- Create the following project structure for your website.

```
your-awesome-website
├── src
│   ├── assets
│   │   ├── featured-image.jpg
│   │   └── icon.png
│   ├── data
│   │   ├── authors.yml
│   │   ├── navigation.yml
│   │   └── tags.yml
│   ├── gatsby-theme-ghost-casper
│   │   ├── assets
│   │   │   └── logo.png
│   │   ├── src
│   │   └── style
│   │       └── override.css
│   ├── pages
│   │   ├── blog
│   │   │   ├── your-awesome-blog-post-title
│   │   │   │   ├── featured-image.jpg
│   │   │   │   └── index.md
│   │   └── about.js
├── static
│   └── CNAME
├── gatsby-browser.js
├── gatsby-config.js
├── package.json
└── README.MD
```

- In the `gatsby-config.js` file add the following changes

```js
module.exports = {
  siteMetadata: {
    title: '', // Site Title
    author: '', // Author of the website
    description: '', // Description for the website
    siteUrl: 'https://example.com', // Base URL of the website (No trailing slash)
    social: {
      // Social URLs of the website. Will be used to show in footer if provided
      twitter: '',
      facebook: '',
      instagram: '',
      github: '',
    },
    config: {
      postsPerPage: 10, // Number of posts to show per page
      disqus: '', // Disqus username. If provided, disqus comments section will be added on each posts page
    },
  },
  plugins: [
    {
      resolve: 'gatsby-theme-ghost-casper',
      options: {
        title: 'Your Site Title', // Required: used for the title of RSS feed
        pathPrefix: '', // path prefix for the website URL
      },
    },
    // Other plugins comes here
  ],
};
```

- Add the following content in `src/data/authors.yml` file to add the author information.

```yml
- id: username # unique username for the author. This will be used in the URL for the author page
  name: Name # Name of the author
  bio: Bio # Bio of the author
  location: Location # Location of the author
  website: https://authorswebsite.com # Website of the author
  twitter: twitter_username
  facebook: faceboon_username
  profileImage: https://avatars0.githubusercontent.com/u/AUTHOR # URL containing the author profile Image
  coverImage: # Cover Image to show in authors page
```

- The links shown in the header can be customized by adding them in `src/data/navigation.yml` file

```yml
- label: Home
  url: /

- label: About
  url: /about
```

- The theme supports creating blog posts using markdown files. You can start adding your first page by creating a file at `src/pages/<YOUR-AWESOME-PATH>/index.md` with the following content.

```md
---

title: Your Awesome Title <!-- Title of the post -->
date: '2019-07-07' <!-- Date of the post in which it is published -->
tags: ['tag1', 'tag2'] <!-- A new page will be created for each tag listing all the posts associated with that tags -->
author: username <!-- id of the author that we defined in authors.yaml file  -->
featuredImage: ./welcome.jpg <!-- relative path of the image that used to show as featured Image  -->
draft: false <!-- Set it as true to skip this page during the production build.  -->

---

Your Awesome Blog Content
```

- To set sitewide featured image, place a file named `featured-image.jpeg` and the theme will pick it up.
- To change the site logo, place your logo file as PNG named as `logo.png` in the `src/gatsby-theme-ghost-casper/assets/` directory.
- Now run `npm run develop` or `yarn run develop` to start development. Happy Blogging. 😇

## Example Site

- GeeksCreed - [Source](https://github.com/geekscreed/geekscreed.com/), [Demo](https://geekscreed.com/)

For detailed usage of gatsby themes, refer [themes documentation](https://www.gatsbyjs.org/docs/themes/) of Gatsby.

## Copyright & License

Copyright (c) 2013-2019 Ghost Foundation / Sasivarnan R - Released under the [MIT license](LICENSE).
