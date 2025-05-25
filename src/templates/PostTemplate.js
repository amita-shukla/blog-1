import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
require("prismjs/themes/prism-okaidia.css");

import Seo from "../components/Seo";
import Article from "../components/Article";
import Post from "../components/Post";
import { ThemeContext } from "../layouts"; 
const PostTemplate = props => {
  const {
    data: {
      site,
      post,
      authornote: { html: authorNote }
    },
    pageContext: { next, prev }
  } = props;

  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <Post
              site={site}
              post={post}
              next={next}
              prev={prev}
              authornote={authorNote}
              theme={theme}
            />
          </Article>
        )}
      </ThemeContext.Consumer>

      <Seo data={post} />
    </React.Fragment>
  );
};

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired
};

export default PostTemplate;

//eslint-disable-next-line no-undef
export const query = graphql`
  query PostBySlug($slug: String!) {
    site: site {
      siteMetadata {
        siteUrl
        description
      }
    }
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      htmlAst
      fields {
        slug
        prefix
        source
      }
      frontmatter {
        title
        author
        tags
        cover {
          absolutePath
          childImageSharp {
            resize {
              src
            }
          }
          publicURL
        }
      }
      timeToRead
      excerpt(pruneLength: 400)
      parent {
        ...on File {
          modifiedTime(formatString: "YYYY-MM-DD")
        }
      }
    }
    authornote: markdownRemark(frontmatter: {title: {eq: "author"}}) {
      id
      html
      htmlAst
    }
  }
`;
