const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve('./src/templates/blog-post.js'),
      tagTemplate = path.resolve('./src/templates/tags.js'),
      authorTemplate = path.resolve('./src/templates/author.js');

    resolve(
      graphql(
        `{
          allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}, limit: 1000) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                  tags
                }
                excerpt
                timeToRead
              }
            }
          }
          authors: allAuthorsYaml {
            edges {
              node {
                name
                bio
                location
                profileImage
                twitter
                facebook
                website
                id
              }
            }
          }
        }`
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges;
        const authors = result.data.authors.edges;
        let allTags = [];

        _.each(posts, (post, index) => {
          const previous = index === posts.length - 1 ? null : posts[index + 1].node;
          const next = index === 0 ? null : posts[index - 1].node;
          const tags = post.node.frontmatter.tags;

          createPage({
            path: post.node.fields.slug,
            component: blogPostTemplate,
            context: {
              slug: post.node.fields.slug,
              primaryTag: tags ? tags[0] : '',
              previous,
              next,
            },
          })

          allTags = allTags.concat(tags);
        })

        // Create Tag pages
        allTags = _.uniq(allTags);

        allTags.forEach(tag => {
          createPage({
            path: `/tag/${_.kebabCase(tag)}/`,
            component: tagTemplate,
            context: {
              tag
            }
          })
        })

        // Create Author pages.
        authors.forEach(obj => {
          const author = obj.node;
          createPage({
            path: `/author/${_.kebabCase(author.id)}/`,
            component: authorTemplate,
            context: {
              author
            }
          })
        })

      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
