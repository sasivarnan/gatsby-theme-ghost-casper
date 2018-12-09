import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby';
import Helmet from "react-helmet";

import Layout from '../components/Layout';
import logo from '../assets/logo.png'
import PostCard from '../components/PostCard';

const NotFoundPage = ({ location }) => (
  <Layout location={location} hideFooter>

    <Helmet>
      <body className='error-template' />
    </Helmet>

    <div className='site-wrapper'>

      <header className='site-header outer'>
        <div className='inner'>
          <nav className='site-nav-center'>
            <Link className='site-nav-logo' to={'/'}><img src={logo} alt='GeeksCreed' /></Link>
          </nav>
        </div>
      </header>

      <main id='site-main' className='site-main outer'>
        <div className='inner'>
          <section className='error-message'>
            <h1 className='error-code'>404</h1>
            <p className='error-description'>Page Not Found</p>
            <Link className='error-link' to={'/'}>Go to the front page →</Link>
          </section>
        </div>
      </main>

      <StaticQuery
        query={graphql`{
          posts : allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC } , limit: 3) {
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
        }`
        }
        render={data => {
          const posts = data.posts.edges;
          return (
            <aside class="outer">
              <div class="inner">
                <div class="post-feed">
                  {posts && posts.map((post, index) => <PostCard key={index} post={post.node} />)}
                </div>
              </div>
            </aside>
          )
        }
        }
      />
    </div>
  </Layout>
)

export default NotFoundPage
