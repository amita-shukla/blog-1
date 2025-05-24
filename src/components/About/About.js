import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Headline from "../Article/Headline";
import WebPresenceIcons from "./WebPresenceIcons";
import ReImg from "../Article/ReImg";
import rehypeReact from "rehype-react";
import Icons from "../../components/About/WebPresenceIcons";

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { "re-icons": Icons, "re-img": ReImg }
}).Compiler;

const About = props => {
  const { aboutContent, theme } = props;

  return (
    <React.Fragment>
      <header>
        <Headline title="Welcome!" theme={theme} />
      </header>
      <div className="aboutText">{renderAst(aboutContent)}</div>
      <style jsx>{`
        .aboutText {
          color: ${theme.color.neutral.gray.j};
          margin: 0 0 0.5em;
          text-align: justify;
        }
        .aboutText {
          :global(a) {
            color: ${theme.color.brand.primary};
          }
          :global(h2),
          :global(h3),
          :global(h4) {
            font-weight: ${theme.font.weight.bold};
            margin: 0.5em 0 0.5em;
          }

          :global(h2) {
            line-height: ${theme.font.lineHeight.l};
            font-size: ${theme.font.size.xl};
          }

          :global(h3) {
            line-height: ${theme.font.lineHeight.m};
            font-size: ${theme.font.size.l};
          }

          :global(a:hover) {
            color: ${theme.color.brand.primaryDark};
          }

          :global(p) {
            line-height: ${theme.font.lineHeight.xl};
            font-size: ${theme.font.size.s};
            margin: 0 0 1.5em;
          }
          :global(a.gatsby-resp-image-link) {
            border: 0;
            display: block;
            margin: 2.5em 0;
            border-radius: ${theme.size.radius.default};
            overflow: hidden;
            border: 1px solid ${theme.line.color};
          }
          :global(strong) {
            font-weight: ${theme.font.weight.bold};
            color: ${theme.color.neutral.black};
          }
        }
      `}</style>
    </React.Fragment>
  );
};

export default About;
