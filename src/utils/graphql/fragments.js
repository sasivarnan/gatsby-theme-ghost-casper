import { graphql } from 'gatsby';

export const postCardFragment = graphql`
  fragment PostCardFragment on MarkdownRemark {
    excerpt
    fields {
      slug
    }
    frontmatter {
      date(formatString: "DD MMMM, YYYY")
      title
      author {
        id
        name
        profileImage
      }
      tags
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
`;
