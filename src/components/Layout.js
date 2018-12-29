import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet';
import { getSocialUrl } from '../utils/url';

import '../style/screen.css';
import '../style/override.css';

class Template extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentYear: new Date().getFullYear()
    }
  }

  render() {
    const { location, children, hideFooter } = this.props
    const rootPath = `${__PATH_PREFIX__}/`;
    let bodyClass = '';

    if (location.pathname === rootPath) {
      bodyClass = 'home-template';
    } else {
      bodyClass = 'post-template';
    }

    return (
      <div className='site-wrapper'>
        {/* {body_class} {block ' special_body_class' */}
        <Helmet
          htmlAttributes={{ lang: 'en' }}>
          <meta name='HandheldFriendly' content='True' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          <meta name="google-site-verification" content="0isBkVPgrb620vKytYay4gERqtdp8kDEqa5g7DZbyQ8" />
          {/* <link rel='stylesheet' href='https://cloud.typography.com/6076934/6331992/css/fonts.css' /> */}
          <body className={bodyClass} />
        </Helmet>

        {children}

        {
          !hideFooter &&
          <StaticQuery
            query={graphql`
            {
              site {
                siteMetadata {
                  title
                  social {
                    facebook
                    twitter
                  }
                }
              }
            }          
          `
            }
            render={data => {
              const { title, social } = data.site.siteMetadata;
              const { facebook, twitter } = social;
              return (
                <footer className='site-footer outer'>
                  <div className='site-footer-content inner'>
                    <section className='copyright'>
                      <a href='/'> {title} </a> &copy; {this.state.currentYear}
                    </section>
                    <nav className='site-footer-nav'>
                      <Link to='/'>Latest Posts</Link>
                      <a href={getSocialUrl('facebook', facebook)} target='_blank' rel='noopener'>Facebook</a>
                      <a href={getSocialUrl('twitter', twitter)} target='_blank' rel='noopener'>Twitter</a>
                      <a href='https://ghost.org' target='_blank' rel='noopener'>Theme By Ghost</a>
                      <a href='https://gatsbyjs.org' target='_blank' rel='noopener'>Powered By Gatsby</a>
                    </nav>
                  </div>
                </footer>
              )
            }
            }
          />
        }
      </div>
    )
  }
}

export default Template;