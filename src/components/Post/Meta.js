import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { currDate } from "../../utils/helpers";
import { FaUser, FaTag, FaCalendar, FaClock } from "react-icons/fa/";

const Meta = props => {
  const { author: authorName, tags, theme, timeToRead } = props;
  const prefix = props.prefix || currDate(); /* Intent: get date placeholder for viewing drafts. */

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
  const minuteString = timeToRead <= 1 ? "<1 minute read" : timeToRead + " minutes read";

  return (
    <div className="meta">
      <p>
        <span>
          <FaCalendar size={18} />
          {fullDate}
        </span>
        <span>
          {" "}
          <FaClock size={18} />
          {minuteString}
        </span>
      </p>
      <p>
        {tags &&
          tags.map(tag => (
            <span key={tag}>
              <Link
                to={`/tag/${tag
                  .split(" ")
                  .join("-")
                  .toLowerCase()}`}
              >
                <span>
                  <FaTag size={18} />
                  {tag}
                </span>
              </Link>
            </span>
          ))}
      </p>

      {/* --- STYLES --- */}
      <style jsx>{`
      
        p {
          margin: ${theme.space.xs} 0;

        }
        .meta {
          display: block;
          font-size: 0.8em;
          margin: ${theme.space.m} 0;
          background: transparent;
          color: ${theme.color.neutral.gray.k};

          :global(svg) {
            position: relative;
            bottom: -0.4em;
            fill: ${theme.icon.color};
            margin: ${theme.space.inline.xs};
          }
          span {
            align-items: center;
            text-transform: uppercase;
            margin: ${theme.space.xs} ${theme.space.xs} ${theme.space.xs} 0;
          }
        }
        @from-width tablet {
          .meta {
            margin: ${theme.space.m} 0 ${theme.space.m};
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
