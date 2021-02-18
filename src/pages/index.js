import PropTypes from "prop-types";
import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import theme from "../theme/theme.yaml";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";
import Seo from "../components/Seo";
import { FaEnvelope } from "react-icons/fa";
import About from "../components/About"

const AboutPage = props => {
  const aboutContent = useStaticQuery(query).markdownRemark.htmlAst
  return (
    <React.Fragment>
        <Article theme={theme}>
          <About theme={theme} aboutContent={aboutContent}/>
          <style jsx>{`
            .aboutText {
              color: ${theme.color.neutral.gray.j};
              margin: 0 0 0.5em;
              font-size: ${theme.font.size.s};
              font-weight: 400;
            }
            .aboutText{
              :global(a) {
                font-weight: ${theme.font.weight.bold};
                color: ${theme.color.brand.primary};
              }
              :global(a:hover) {
                color: ${theme.color.brand.primaryDark};
              }
            }
          `}</style>
        </Article>
      <Seo pageTitle="Home"/>
    </React.Fragment>
  );
};

const query = graphql`
  query AboutAst {
    markdownRemark(fileAbsolutePath: {regex: "/about/"}) {
      htmlAst
    }
  }  
`

AboutPage.propTypes = {
};

export default AboutPage;
