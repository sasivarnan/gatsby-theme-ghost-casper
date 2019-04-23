import React from 'react';
import { Link, withPrefix, StaticQuery, graphql } from 'gatsby';
import Icons from './Icons';

import logo from '../assets/logo.png';

const Navigation = ({ location }) => (
  <StaticQuery
    query={graphql`
      {
        navItems: allNavigationYaml {
          edges {
            node {
              label
              url
            }
          }
        }
        site {
          siteMetadata {
            title
            siteUrl
            social {
              facebook
              twitter
            }
          }
        }
      }
    `}
    render={({ navItems, site }) => {
      const isHomepage = location.pathname === withPrefix('/'),
        siteMetadata = site.siteMetadata;
      return (
        <nav className='site-nav'>
          <div className='site-nav-left'>
            {!isHomepage && (
              <Link className='site-nav-logo' to={'/'}>
                <img src={logo} alt={siteMetadata.title} />
              </Link>
            )}
            <ul className='nav' role='menu'>
              {navItems.edges.map(({ node }, index) => {
                const isCurrent = withPrefix(node.slug) === location.pathname;
                return (
                  <li
                    className={isCurrent ? 'nav-current' : ''}
                    key={index}
                    role='menuitem'
                  >
                    <Link to={node.url}>{node.label}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className='site-nav-right'>
            <div className='social-links'>
              {siteMetadata.social.facebook && (
                <a
                  className='social-link social-link-fb'
                  target='_blank'
                  rel='noopener noreferrer'
                  href={`https://facebook.com/${siteMetadata.social.facebook}`}
                >
                  <Icons.facebook />
                </a>
              )}
              {siteMetadata.social.twitter && (
                <a
                  className='social-link social-link-tw'
                  target='_blank'
                  rel='noopener noreferrer'
                  href={`https://twitter.com/${siteMetadata.social.twitter}`}
                >
                  <Icons.twitter />
                </a>
              )}
            </div>
            {/* <a className='subscribe-button' href='#subscribe'>Subscribe</a> */}
            <a
              className='rss-button'
              target='_blank'
              rel='noopener noreferrer'
              href={`https://feedly.com/i/subscription/feed/${
                siteMetadata.siteUrl
              }/rss.xml`}
            >
              <Icons.rss />
            </a>
          </div>
        </nav>
      );
    }}
  />
);

export default Navigation;
