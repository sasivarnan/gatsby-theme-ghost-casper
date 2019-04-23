import React from 'react';
import PostCard from './PostCard';

const SCROLL_BUFFER = 100;

export default class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postsToShow: props.postsPerPage,
    };

    this.maxPages = props.posts.length;
    this.ticking = false;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (!this.ticking) {
      // console.log('Inside scroll handler')
      this.ticking = true;
      requestAnimationFrame(() => this.update());
    }
  };

  update = () => {
    const distaneToBottom =
      document.documentElement.offsetHeight -
      (window.scrollY + window.innerHeight);
    if (distaneToBottom < SCROLL_BUFFER) {
      // console.log('BU', this.state);
      this.setState(
        {
          postsToShow: this.state.postsToShow + this.props.postsPerPage,
        },
        () => {
          if (this.state.postsToShow >= this.maxPages)
            window.removeEventListener('scroll', this.handleScroll);
        }
      );
    }
    this.ticking = false;
  };

  render() {
    const { posts } = this.props;

    return (
      <main id='site-main' className='site-main outer'>
        <div className='inner'>
          <div className='post-feed'>
            {posts.slice(0, this.state.postsToShow).map((post, index) => (
              <PostCard key={index} post={post.node} />
            ))}
          </div>
        </div>
      </main>
    );
  }
}
