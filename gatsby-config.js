require("dotenv").config();
const config = require("./content/meta/config");

module.exports = {
  // pathPrefix: config.pathPrefix,

  siteMetadata: {
    title: config.siteTitle,
    description: config.siteDescription,
    siteUrl: config.siteUrl,
    plausibleDomain: process.env.PLAUSIBLE_DOMAIN || "",
    contactAddress: process.env.CONTACT_ADDRESS || "",
    emailSubLink: process.env.EMAIL_SUB_LINK || ""
  },
  plugins: [
    `gatsby-plugin-styled-jsx`, // the plugin's code is inserted directly to gatsby-node.js and gatsby-ssr.js files
    `gatsby-plugin-styled-jsx-postcss`, // as above
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        //jsxPragma: `jsx`, // defaults to "React" ??
        allExtensions: true
      }
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/layouts/`)
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/${process.env.POSTS_FOLDER || "mock_posts"}/`,
        name: "posts"
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/pages/`,
        name: "pages"
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `parts`,
        path: `${__dirname}/content/parts/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `notes`,
        path: `${__dirname}/content/notes/`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-component-parent2div",
            options: { components: ["re-icons", "re-img", "re-tracedsvg-gallery"] }
          },
          `gatsby-plugin-sharp`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              backgroundColor: "transparent",
              tracedSVG: { color: `#d1d0e4` }
            }
          },
          {
            resolve: `gatsby-remark-rehype-images`,
            options: {
              tag: `re-img`,
              maxWidth: 800,
              quality: 90,
              tracedSVG: { color: `#d1d0e4` },
              generateTracedSVG: true
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 2em`
            }
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          {
            resolve: "gatsby-remark-emojis",
            options: {
              // Deactivate the plugin globally (default: true)
              active: true,
              // Add a custom css class
              class: "emoji-icon",
              // Select the size (available size: 16, 24, 32, 64)
              size: 64,
              // Add custom styles
              styles: {
                display: "inline",
                margin: "0",
                "margin-top": "1px",
                position: "relative",
                top: "5px",
                width: "25px"
              }
            }
          }
        ]
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.manifestName,
        short_name: config.manifestShortName,
        start_url: config.manifestStartUrl,
        background_color: config.manifestBackgroundColor,
        theme_color: config.manifestThemeColor,
        display: config.manifestDisplay,
        icons: [
          {
            src: "/icons/icon-48x48.png",
            sizes: "48x48",
            type: "image/png"
          },
          {
            src: "/icons/icon-96x96.png",
            sizes: "96x96",
            type: "image/png"
          },
          {
            src: "/icons/icon-144x144.png",
            sizes: "144x144",
            type: "image/png"
          },
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/icons/icon-256x256.png",
            sizes: "256x256",
            type: "image/png"
          },
          {
            src: "/icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        setup: options => ({
          ...options,
          site_url: config.siteUrl,
          description: config.siteDescription,
          custom_namespaces: {
            media: "http://search.yahoo.com/mrss/"
          }
        }),
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                const postType = edge.node.fields.source === "notes" ? "/note" : "/blog";
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.fields.prefix,
                  url: site.siteMetadata.siteUrl + postType + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + postType + edge.node.fields.slug,
                  categories: edge.node.frontmatter.tags,
                  custom_elements: [
                    { "content:encoded": edge.node.html },
                    edge.node.frontmatter.cover != null
                      ? {
                          "media:content": {
                            _attr: {
                              url:
                                site.siteMetadata.siteUrl + edge.node.frontmatter.cover.publicURL,
                              type: edge.node.frontmatter.cover.internal.mediaType
                            }
                          }
                        }
                      : {}
                  ]
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [fields___prefix] },
                  filter: {
                    fields: {
                      prefix: {nin: ["", null] },
                      slug: { nin: ["", null] }
                    }
                  }
                ) {
                  edges {
                    node {
                      excerpt(pruneLength: 400)
                      html
                      fields {
                        slug
                        prefix
                        source
                      }
                      frontmatter {
                        author
                        tags
                        title
                        cover {
                          publicURL
                          internal { mediaType }
                        }
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: config.siteTitle
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        include: /svg-icons/
      }
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `amitashukla`
      }
    },
    {
      resolve: `gatsby-plugin-mailchimp`,
      options: {
        endpoint: process.env.EMAIL_SUB_LINK,
        timeout: 3500
      }
    },
    // {
      // resolve: `gatsby-plugin-goatcounter`,
    //   options: {
    //     code: process.env.GOATCOUNTER_CODE,
    //     allowLocal: false // set this to true, if you want to test locally
    //   }
    // },
    // {
    //   resolve: "gatsby-plugin-social-cards",
    //   options: {
    //     // ommit to skip
    //     // authorImage: "./static/img/coffee-art.jpg",
    //     // image to use when no cover in frontmatter
    //     backgroundImage: "./static/twitter_card.jpg",
    //     // author to use when no auth in frontmatter
    //     defaultAuthor: config.authorName,
    //     // card design
    //     design: "default" // 'default' or 'card'
    //   }
    // }
    // {
    //   resolve: '@ghranek/gatsby-source-blogger',
    //   options: {
    //     apiKey: 'AIzaSyASzJCxZlAjuPSQd3yZwgPF13i5VomShS4',
    //     blogId: '1167440767733751967'
    //   }
    // }
  ]
};
