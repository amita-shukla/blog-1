import React from "react";
import { graphql, Link } from "gatsby";
import theme from "../theme/theme.yaml";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";
import Seo from "../components/Seo";

const SearchPage = props => {
  // const {
  //   data: {
  //     posts: {edges: posts}
  //   }
  // } = props;

  return (
    <React.Fragment>
      <Article theme={theme}>
        <header>
          <Headline title="Search Posts" theme={theme} />
        </header>
      </Article>
      <p>This is the search page</p>
      <Seo pageTitle="Search" pageSlug="/search/" />
    </React.Fragment>
  )
};

export default SearchPage;