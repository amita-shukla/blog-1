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
            <Headline theme={theme}>Contact</Headline>
          </header>
          <div className="contactText" dangerouslySetInnerHTML={{ __html: contactPageText }}/>
          <style jsx>{`
            .contactText {
              color: ${theme.color.neutral.gray.j};
              margin: 0 0 0.5em;
              font-size: ${theme.font.size.s};
              font-weight: 400;
              text-align: center;
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
      <Seo pageTitle="Contact" pageSlug="/contact/"/>
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
