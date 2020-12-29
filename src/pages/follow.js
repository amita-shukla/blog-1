import React, {useState} from "react";
import { graphql, StaticQuery } from "gatsby";
import addToMailchimp from "gatsby-plugin-mailchimp"
import theme from "../theme/theme.yaml";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";
import Seo from "../components/Seo";
import { FaTag , FaRss , FaPaperPlane } from "react-icons/fa";
import config from "../../content/meta/config";

const FollowPage = props => {

  const [email, setValue] = useState('')

  const handleSubmit = e => {
    e.preventDefault();

    const b = document.getElementById("submitButton")
    b.disabled = true
    b.value = "Subscribing..."
    b.style.transition = "200ms ease-in-out"
    b.style.backgroundColor = theme.color.brand.primaryLight
    b.style.borderColor = theme.color.brand.primaryLight
    b.style.color = "#666"

    addToMailchimp(email)
    .then(function(response) {
      console.log(response)
      if (response.result == 'success') {
        console.log("Form submission success");
      } else {
        console.error(response);
        alert("Server responded with error! Sorry about this.")
      }
    })
    .catch(error => {
      console.error(error);
      alert("Unable to deliver. Is your internet connection down?")
    });
  }

  const handleChange = e => {
      setValue(e.target.value)
  }
  
  return (
    <StaticQuery
      query={graphql`
        query EmailQuery {
          site {
            siteMetadata {
              emailSubLink
            }
          }
        }
      `}
      render={ queryResults => {
        const emailSubLink = queryResults.site.siteMetadata.emailSubLink
        return (
          <React.Fragment>
            <Article theme={theme}>
              <header>
                <Headline title="Follow" theme={theme} />
              </header>
              <p>Hear about new posts by either RSS or Email.</p>
              <div className="form">
                <form
                  name="subscribe"
                  method="post"
                  action={'https://amitashukla.us16.list-manage.com/subscribe/post?u=9618da8096ab249006808edd2&amp;id=a6e4c110bf'}
                  onSubmit={handleSubmit}
                  data-netify="true"
                >
                  <input
                    type="email" required
                    name="email"
                    value={email}
                    onChange={handleChange}
                    className="formItem"
                    id="emailInput"
                    placeholder="Email"
                  />
                  <input
                    type="submit"
                    value="Submit"
                    id="submitButton"
                    className="formItem" 
                  />
                </form>
              </div>

              <style jsx>{`
                p {
                  font-size: ${theme.font.size.s};
                  font-weight: 400;
                  margin: 0 0 1.5em;
                  margin-bottom: 20px;
                  color: ${theme.color.neutral.gray.j};
                }
                #emailInput {
                  width: 100%;
                  font-family: Open Sans;
                  font-weight: lighter;
                  font-size: 1.2em;
                  padding: 10px;
                  height: auto;
                  max-width: 300px;
                  border: 1px solid ${theme.color.brand.primary};
                  border-radius: 5px;
                  margin-right: 10px;
                }
                #emailInput:hover {
                  border: 1px solid ${theme.color.brand.primaryDark};
                }
                #submitButton {
                  color: white;
                  height: auto;
                  font-family: Open Sans;
                  font-size: 1.2em;
                  font-weight: 350;
                  padding: 0.5em 1em;
                  border-radius: 5px;
                  background: ${theme.color.brand.primary};
                  border: 1px solid ${theme.color.brand.primary};
                }
                #submitButton:hover {
                  background: ${theme.color.brand.primaryDark};
                  cursor: pointer;
                }
              `}</style>
            </Article>
            <Seo pageTitle="Follow"/>
          </React.Fragment>
        )}
      }
    />
  )
};

export default FollowPage;
