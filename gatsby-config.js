module.exports = {
  siteMetadata: {
    title: 'GeeksCreed',
    author: 'Sasivarnan R',
    description: 'Blog for Geeks and Hobbyists',
    siteUrl: 'https://geekscreed.com/',
    cover_image: '',
    social: {
      twitter: 'g33kscr33d',
      facebook: 'g33kscr33d',
      instagram: 'g33kscr33d',
      github: 'GeeksCreed'
    },
    config: {
      postsPerPage: 10,
    }
  },
  // pathPrefix: '/geekscreed.com',
  mapping: {
    // "MarkdownRemark.frontmatter.tags": `TagsYaml`,
    "MarkdownRemark.frontmatter.author": `AuthorsYaml`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              showCaptions: true
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
        path: `./src/data/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    ...(
      process.env.NODE_ENV === 'production' ? [
        {
          resolve: "gatsby-plugin-guess-js",
          options: {
            // Find the view id in the GA admin in a section labeled "views"
            GAViewID: `184855678`,
            minimumThreshold: 0.03,
            // The "period" for fetching analytic data.
            period: {
              startDate: new Date("2018-12-1"),
              endDate: new Date(),
            },
          },
        },
        {
          resolve: `gatsby-plugin-google-analytics`,
          options: {
            trackingId: `UA-129019237-1`,
          },
        },
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
                output: `rss.xml`
              },
            ]
          }
        },
      ] : []
    ),
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GeeksCreed Tech Blog`,
        short_name: `GeeksCreed`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-postcss'
  ],
}
