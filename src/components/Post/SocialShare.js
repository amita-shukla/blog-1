import React from "react";
import theme from "../../theme/theme.yaml";
import { FaEnvelopeOpen, FaFacebook, FaGetPocket, FaGithub, FaInstagram, FaLink, FaLinkedin, FaReddit, FaTwitter } from "react-icons/fa";

const SocialShare = props => {
    const {postUrl, title} = props;
    const redditLink = 'https://www.reddit.com/submit?url='+postUrl
    const twitterLink = 'http://twitter.com/share?url='+postUrl
    const linkedinLink = 'https://www.linkedin.com/shareArticle?mini=true&url='+postUrl
    const facebookLink = 'http://www.facebook.com/sharer.php?u='+postUrl
    const pocketLink = 'https://getpocket.com/save?url='+postUrl
    const emailLink = 'mailto:?subject=Check This Out&body='+postUrl


    return (
        <React.Fragment>
            <div className="icons">
                <span><a target='_blank' href={twitterLink}><FaTwitter /></a></span>
                <span><a target='_blank' href={facebookLink}><FaFacebook /></a> </span>
                <span><a target='_blank' href={redditLink}><FaReddit /></a> </span>
                <span><a target='_blank' href={linkedinLink}><FaLinkedin /></a> </span>
                <span><a target='_blank' href={pocketLink}><FaGetPocket /></a> </span>
                <span><a target='_blank' href={emailLink}><FaEnvelopeOpen /></a> </span>
            </div>
            <style jsx>{`
            .icons {
                font-size: 20px;
                display: inline-block;
                :global(svg) {
                    margin: 2px;
                    fill: ${theme.color.brand.primary} !important;
                }
            }
            @from-width desktop {
                .icons :global(a svg) {
                    margin-top: 2px;
                    transition: 500ms;
                }
                @media (hover: hover) {
                    .icons :global(a:hover svg) {
                        margin-top: 0px;
                        margin-bottom: 10px;
                        fill: ${theme.color.brand.primaryDark} !important;
                    }
                }
            }
            `}</style>
        </React.Fragment>
    )
}

export default SocialShare;