import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { getSocialUrl } from '../utils/url';

import '../style/screen.css';
import '../style/style.css';
import '../style/override.css';

class Template extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentYear: new Date().getFullYear(),
    };
  }

  render() {
    const { location, children, hideFooter } = this.props;

    return (
      <div className='site-wrapper'>
        {/* {body_class} {block ' special_body_class' */}
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[
            { name: 'HandheldFriendly', content: 'True' },
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1.0',
            },
            {
              name: 'google-site-verification',
              content: '0isBkVPgrb620vKytYay4gERqtdp8kDEqa5g7DZbyQ8',
            },
          ]}
          link={[{ rel: 'canonical', href: location.href }]}
        />

        {children}

        {!hideFooter && (
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
            `}
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
                      <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href={getSocialUrl('facebook', facebook)}
                      >
                        Facebook
                      </a>
                      <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href={getSocialUrl('twitter', twitter)}
                      >
                        Twitter
                      </a>
                      <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href='https://ghost.org'
                      >
                        Theme By Ghost
                      </a>
                      <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href='https://gatsbyjs.org'
                      >
                        Powered By Gatsby
                      </a>
                    </nav>
                  </div>
                </footer>
              );
            }}
          />
        )}
      </div>
    );
  }
}

export default Template;
