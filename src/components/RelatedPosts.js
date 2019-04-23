import { Link } from 'gatsby';
import React from 'react';
import PostCard from './PostCard';

import Icons from './Icons';

const RelatedPosts = props => {
  let site = {},
    tag = {};
  const relatedPosts = props.relatedPosts.edges,
    totalPosts = props.relatedPosts.totalCount,
    backgroundImage = tag.featuredImage || site.coverImage;

  return (
    <aside className='read-next outer'>
      <div className='inner'>
        <div className='read-next-feed'>
          <article
            className='read-next-card'
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <header className='read-next-card-header'>
              <small className='read-next-card-header-sitetitle'>
                &mdash; {props.siteTitle} &mdash;
              </small>
              <h3 className='read-next-card-header-title'>
                <Link to={`/tag/${props.primaryTag}`}>{props.primaryTag}</Link>
              </h3>
            </header>
            <div className='read-next-divider'>
              <Icons.infinity />
            </div>
            <div className='read-next-card-content'>
              <ul>
                {relatedPosts.map(edge => {
                  const node = edge.node;
                  return (
                    <li key={node.fields.slug}>
                      <Link to={node.fields.slug}>
                        {node.frontmatter.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <footer className='read-next-card-footer'>
              <Link to={`/tag/${props.primaryTag}`}>
                {totalPosts === 0
                  ? 'No posts'
                  : totalPosts === 1
                  ? '1 post'
                  : `See all ${totalPosts} posts`}{' '}
                →
              </Link>
            </footer>
          </article>
          {props.nextPost && <PostCard post={props.nextPost} rel='next' />}
          {props.previousPost && (
            <PostCard post={props.previousPost} rel='prev' />
          )}
        </div>
      </div>
    </aside>
  );
};

export default RelatedPosts;
