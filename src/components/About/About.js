import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Headline from "../Article/Headline";
import WebPresenceIcons from "./WebPresenceIcons";
import ReImg from "../Article/ReImg";
import rehypeReact from "rehype-react";
import Icons from "../../components/About/WebPresenceIcons";

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { "re-icons": Icons , "re-img": ReImg}
}).Compiler

const About = props => {
  const { aboutContent, theme } = props;

  return (
      <React.Fragment>
          <header>
              <Headline title="Welcome!" theme={theme} />
          </header>
          <div className="aboutText">
              { renderAst(aboutContent) }
              </div> 
      </React.Fragment>
  )
}

export default About;