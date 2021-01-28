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
                <span><a target='_blank' href={twitterLink} title="Share on Twitter"><FaTwitter /></a></span>
                <span><a target='_blank' href={facebookLink} title="Share on Facebook"><FaFacebook /></a> </span>
                <span><a target='_blank' href={redditLink} title="Share on Reddit"><FaReddit /></a> </span>
                <span><a target='_blank' href={linkedinLink} title="Share on LinkedIn"><FaLinkedin /></a> </span>
                <span><a target='_blank' href={pocketLink} title="Share on Pocket"><FaGetPocket /></a> </span>
                <span><a target='_blank' href={emailLink} title="Email this post"><FaEnvelopeOpen /></a> </span>
            </div>
            <style jsx>{`
            .icons {
                font-size: 20px;
                // display: inline-block;
                display: flex;
                justify-content: center;
                margin-bottom: 25px;
                :global(svg) {
                    margin: 10px;
                    fill: ${theme.color.brand.primary} !important;
                }
            }
            @from-width desktop {
                .icons :global(a svg) {
                    margin: 10px;
                    transition: 500ms;
                }
                @media (hover: hover) {
                    .icons :global(a:hover svg) {
                        // margin-top: 0px;
                        // margin-bottom: 10px;
                        fill: ${theme.color.brand.primaryDark} !important;
                    }
                }
            }
            `}</style>
        </React.Fragment>
    )
}

export default SocialShare;