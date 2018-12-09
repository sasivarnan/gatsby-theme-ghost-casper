
const postListingFragment = `
  fragment postListingFields on MarkdownRemark {
    frontmatter {
      title
      date
      tags
      featureImage
    }
    fields {
      slug
    }
  }`;

export { postListingFragment };