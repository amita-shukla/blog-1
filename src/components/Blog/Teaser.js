import { FaArrowRight } from "react-icons/fa/";
import { FaCalendar } from "react-icons/fa/";
import { FaTag } from "react-icons/fa/";
import { FaUser } from "react-icons/fa/";
import Picture from "gatsby-image";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import Meta from "../Post/Meta";

const Teaser = props => {
  const {
    theme,
    post: {
      excerpt,
      fields: { slug, prefix },
      frontmatter: { title, tags, author, cover },
      timeToRead
    },
    index
  } = props;

  // const fluid1 = (!!cover) ? cover.children[{fluid}] : {}
  // const children = cover || {}
  // const [{fluid}] = children || {}
  // let { children: [{fluid}] } = cover;
  // let { children } = cover;
  // let [{fluid}] = children;

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const date = new Date(Date.parse(prefix));
  const fullDate = monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();

  return (
    <React.Fragment>
      <li>
        <Link to={`/blog` + slug} key={slug} className="link">
          {/* {cover !== null && cover.childImageSharp !==null ? (
              <div className="gatsby-image-outer-wrapper">
                <Picture
                  fluid={cover.childImageSharp.fluid}
                  critical={index==0}
                /> </div>) : null } */}
          <h1 className="title">
            {title} {/*<FaArrowRight className="arrow" />*/}
          </h1>
          {/* <p className="meta-wrapper"> */}
          {/* <Meta prefix={prefix} author={author} tags={tags} timeToRead={timeToRead} theme={theme} /> */}
          {/* </p> */}
          <p className="meta">
            <span>
              <FaCalendar /> {fullDate}
            </span>
            {/* <span>
              <FaUser size={18} /> {author}
            </span> */}
            <div className="tags">
              {tags &&
                tags.map(tag => (
                  <Link
                    to={`/tag/${tag
                      .split(" ")
                      .join("-")
                      .toLowerCase()}`}
                  >
                    <span key={tag}>
                      <FaTag /> {tag}
                    </span>
                  </Link>
                ))}
            </div>
          </p>
          {/* <p><span> {excerpt}</span></p> */}
          <p> {excerpt}</p>
        </Link>
      </li>

      {/* --- STYLES --- */}
      <style jsx>{`
        :global(.link) {
          width: 100%;
          color: ${theme.text.color.primary};
        }

        li {
          border: 1px solid transparent;
          // border-radius: ${theme.size.radius.default};
          margin: ${theme.space.l} 0 ${theme.space.l};
          padding: ${theme.space.inset.s};
          position: relative;
          transition: all ${theme.time.duration.default};
          background: transparent;

          :global(.gatsby-image-outer-wrapper) {
            // border-radius: ${theme.size.radius.default};
            // border: 1px solid ${theme.line.color};
            // overflow: hidden;
          }
          :global(.gatsby-image-outer-wrapper img) {
            // z-index: -1;
          }

          &::after {
            // border-top: 1px solid ${theme.line.color};
            content: "";
            height: 0;
            position: absolute;
            bottom: ${`calc(${theme.space.default} * -1.5)`};
            left: 50%;
            transform: translateX(-50%);
            transition: all ${theme.time.duration.default};
            width: 50%;
          }

          &:first-child {
            margin-top: 10px;   
          }
          &:last-child {
            margin-bottom: 10px;
          }
        }

        .title {
          padding: ${theme.space.m} ${theme.space.s} 0;
          line-height: ${theme.blog.h1.lineHeight};
          font-size: ${theme.blog.h1.size};
          font-weight: ${theme.font.weight.bold};
          // color: ${theme.color.brand.primary};
          text-remove-gap: both;

          :global(.arrow) {
            // display: none;
            // position: relative;
            // top: 7px;
          }
        }


        .meta {
          // display: block;
          font-size: 0.8em;
          // padding: ${theme.space.s} ${theme.space.s};
          margin: ${theme.space.m} 0;
          background: transparent;



        }

        span {
          // align-items: baseline;
          // display: flex;
          text-transform: uppercase;
          margin: ${theme.space.xs} ${theme.space.s} ${theme.space.xs} 0;
          font-size: 0.8em;

          :global(svg) {
            // fill: ${theme.color.brand.hover};
            // fill: ${theme.text.color.primary};
            fill: ${theme.icon.color};
            height: 18px;
            width: 18px;
            // opacity: 0.4;
            margin: ${theme.space.inline.xs};
            position: relative;
            bottom: -0.5em;
          }
        }

        .tags {
          display: flex;
          flex-flow: row wrap;
          // flex-shrink: 0;
        }

        p {
          line-height: 1.5;
          padding: 0 ${theme.space.s};
          text-remove-gap: both;
        }

        @from-width tablet {
          li {
            margin: ${`calc(${theme.space.default} * 3) 0 ${theme.space.xl}`};
            padding: ${theme.space.default};

            &::after {
              bottom: ${`calc(${theme.space.default} * -2)`};
            }

            &:first-child {
              &::before {
                top: ${`calc(${theme.space.default} * -1.75)`};
              }
            }
          }

          .title {
            font-size: ${`calc(${theme.blog.h1.size} * 1.2)`};
            padding: ${`calc(${theme.space.default} * 1.5) ${theme.space.default} 0`};
            transition: all 0.5s;
          }
          .meta {
            // padding: ${`calc(${theme.space.default} * 1.5) ${theme.space.default}`};
            padding: ${theme.space.default} ${theme.space.default};
          }
          p {
            padding: 0 ${theme.space.default};
          }
        }
        @below desktop {
          li {
            border: 1px solid ${theme.line.color};
            box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.03);
            margin-top: 20px;
            margin-bottom: 20px;
            
            &:first-child {
              margin-top: 0;
            }

            &::after {
              border-top: 0px;
            }
          }
        }
        @from-width desktop {
          li {
            // margin: ${theme.space.xl} 0 ${theme.space.xxl};
            margin: 0 0 0;
            padding: 0 0 ${theme.space.l};

            &::after {
              bottom: ${`calc(${theme.space.default} * -1.5)`};
            }

            &:first-child {
              &::before {
                top: ${`calc(${theme.space.default} * -2.75)`};
              }
            }
          }

          :global(.blogItemLink:first-child) > li::before {
            top: ${`calc(${theme.space.default} * -2.75)`};
          }
          .title {
            font-size: 2.5em;
            padding: ${`calc(${theme.space.default} * 1.2) ${theme.space.l} 0`};
          }
          .meta {
            // padding: ${`calc(${theme.space.default} * 0.25) calc(${theme.space.default} * 2) calc(${theme.space.default} * 0.5)`};
              padding: 0 ${theme.space.l} 0;
          }
          p {
            padding: 0 ${theme.space.l} 0;
          }
          li {
            &:hover {
              border: 1px solid ${theme.line.color};
              box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.03);

              &:after {
                bottom: ${`calc(${theme.space.default} * -2.5)`};
              }
              :global(.gatsby-image-wrapper) {
                // transform: scale(1.1);
              }
              .title {
                // color: ${theme.blog.h1.hoverColor};
                // color: ${theme.color.brand.hover};
                color: ${theme.color.brand.primaryDark};
              }
              :global(.arrow) {
                // opacity: 1;
                // stroke: ${theme.color.special.attention};
                // transform: translateX(0);
              }
            }
            :global(.gatsby-image-wrapper) {
              // transition: all ${theme.time.duration.default};
            }
            :global(.arrow) {
              // display: inline-block;
              // fill: ${theme.color.special.attention};
              // stroke: ${theme.color.special.attention};
              // stroke-width: 40;
              // stroke-linecap: round;
              // opacity: 0;
              // transition: all 0.5s;
              // transform: translateX(-50%);
            }
          }
        }
        @media (hover: hover) {
          .meta {
            :global(a svg) {
              transition: all 0.5s ease-in-out;
              -webkit-transition: all 0.5s ease-in-out;
              -moz-transition: all 0.5s ease-in-out;
            }
            :global(a:hover svg) {
              transition: all 0.5s ease-in-out;
              -webkit-transition: all 0.5s ease-in-out;
              -moz-transition: all 0.5s ease-in-out;
              transform: scale(1.3);
              color: ${theme.color.brand.primary};
            }
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Teaser.propTypes = {
  post: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default Teaser;
