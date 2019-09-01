const path = require('path');

module.exports = themeOptions => ({
  siteMetadata: {
    title: 'Casper Theme Gatsby',
    author: 'Sasivarnan R',
    description: 'Ghost Casper theme for Gatsby',
    siteUrl: 'https://geekscreed.com',
    social: {
      twitter: '',
      facebook: '',
      instagram: '',
      github: '',
    },
    config: {
      postsPerPage: 10,
      disqus: '',
    },
  },
  pathPrefix: themeOptions.pathPrefix || '',
  mapping: {
    // "MarkdownRemark.frontmatter.tags": `TagsYaml`,
    'MarkdownRemark.frontmatter.author': `AuthorsYaml`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.resolve(`src/pages`),
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.resolve(`src/assets`),
        name: 'assets',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              showCaptions: true,
              maxWidth: 840,
              quality: 80,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.resolve(`./src/data/`),
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            query: `
          {
            allMarkdownRemark(
              limit: 1000,
              sort: {order: DESC, fields: [frontmatter___date]},
              filter: {frontmatter: {draft: {ne: true}}}
            ) {
              edges {
                node {
                  excerpt
                  html
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }
          }            
          `,
            title: themeOptions.title,
            output: `rss.xml`,
          },
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/assets`,
      },
    },
  ],
});
