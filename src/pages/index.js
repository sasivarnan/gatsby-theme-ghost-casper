import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import PostList from '../components/PostList'
import Navigation from '../components/Navigation';

import logo from '../assets/logo.png';

const Header = ({ siteMetadata, location }) => (
  <header className='site-header outer {{#if @blog.cover_image}}'>
    {/* // style='background-image: url({{@blog.cover_image}}){{else}}no-cover{{/if}}'> */}
    <div className='inner'>
      <div className='site-header-content'>
        <h1 className='site-title'>
          {/* TODO */}
          {logo ?
            <img className='site-logo' src={logo} alt={siteMetadata.title} />
            : siteMetadata.title
          }
        </h1>
        <h2 className='site-description'>{siteMetadata.description}</h2>
      </div>
      <Navigation location={location} />
    </div>
  </header>
);

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )
    const posts = get(this, 'props.data.allMarkdownRemark.edges')
    const location = this.props.location

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
        />
        <Header siteMetadata={this.props.data.site.siteMetadata} location={location} />
        <PostList posts={posts} postsPerPage={10} />
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            featuredImage { 
              childImageSharp {
                fluid(maxWidth: 3720) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          timeToRead
        }
      }
    }
  }
`
