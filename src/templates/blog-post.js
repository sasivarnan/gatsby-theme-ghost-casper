import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import { DiscussionEmbed } from 'disqus-react';
import Image from 'gatsby-image';
import get from 'lodash/get';

import Author from '../components/Author';
import Navigation from '../components/Navigation';
import Layout from '../components/Layout';
import Icons from '../components/Icons';
import RelatedPosts from '../components/RelatedPosts';
import logo from '../assets/logo.png';

/* eslint-disable jsx-a11y/anchor-is-valid */
class BlogPostTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.progressBarRef = React.createRef();
    this.headerRef = React.createRef();
    this.titleRef = React.createRef();

    this.rafTicking = false;
    this.rafInProgress = null;
  }

  onScroll = () => {
    this.lastScrollY = window.scrollY;
    this.requestTick();
  };

  onResize = () => {
    this.lastWindowHeight = window.innerHeight;
    this.lastDocumentHeight = document.documentElement.offsetHeight;
    this.requestTick();
  };

  requestTick = () => {
    if (!this.rafTicking) {
      this.rafInProgress = requestAnimationFrame(this.update);
    }
    this.rafTicking = true;
  };

  update = () => {
    var trigger =
      this.titleRef.current.getBoundingClientRect().top + window.scrollY;
    var triggerOffset = this.titleRef.current.offsetHeight + 35;
    var progressMax = this.lastDocumentHeight - this.lastWindowHeight;

    // show/hide floating header
    if (this.lastScrollY >= trigger + triggerOffset) {
      this.headerRef.current.classList.add('floating-active');
    } else {
      this.headerRef.current.classList.remove('floating-active');
    }

    this.progressBarRef.current.setAttribute('max', progressMax);
    this.progressBarRef.current.setAttribute('value', this.lastScrollY);

    this.rafTicking = false;
  };

  componentDidMount() {
    this.lastScrollY = window.scrollY;
    this.lastWindowHeight = window.innerHeight;
    this.lastDocumentHeight = document.documentElement.offsetHeight;

    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onResize, false);

    this.requestTick();
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafInProgress);
    window.removeEventListener('scroll', this.onScroll, { passive: true });
    window.removeEventListener('resize', this.onResize, false);
  }

  componentDidUpdate() {
    this.onResize();
  }

  shareHandler = event => {
    event.preventDefault();

    const site = event.currentTarget.dataset.shareSite,
      post = this.props.data.post,
      postTitle = post.frontmatter.title,
      url = this.props.location.href;

    switch (site) {
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${url}`,
          'share-facebook',
          'width=580,height=296'
        );
        break;
      case 'twitter':
        window.open(
          `https://twitter.com/share?text=${postTitle}&url=${url}`,
          'share-twitter',
          'width=550,height=235'
        );
        break;
      default:
        break;
    }
  };
  getPageTitle = title => {
    var wordArray = title.split(' ');
    if (wordArray.length > 1) {
      wordArray[wordArray.length - 2] +=
        '&nbsp;' + wordArray[wordArray.length - 1];
      wordArray.pop();
      return wordArray.join(' ');
    }
    return title;
  };

  render() {
    const { data, pageContext, location } = this.props;
    const { post, previousPost, nextPost } = data;
    const { frontmatter, fields } = post;
    const { tags, featuredImage } = frontmatter;

    const siteTitle = get(this.props, 'data.site.siteMetadata.title'),
      siteUrl = get(this.props, 'data.site.siteMetadata.siteUrl'),
      disqusShortname = get(this.props, 'data.site.siteMetadata.config.disqus'),
      creatorTwitter = get(frontmatter, 'author.twitter'),
      siteTwitter = get(this.props, 'data.site.siteMetadata.social.twitter'),
      siteDescription = post.excerpt,
      postTitle = frontmatter.title,
      slug = fields.slug;

    const { primaryTag } = pageContext,
      relatedPosts = data.relatedPosts,
      titleToShow = `${postTitle} | ${siteTitle}`;

    const disqusConfig = {
      url: location.href,
      identifier: slug,
      title: titleToShow,
    };

    return (
      <Layout location={location}>
        <Helmet
          meta={[
            { name: 'description', content: siteDescription },
            { name: 'twitter:site', content: `@${siteTwitter}` },
            { name: 'twitter:creator', content: `@${creatorTwitter}` },
            { name: 'twitter:card', content: 'summary_large_image' },
            { property: 'og:url', content: `${siteUrl}${slug}` },
            { property: 'og:type', content: 'article' },
            { property: 'og:title', content: titleToShow },
            { property: 'og:description', content: siteDescription },
            {
              property: 'og:image',
              content: `${siteUrl}${featuredImage.childImageSharp.fluid.src}`,
            },
          ]}
          bodyAttributes={{
            class: 'post-template',
          }}
          title={titleToShow}
        />

        <header className='site-header outer'>
          <div className='inner'>
            <Navigation location={location} />
          </div>
        </header>

        <main id='site-main' className='site-main outer'>
          <div className='inner'>
            <article
              className={`post-full post ${featuredImage || 'no-image'}`}
            >
              <header className='post-full-header'>
                <div className='post-full-meta'>
                  <time
                    className='post-full-meta-date'
                    dateTime='{frontmatter.date}'
                  >
                    {frontmatter.date}
                  </time>
                  <span className='date-divider'>/</span>
                  {tags.map((tag, index) => {
                    return (
                      <React.Fragment key={tag}>
                        <Link to={`/tag/${tag}`} rel=''>
                          {' '}
                          {tag}{' '}
                        </Link>
                        {index !== tags.length - 1 && <span> ,&nbsp;</span>}
                      </React.Fragment>
                    );
                  })}
                </div>
                <h1
                  className='post-full-title js-foating-header-trigger js-no-widows'
                  dangerouslySetInnerHTML={{
                    __html: this.getPageTitle(postTitle),
                  }}
                  ref={this.titleRef}
                />
              </header>

              {featuredImage && (
                <Image
                  className='post-full-image'
                  fluid={featuredImage.childImageSharp.fluid}
                />
              )}

              <section
                className='post-full-content'
                dangerouslySetInnerHTML={{ __html: post.html }}
              />

              <Author author={frontmatter.author} />

              {process.env.NODE_ENV === 'production' && disqusShortname && (
                <section className='post-full-comments'>
                  <DiscussionEmbed
                    shortname={disqusShortname}
                    config={disqusConfig}
                  />
                </section>
              )}
            </article>
          </div>
        </main>

        {relatedPosts && (
          <RelatedPosts
            primaryTag={primaryTag}
            siteTitle={siteTitle}
            relatedPosts={relatedPosts}
            previousPost={previousPost}
            nextPost={nextPost}
          />
        )}

        <div className='floating-header' ref={this.headerRef}>
          <div className='floating-header-logo'>
            <Link to={siteUrl}>
              <img src={logo} alt={`${siteTitle} logo`} />
              <span>{siteTitle}</span>
            </Link>
          </div>
          <span className='floating-header-divider'>&mdash;</span>
          <div className='floating-header-title'>{postTitle}</div>
          <div className='floating-header-share'>
            <div className='floating-header-share-label'>
              Share this <Icons.point />
            </div>
            <a
              className='floating-header-share-tw'
              data-share-site='twitter'
              onClick={this.shareHandler}
            >
              <Icons.twitter />
            </a>
            <a
              className='floating-header-share-fb'
              data-share-site='facebook'
              onClick={this.shareHandler}
            >
              <Icons.facebook />
            </a>
          </div>
          <progress ref={this.progressBarRef} className='progress' value='0'>
            <div className='progress-container'>
              <span className='progress-bar' />
            </div>
          </progress>
        </div>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query($slug: String!, $primaryTag: String, $previous: String, $next: String) {
    site {
      siteMetadata {
        title
        siteUrl
        config {
          disqus
        }
        social {
          twitter
        }
      }
    }

    relatedPosts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 3
      filter: {
        frontmatter: { tags: { in: [$primaryTag] }, draft: { ne: true } }
      }
    ) {
      totalCount

      edges {
        node {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }

    previousPost: markdownRemark(fields: { slug: { eq: $previous } }) {
      ...PostCardFragment
    }

    nextPost: markdownRemark(fields: { slug: { eq: $next } }) {
      ...PostCardFragment
    }

    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY")
        tags
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 1600, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        author {
          id
          name
          bio
          location
          facebook
          twitter
          profileImage
          website
        }
      }
      fields {
        slug
      }
    }
  }
`;
