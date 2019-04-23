import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

import Layout from '../components/Layout';
import PostList from '../components/PostList';
import Navigation from '../components/Navigation';
import Icons from '../components/Icons';
import { getSocialUrl } from '../utils/url';

const AuthorTemplate = ({ pageContext, data, location }) => {
  const { author } = pageContext;
  const { title, siteUrl } = data.site.siteMetadata;
  const { posts, navItems } = data;
  const { edges, totalCount } = posts;

  const postsByAuthor = edges.filter(
    post => post.node.frontmatter.author.id === author.id
  );

  return (
    <Layout location={location}>
      <Helmet
        title={`Posts By ${author.name} - ${title}`}
        bodyAttributes={{
          class: 'author-template',
        }}
      />
      <header className='site-header outer {{#if feature_image}}'>
        {/* // style='background-image: url({{feature_image}}){{else}}no-cover{{/if}}'> */}
        <div className='inner'>
          <Navigation location={location} navItems={navItems} />
          <div className='site-header-content'>
            {author.profileImage && (
              <img
                className='author-profile-image'
                src={author.profileImage}
                alt={author.name}
              />
            )}
            <h1 className='site-title'>{author.name}</h1>
            {author.bio && <h2 className='author-bio'>{author.bio}</h2>}
            {/* <h2 className='site-description'>
              {tag.description || `A collection of ${totalCount} post${totalCount > 1 ? 's' : ''}`}
            </h2> */}
            <div className='author-meta'>
              {author.location && (
                <div className='author-location'>
                  {author.location} <span className='bull'>&bull;</span>
                </div>
              )}
              <div className='author-stats'>
                {totalCount === 0
                  ? 'No posts'
                  : `${totalCount} post${totalCount > 1 ? 's' : ''}`}
                <span className='bull'>&bull;</span>
              </div>
              {author.website && (
                <a
                  className='social-link social-link-wb'
                  target='_blank'
                  rel='noreferrer noopener'
                  href={author.website}
                >
                  <Icons.website />
                </a>
              )}
              {author.twitter && (
                <a
                  className='social-link social-link-tw'
                  target='_blank'
                  rel='noreferrer noopener'
                  href={getSocialUrl('twitter', author.twitter)}
                >
                  <Icons.twitter />
                </a>
              )}
              {author.facebook && (
                <a
                  className='social-link social-link-fb'
                  target='_blank'
                  rel='noreferrer noopener'
                  href={getSocialUrl('facebook', author.facebook)}
                >
                  <Icons.facebook />
                </a>
              )}
              <a
                className='social-link social-link-rss'
                target='_blank'
                rel='noreferrer noopener'
                href={`https://feedly.com/i/subscription/feed/${siteUrl}/rss.xml`}
              >
                <Icons.rss />
              </a>
            </div>
          </div>
        </div>
      </header>
      <PostList posts={postsByAuthor} postsPerPage={10} />
    </Layout>
  );
};

export default AuthorTemplate;

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    navItems: allNavigationYaml {
      edges {
        node {
          label
          url
        }
      }
    }
    posts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { draft: { ne: true } } }
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
