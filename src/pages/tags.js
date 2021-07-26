import { FaTag } from "react-icons/fa/";
import PropTypes from "prop-types";
import React from "react";
import { graphql, Link } from "gatsby";
import theme from "../theme/theme.yaml";
import Article from "../components/Article/";
import Headline from "../components/Article/Headline";
import List from "../components/List";
import Seo from "../components/Seo";

const TagsPage = props => {
  const {
    data: {
      posts: { edges: posts }
    }
  } = props;

  // Create tags list
  const tagsPosts = {};
  posts.forEach(edge => {
    
    const {
      node: {
        frontmatter: { tags }
      }
    } = edge;

    if (tags && tags != null) {
      tags.forEach(tag => {
        if (tag && tag != null) {
          if (!tagsPosts[tag]) {
            tagsPosts[tag] = [];
          }
          tagsPosts[tag].push(edge);
        }
      })
    }
  });

  const tagList = [];

  for (var tag in tagsPosts) {
    tagList.push([tag, tagsPosts[tag]]);
  }

  return (
    <React.Fragment>
      <Article theme={theme}>
        <header>
          <Headline title="Posts by Tags" theme={theme} />
        </header>
        <p> 
          {tagList.map(item => (
            <section key={item[0]}>
              <h2>
                <Link to={`/tag/${item[0].split(" ").join("-").toLowerCase()}`}><FaTag />{item[0]}</Link> 
              </h2>
              <List edges={item[1]} theme={theme} />
            </section>
          ))}
        </p>
        {/* --- STYLES --- */}
        <style jsx>{`
          p {
            margin-top: ${theme.space.l};
          }
          h2 {
            margin: 0 0 0.5em;
            color: ${theme.color.neutral.gray.k};
            
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

      <Seo pageTitle="Tags" pageSlug="/tags/"/>
    </React.Fragment>
  );
};

TagsPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default TagsPage;

//eslint-disable-next-line no-undef
export const query = graphql`
  query PostsQuery {
    posts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "//[0-9]+.*--/" }
      }
      sort: { fields: [fields___prefix], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            prefix
          }
          frontmatter {
            title
            tags
            author
          }
        }
      }
    }
  }
`;
