import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

import Layout from '../components/Layout';
import PostList from '../components/PostList';
import Navigation from '../components/Navigation';

const TagTemplate = ({ pageContext, data, location }) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const { title } = data.site.siteMetadata;

  return (
    <Layout location={location}>
      <Helmet
        title={`Posts tagged under ${tag} - ${title}`}
        bodyAttributes={{
          class: 'tag-template',
        }}
      />
      <header className='site-header outer'>
        {/* {{#if feature_image}} */}
        {/* // style='background-image: url({{feature_image}}){{else}}no-cover{{/if}}'> */}
        <div className='inner'>
          <Navigation location={location} />
          <div className='site-header-content'>
            <h1 className='site-title'>{tag}</h1>
            <h2 className='site-description'>
              {tag.description ||
                `A collection of ${totalCount} post${
                  totalCount > 1 ? 's' : ''
                }`}
            </h2>
          </div>
        </div>
      </header>
      <PostList posts={edges} postsPerPage={10} />
    </Layout>
  );
};

export default TagTemplate;

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }

    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { tags: { in: [$tag] }, draft: { ne: true } } }
    ) {
      totalCount
      edges {
        node {
          ...PostCardFragment
        }
      }
    }
  }
`;
