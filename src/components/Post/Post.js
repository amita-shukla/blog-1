import React from "react";
import PropTypes from "prop-types";
import "prismjs/themes/prism-okaidia.css";
import Headline from "../Article/Headline";
import Bodytext from "../Article/Bodytext";
import Meta from "./Meta";
import Author from "./Author";
import NextPrev from "./NextPrev";
import { Disqus } from 'gatsby-plugin-disqus';

const Post = props => {
  const {
    site: {
      siteMetadata: {
        siteUrl
      }
    },
    post,
    post: {
      id,
      html,
      htmlAst,
      fields: { prefix, slug },
      frontmatter: { title, author, tags },
      parent: { modifiedTime },
      timeToRead
    },
    authornote,
    next: nextPost,
    prev: prevPost,
    theme
  } = props;

  let disqusConfig = {
    url: `${siteUrl+slug}`,
    identifier: id,
    title: title,
  }

  return (
    <React.Fragment>
      <header>
        <Headline title={title} theme={theme} />
        <Meta prefix={prefix} lastEdit={modifiedTime} author={author} tags={tags} timeToRead={timeToRead} theme={theme} />
      </header>
      <Bodytext content={post} theme={theme} />
      <footer>
          <Author note={authornote} theme={theme} />
          <NextPrev next={nextPost} prev={prevPost} theme={theme} />
          <Disqus config ={disqusConfig} />
      </footer>
    </React.Fragment>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  authornote: PropTypes.string.isRequired,
  next: PropTypes.object,
  prev: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default Post;
