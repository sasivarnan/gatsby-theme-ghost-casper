import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import GatsbyImage from 'gatsby-image';

import Layout from '../components/Layout';
import PostList from '../components/PostList';
import Navigation from '../components/Navigation';

import logo from '../assets/logo.png';

const Header = ({ siteMetadata, location, featuredImage }) => {
  return (
    <header className={`site-header outer ${featuredImage ? '' : 'no-cover'}`}>
      {featuredImage && (
        <GatsbyImage className='featured-image' fluid={featuredImage.fluid} />
      )}
      <div className='inner'>
        <div className='site-header-content'>
          <h1 className='site-title'>
            <img className='site-logo' src={logo} alt={siteMetadata.title} />
          </h1>
          <h2 className='site-description'>{siteMetadata.description}</h2>
        </div>
        <Navigation location={location} />
      </div>
    </header>
  );
};

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title'),
      postsPerPage = get(
        this,
        'props.data.site.siteMetadata.config.postsPerPage'
      ),
      siteDescription = get(this, 'props.data.site.siteMetadata.description'),
      posts = get(this, 'props.data.allMarkdownRemark.edges'),
      featuredImage = get(
        this,
        'props.data.featuredImage.edges[0].node.childImageSharp'
      );

    const location = this.props.location;

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={`${siteTitle} - ${siteDescription}`}
          bodyAttributes={{
            class: 'home-template',
          }}
        />
        <Header
          siteMetadata={this.props.data.site.siteMetadata}
          featuredImage={featuredImage}
          location={location}
        />
        <PostList posts={posts} postsPerPage={postsPerPage} />
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        config {
          postsPerPage
        }
      }
    }

    featuredImage: allFile(
      filter: {
        sourceInstanceName: { eq: "assets" }
        relativePath: { eq: "featured-image.jpg" }
      }
    ) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 1600, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }

    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      edges {
        node {
          ...PostCardFragment
        }
      }
    }
  }
`;
