import { FaStickyNote, FaTag } from "react-icons/fa/";
import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import Seo from "../components/Seo";
import { ThemeContext } from "../layouts";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";
import List from "../components/List";
const _ = require("lodash");

const TagTemplate = props => {
  const {
    pageContext: { tag },
    data: {
      allMarkdownRemark: { totalCount, edges }
    }
  } = props;

  const isNotesPage = tag == "NOTES";
  const plural = totalCount > 1 ? " posts" : " post";
  const countText = totalCount + plural;
  const noteText = "On Which I Couldn't Write An Entire Blog Post";

  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <header>
              <Headline theme={theme} customStyle={{textAlign: "left"}}>
                <span>{!isNotesPage ? "Posts with tag" : ""}</span> 
                {isNotesPage ? <FaStickyNote /> : <FaTag />}
                {tag}
              </Headline>
              <p className="meta">
                <strong>
                  { !isNotesPage ? countText : noteText }
              </strong>
              </p>
              <List edges={edges} theme={theme} /> 
              
            </header>
          </Article>
        )}
      </ThemeContext.Consumer>

      <Seo pageTitle={tag} pageSlug={"/tag/"+_.kebabCase(tag)} />
    </React.Fragment>
  );
};

TagTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired
};

export default TagTemplate;

// eslint-disable-next-line no-undef
export const tagQuery = graphql`
  query PostsByTag($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___prefix], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
          }
        }
      }
    }
  }
`;
