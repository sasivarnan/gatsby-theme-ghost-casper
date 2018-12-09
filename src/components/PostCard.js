import React from 'react';
import { Link } from 'gatsby';
import { getPrimaryTag } from '../utils/tags';
import GatsbyImage from 'gatsby-image';

const PostCard = ({ post, rel }) => {

  const primaryTag = getPrimaryTag(post.frontmatter.tags),
    featuredImage = post.frontmatter.featuredImage;

  return (

    <article className='post-card {{post_class}}{{#unless feature_image}} no-image{{/unless}}'>

      {featuredImage &&
        <Link className='post-card-image-link' rel={rel} to={post.fields.slug}>
          <GatsbyImage className='post-card-image' fluid={featuredImage.childImageSharp.fluid} />
        </Link>
      }
      <div className='post-card-content'>
        <Link className='post-card-content-link' rel={rel} to={post.fields.slug}>
          <header className='post-card-header'>
            <span className='post-card-tags'>{primaryTag}</span>
            <h2 className='post-card-title'>{post.frontmatter.title}</h2>
          </header>
          <div className='post-card-excerpt'>
            <p>{post.excerpt} </p>
          </div>
        </Link>

        <footer className='post-card-meta'>
          {/* TODO 'components/author-list' */}
          <span className='reading-time'>{post.timeToRead} MIN READ</span>
        </footer>
      </div>
    </article>)

}

export default PostCard