import React from "react";
import PropTypes from "prop-types";
import "prismjs/themes/prism-okaidia.css";
import Headline from "../Article/Headline";
import Bodytext from "../Article/Bodytext";
import Meta from "./Meta";
import Author from "./Author";
import NextPrev from "./NextPrev";
import SocialShare from "./SocialShare";
import { Disqus } from 'gatsby-plugin-disqus';

const Post = props => {
  const {
    site: {
      siteMetadata: {
        siteUrl,
        description
      }
    },
    post,
    post: {
      id,
      html,
      htmlAst,
      fields: { prefix, slug, source },
      frontmatter: { title, author, tags, absolutePath },
      parent: { modifiedTime },
      timeToRead,
      excerpt
    },
    authornote,
    next: nextPost,
    prev: prevPost,
    theme
  } = props;

  const postType = source === "notes" ? "/note" : "/blog";
  const postUrl = `${siteUrl + postType + slug}`;
  let disqusConfig = {
    url: postUrl,
    identifier: id,
    title: title,
  }

  return (
    <React.Fragment>
      <header>
        <Headline title={title} theme={theme} customStyle={{textAlign: "left"}} />
        <Meta prefix={prefix} author={author} tags={tags} timeToRead={timeToRead} theme={theme} />
      </header>
      <Bodytext content={post} theme={theme} />
      <footer>
          <SocialShare postUrl={postUrl} title={title} excerpt={excerpt} siteDescription={description} coverImage={absolutePath}/>
          {/* <Author note={authornote} theme={theme} /> */}
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
