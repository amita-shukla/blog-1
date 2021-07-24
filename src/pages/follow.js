import React, {useState} from "react";
import addToMailchimp from "gatsby-plugin-mailchimp"
import theme from "../theme/theme.yaml";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";
import Seo from "../components/Seo";
import {FaCheck, FaExclamation, FaRss} from "react-icons/fa"
import ReactHtmlParser from 'react-html-parser'

const FollowPage = props => {

  const siteUrl = props.data.site.siteMetadata.siteUrl

  const [email, setValue] = useState('')
  const [res, setRes] = useState('')

  const handleSubmit = e => {
    e.preventDefault();

    const r = document.getElementById("responseLabel")

    addToMailchimp(email)
    .then(function(response) {
      console.log(response)
      if (response.result == 'success') {
        console.log("Form submission success");
        r.style.display = 'block'
        setRes(response)
      } else {
        console.error(response);
        r.style.display = 'block'
        setRes(response)
      }
    })
    .catch(error => {
      console.error(error);
      r.style.display = 'block'
      setRes(error)
    });
  }

  const handleChange = e => {
      setValue(e.target.value)
  }
  
  return (
          <React.Fragment>
            <Article theme={theme}>
              <header>
                <Headline title="Follow" theme={theme} />
              </header>
              <div className="form">
              <p>No fuss. Only new posts.
              Sign up to never miss an update!</p>
                <form
                  name="subscribe"
                  method="post"
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
                    placeholder="Email Address"
                  /><br />
                  <input
                    type="submit"
                    value="Subscribe"
                    id="submitButton"
                    className="formItem" 
                  />
                  <label
                    hidden
                    id="responseLabel"
                  > 
                  {(res.result == 'success') ? 
                    <div className="success"><FaCheck /> {ReactHtmlParser(res.msg)} </div> : 
                    <div className="error"><FaExclamation /> {ReactHtmlParser(res.msg)} </div>}
                  </label>
                  <br/><br/>
                <p className="rss">Don't want to share email? No worries! <br/>
                Follow this blog's feed via <a href={`${siteUrl}`+"/rss.xml"} target="_blank"><FaRss /> RSS</a> </p>
                </form>
              </div>

              <style jsx>{`
                .form{
                  max-width: ${theme.text.maxWidth.desktop};
                  margin-top: 40px;
                  margin-bottom: 20px;
                  text-align: center;
                }
                p {
                  font-size: ${theme.font.size.s};
                  font-weight: 400;
                  margin: 0 0 1.5em;
                  margin-bottom: 20px;
                  color: ${theme.color.neutral.gray.j};
                }
                .rss {
                  :global(a) {
                    font-weight: ${theme.font.weight.bold};
                    color: ${theme.color.brand.primary};
                  }
                  :global(a:hover) {
                    color: ${theme.color.brand.primaryDark};
                  }
                }
                #emailInput {
                  width: 100%;
                  font-family: Open Sans;
                  font-weight: lighter;
                  font-size: 1.2em;
                  padding: 10px;
                  height: auto;
                  max-width: 500px;
                  border: 1px solid ${theme.color.brand.primary};
                  border-radius: 5px;
                  // margin-right: 10px;
                  margin-bottom: 10px;
                }
                #emailInput:hover {
                  border: 1px solid ${theme.color.brand.primaryDark};
                }
                #responseLabel {
                  font-size: ${theme.font.size.xs};
                  font-weight: normal;
                  margin-top: 5px;
                  margin-bottom: 10px;
                  color: ${theme.color.neutral.gray.j};
                }
                .error, .success { 
                  :global(svg) {
                    fill: ${theme.color.special.attention};
                  }
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
                  width: 100%;
                  max-width: 500px;
                }
                #submitButton:hover {
                  background: ${theme.color.brand.primaryDark};
                  cursor: pointer;
                }
              `}</style>
            </Article>
            <Seo pageTitle="Follow" pageSlug="/follow/"/>
          </React.Fragment>
  )
};

export default FollowPage;


//eslint-disable-next-line no-undef
export const query = graphql`
  query FollowPageQuery {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;
