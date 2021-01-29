import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { currDate } from "../../utils/helpers";
import { FaUser, FaTag, FaCalendar, FaClock } from "react-icons/fa/";

const Meta = props => {
  const { author: authorName, tags, theme, timeToRead} = props;
  const prefix = props.prefix || currDate() /* Intent: get date placeholder for viewing drafts. */
  
  return (
    <div className="meta">
    <p>
        <span>
          <FaCalendar size={18} />{prefix}
        </span>
        <span>  <FaClock size={18}/>{timeToRead} mins</span>
    </p>
    <p>
      {tags && tags.map(tag => 
        <span key={tag}>
          
          <Link to={`/tag/${tag.split(" ").join("-").toLowerCase()}`}>
            <span>
              <FaTag size={18} />
              {tag}
            </span>
          </Link>
        </span>
      )}
    </p>  

      {/* --- STYLES --- */}
      <style jsx>{`
      
        p {
          margin: ${theme.space.xs} 0;

        }
        .meta {
          display: block;
          // flex-flow: row wrap;
          font-size: 0.8em;
          margin: ${theme.space.m} 0;
          background: transparent;
          color: ${theme.color.neutral.gray.j};

          :global(svg) {
            position: relative;
            bottom: -0.4em;
            fill: ${theme.icon.color};
            margin: ${theme.space.inline.xs};
          }
          span {
            align-items: center;
            // display: flex;
            text-transform: uppercase;
            margin: ${theme.space.xs} ${theme.space.xs} ${theme.space.xs} 0;
          }
        }
        @from-width tablet {
          .meta {
            // margin: ${`calc(${theme.space.m} * 1.5) 0 ${theme.space.m}`};
            margin: ${theme.space.s} 0 ${theme.space.s};
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
    </div>
  );
};

Meta.propTypes = {
  tags: PropTypes.array,
  theme: PropTypes.object.isRequired
};

export default Meta;
