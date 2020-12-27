import PropTypes from "prop-types";
import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import theme from "../theme/theme.yaml";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";
import Seo from "../components/Seo";
import { FaEnvelope } from "react-icons/fa";

const ContactPage = props => {
  const contactPageText = useStaticQuery(query).markdownRemark.html
  return (
    <React.Fragment>
        <Article theme={theme}>
          <header>
            <Headline theme={theme}><FaEnvelope /> Contact</Headline>
          </header>
          <h3>
            <div className="contactText" dangerouslySetInnerHTML={{ __html: contactPageText }}/>
          </h3>
          <style jsx>{`
            h3 {
              margin: 0 0 0.5em;
              color: ${theme.color.neutral.gray.j};
              // text-align: justify; 
            }
            .contactText{
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
      <Seo pageTitle="Contact"/>
    </React.Fragment>
  );
};

const query = graphql`
  query ContactText {
    markdownRemark(fileAbsolutePath: {regex: "/contact/"}) {
      html 
    }
  }  
`

ContactPage.propTypes = {
};

export default ContactPage;
