const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const _ = require('lodash');
const { createFilePath } = require('gatsby-source-filesystem');

// Make sure the data directory exists
exports.onPreBootstrap = ({ store, reporter }) => {
  const { program } = store.getState();

  const dirs = [
    path.join(program.directory, 'src/pages'),
    path.join(program.directory, 'src/data'),
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      reporter.info(`creating the ${dir} directory`);
      mkdirp(dir);
    }
  });
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const blogPostTemplate = require.resolve('./src/templates/blog-post.js'),
    tagTemplate = require.resolve('./src/templates/tags.js'),
    authorTemplate = require.resolve('./src/templates/author.js');

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        ${
          process.env.NODE_ENV === 'production'
            ? 'filter: {frontmatter: {draft: {ne: true}}}'
            : ''
        }
        limit: 1000
      ) {
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
    }
  `);

  if (result.errors) {
    reporter.panic('Error getting page data', result.errors);
    return;
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges;
  const authors = result.data.authors.edges;
  let allTags = [];

  _.each(posts, (post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;
    const { tags } = post.node.frontmatter;

    const context = {
      slug: post.node.fields.slug,
      primaryTag: tags ? tags[0] : '',
      previous: _.get(previous, 'fields.slug', ''),
      next: _.get(next, 'fields.slug', ''),
    };

    createPage({
      path: post.node.fields.slug,
      component: blogPostTemplate,
      context,
    });

    allTags = allTags.concat(tags);
  });

  // Create Tag pages
  allTags = _.uniq(allTags);

  allTags.forEach(tag => {
    createPage({
      path: `/tag/${_.kebabCase(tag)}/`,
      component: tagTemplate,
      context: {
        tag,
      },
    });
  });

  // Create Author pages.
  authors.forEach(obj => {
    const author = obj.node;
    createPage({
      path: `/author/${_.kebabCase(author.id)}/`,
      component: authorTemplate,
      context: {
        author,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
