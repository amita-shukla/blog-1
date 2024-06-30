import { FaTag } from "react-icons/fa/";
import PropTypes from "prop-types";
import React from "react";
import { graphql, Link } from "gatsby";
import theme from "../theme/theme.yaml";
import Article from "../components/Article/";
import Headline from "../components/Article/Headline";
import List from "../components/List";
import Seo from "../components/Seo";

const NotesPage = props => {
  const {
    data: { notes }
  } = props;

  return (
    <React.Fragment>
      <Article theme={theme}>
        <header>
          <Headline title="Notes" theme={theme} />
          <h3>On Which I Couldn't Write A Blog Post</h3>
        </header>
        <p>
          <List edges={notes.edges} theme={theme} type="/note" />
        </p>
        {/* --- STYLES --- */}
        <style jsx>{`
          p {
            margin-top: ${theme.space.m};
          }
          h2 {
            margin: 0 0 0.5em;
            color: ${theme.color.neutral.gray.k};
            align-items: center;
          }
          h3 {
            margin: 0 0 0.5em;
            color: ${theme.color.neutral.gray.k};
            // align-items: center;
            text-align: center;
            font-weight: ${theme.font.weight.bold};
          }
          @from-width desktop {
            :global(a:hover) {
              color: ${theme.color.brand.primary};
            }
          }
          h2 :global(svg) {
            height: 0.8em;
            fill: ${theme.color.brand.primary};
          }
        `}</style>
      </Article>

      <Seo pageTitle="Notes" pageSlug="/notes/" />
    </React.Fragment>
  );
};

NotesPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default NotesPage;

//eslint-disable-next-line no-undef
export const query = graphql`
  query NotesQuery {
    notes: allMarkdownRemark(
      filter: { fields: { source: { eq: "notes" } } }
      sort: { fields: [fields___prefix], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
            source
            prefix
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
