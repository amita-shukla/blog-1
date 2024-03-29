import React from "react";
import PropTypes from "prop-types";

const Headline = props => {
  const { title, children, theme, customStyle } = props;

  return (
    <React.Fragment>
      {title ? <h1 style={customStyle}>{title}</h1> : <h1 style={customStyle}>{children}</h1>}

      {/* --- STYLES --- */}
      <style jsx>{`
        h1 {
          font-size: ${theme.font.size.xxl};
          margin: ${theme.space.stack.m};
          animation-name: headlineEntry;
          animation-duration: 0;
          color: ${theme.color.neutral.gray.i};
          text-align: center;
          font-weight: ${theme.font.weight.standard};

          :global(span) {
            display: block;
            font-size: 0.5em;
            letter-spacing: 0;
            margin: ${theme.space.stack.xs};
          }

          :global(svg) {
            height: 0.75em;
            fill: ${theme.color.brand.primary};
          }
        }

        @keyframes headlineEntry {
          from {
            opacity: 0.5;
          }
          to {
            opacity: 1;
          }
        }

        @from-width tablet {
          h1 {
            font-size: ${`calc(${theme.font.size.xxxl} * 1.2)`};
          }
        }

        @from-width desktop {
          h1 {
            font-size: ${`calc(${theme.font.size.xxxl} * 1.4)`};
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Headline.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  theme: PropTypes.object.isRequired
};

export default Headline;
