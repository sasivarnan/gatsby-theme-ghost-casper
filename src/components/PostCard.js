import React from 'react';
import { Link } from 'gatsby';
import { getPrimaryTag } from '../utils/tags';
import GatsbyImage from 'gatsby-image';
import Icons from './Icons';

const AuthorsList = ({ author }) => {
  const authors = [author];
  return (
    <ul className='author-list'>
      {authors.map(author => (
        <li key={author.id} className='author-list-item'>
          <div className='author-name-tooltip'>{author.name}</div>

          {author.profileImage ? (
            <Link to={`/author/${author.id}`} className='static-avatar'>
              <img
                className='author-profile-image'
                src={author.profileImage}
                alt={author.name}
              />
            </Link>
          ) : (
            <Link
              to={`/author/${author.id}`}
              className='static-avatar author-profile-image'
            >
              <Icons.avatar />
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

const PostCard = ({ post, rel }) => {
  const primaryTag = getPrimaryTag(post.frontmatter.tags),
    { featuredImage, author, title } = post.frontmatter;

  return (
    <article className='post-card {{post_class}}{{#unless feature_image}} no-image{{/unless}}'>
      {featuredImage && (
        <Link className='post-card-image-link' rel={rel} to={post.fields.slug}>
          <GatsbyImage
            className='post-card-image'
            fluid={featuredImage.childImageSharp.fluid}
          />
        </Link>
      )}
      <div className='post-card-content'>
        <Link
          className='post-card-content-link'
          rel={rel}
          to={post.fields.slug}
        >
          <header className='post-card-header'>
            <span className='post-card-tags'>{primaryTag}</span>
            <h2 className='post-card-title'>{title}</h2>
          </header>
          <div className='post-card-excerpt'>
            <p>{post.excerpt} </p>
          </div>
        </Link>

        <footer className='post-card-meta'>
          {author && <AuthorsList author={author} />}
          <span className='reading-time'>{post.timeToRead} MIN READ</span>
        </footer>
      </div>
    </article>
  );
};

export default PostCard;
