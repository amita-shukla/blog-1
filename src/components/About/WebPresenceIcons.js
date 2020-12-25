import React from "react"
import theme from "../../theme/theme.yaml";
import { FaGithub, FaStackOverflow, FaLinkedin, FaTwitter, FaGetPocket, FaGoodreads } from 'react-icons/fa'
import config from "../../../content/meta/config";

const WebPresenceIcons = () => {
    return (
        <div className="wrapper">
            <div className="icons">
                <a href={config.authorLinkedin} target="_blank"><FaLinkedin/></a>
                <a href={config.authorGithub} target="_blank"><FaGithub/></a>
                <a href={config.authorTwitter} target="_blank"><FaTwitter/></a>
                <a href={config.authorStackoverflow} target="_blank"><FaStackOverflow/></a>
                <a href={config.authorPocket} target="_blank"><FaGetPocket/></a>
                <a href={config.authorGoodreads} target="_blank"><FaGoodreads/></a>
            </div>
            <style jsx>{`
            .wrapper {
                text-align: center;
            }
            .icons {
                display: inline-block;
                font-size: 40px;
                :global(svg) {
                    margin: 10px;
                    fill: ${theme.color.brand.primary} !important;
                }
            }
            @from-width tablet {
                .icons {
                    font-size: 60px;
                }
            }
            @from-width desktop {
                .icons :global(a svg) {
                    margin-top: 20px;
                    transition: 500ms;
                }
                @media (hover: hover) {
                    .icons :global(a:hover svg) {
                        margin-top: 0px;
                        margin-bottom: 20px;
                        fill: ${theme.color.brand.primaryDark} !important;
                    }
                }
            }
            `}</style>
        </div>
    );
};

export default WebPresenceIcons;