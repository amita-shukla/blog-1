import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { getExpandedDate } from "../../utils/helpers";
import { FaCalendar } from "react-icons/fa";

const List = props => {
  const { edges, theme } = props;

  return (
    <React.Fragment>
      <ul>
        {edges.map(edge => {
          const {
            node: {
              frontmatter: { title },
              fields: { slug, source, prefix }
            }
          } = edge;
          const postType = source === "notes" ? "/note" : "/blog";
          return (
            <li key={postType + slug}>
              <span>{getExpandedDate(prefix) + " - "}</span>
              <Link to={postType + slug}>{title}</Link>
              {/* <span>{source === "notes" ? " - " + getExpandedDate(prefix) : ""}</span> */}
            </li>
          );
        })}
      </ul>

      {/* --- STYLES --- */}
      <style jsx>{`
        ul {
          margin: ${theme.space.stack.m};
          padding: ${theme.space.m};
          list-style: circle;
        }
        li {
          padding: ${theme.space.xs} 0;
          font-size: ${theme.font.size.s};
          line-height: ${theme.font.lineHeight.l};
        }
        span {
          font-size: ${theme.font.size.xxs};
        }
      `}</style>
    </React.Fragment>
  );
};

List.propTypes = {
  edges: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired
};

export default List;
