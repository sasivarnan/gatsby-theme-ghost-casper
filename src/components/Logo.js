import { graphql, useStaticQuery } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import get from 'lodash/get';
import React from 'react';

const Logo = props => {
  const { logo, site } = useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            title
          }
        }
        logo: allFile(
          filter: {
            sourceInstanceName: { eq: "assets" }
            relativePath: { eq: "logo.png" }
          }
        ) {
          edges {
            node {
              relativePath
              childImageSharp {
                large: fixed(width: 350) {
                  ...GatsbyImageSharpFixed
                }
                medium: fixed(width: 200) {
                  ...GatsbyImageSharpFixed
                }
                small: fixed(width: 125) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    `
  );
  const image = get(logo, 'edges[0].node.childImageSharp');
  const title = get(site, 'siteMetadata.title');
  return image ? (
    <GatsbyImage
      fixed={image[props.size || 'large']}
      alt={title}
      critical
      {...props}
    />
  ) : (
    title
  );
};

export default Logo;
