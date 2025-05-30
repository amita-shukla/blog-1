[![Netlify Status](https://api.netlify.com/api/v1/badges/4e24a428-9862-4780-a83c-394809b92249/deploy-status)](https://app.netlify.com/sites/lucid-brown-a29dc1/deploys)

# Personal Website + Blog

Have a peek: [https://www.amitashukla.in](https://www.amitashukla.in)

## Features

- **Responsive** and streamlined design.
- GatsbyJS compiles the site into HTML+CSS+JS so **hosting costs nothing** at providers like Netlify.
- **Blazing fast** UX: The website is visible and functional after only 1 round trip and ~20kB of data. That first round trip can be super fast to anywhere in the world, because the blog is only static assets which can be delivered by CDN. Subsequent pageloads render ~instantly thanks to link prefetching.
- Autogenerated **tracedSVG image placeholders** are stylized to create a smooth look and transition as the image loads without the page jumping around.
- Write blog posts into **Markdown** files (easy to format and content will not be married to any platform). A new page can also be created as a markdown file and it can be automatically set up.
- **Expandable**: possible to embed custom React components into Markdown.
- Posts organized by **tags**.
- **Teasers** of posts are generated to front page with **infinite scroll** which gracefully degrades into **pagination**.
- Allow readers to be notified of updates with **RSS feed** and email newsletter.

## Feel free to fork

[![License: MIT](badge-mit.svg)](https://opensource.org/licenses/MIT)
[![License: CC BY 4.0](badge-cc.svg)](https://creativecommons.org/licenses/by/4.0/)

You are free to use this repo to create your own blog (code is MIT licensed). You may also use the written content in this blog however you like, provided that you [give appropriate credit](https://creativecommons.org/licenses/by/4.0) (CC BY 4.0).

#### How to create your own blog with this repo

- Basic setup
    - Prerequisites: learn about ReactJS and GatsbyJS.
    - This project is confirmed to work with GatsbyJS `v4.25.9`, node `v18.20.8`, npm `v10.8.2`.
    - Recommended: Use `nvm` to switch between Node versions. The node version is added to .nvmrc file as well.
    - Fork and `npm install`.
    - Install gatsby cli with `npm install -g gatsby-cli`
    - Run in development mode with `gatsby develop`. First run will take several minutes, but subsequent runs will be faster.
    - Run in production mode with `gatsby build && gatsby serve` (or `./fastbuild.sh`). If you want to delete `cache` and `public` before building, use `./slowbuild.sh` (recommended for releases to avoid leaking development data). You may have to make the scripts executable before you are able to run them (`chmod +x filename`).
- Make it your own
    - Go through everything in `content/meta/config.js` and `content/pages`(used to create individual pages) and `content/parts` (used to import content into components)
    - Delete the directory `blogger_source`, containing the blog posts that I sourced from Blogger.
    - Search all files for "amita" and "atte".
    - Replace `static/preview.jpg` (this is the image that is used when someone shares a link to your blog on a social network like Reddit). Recommended aspect ratio is 1.91.
    - When you publish, make sure caching and redirects work reasonably. I recommend Netlify, in which case cache configuration in `static/_headers` is fine and you just need to edit 1 line in `static/_redirects`.
    - Move your own icons into `src/images/app-icons`, run `npm run generate-app-icons`, then replace `static/favicon.ico`.
    - Environment variables can be set in a `.env` file. It's good practice to keep it in `.gitignore` so it doesn't get published to the repo. When you publish your website, find out how you can add environment variables to your host without publishing the `.env` file. If you are wondering why environment variables are used, it is to store values that are particular to your account. e.g. currently I have properties such as `CONTACT_ADDRESS`, `POSTS_FOLDER` and `EMAIL_SUB_LINK`.
    - There is an e-mail newsletter form on the `Follow` page. Set up a newsletter and add the Mailchimp API POST endpoint as an environment variable `EMAIL_SUB_LINK`. I am using MailChimp to set email campaigns. The plugin used is `gatsby-plugin-mailchimp`.
    - [OPTIONAL]  Currently the content in the Contact page comes from `parts/contact.md`. A form can be set up for handling your form submissions (check the older commits for `contact.js`). The POST address where forms are sent is defined in environment variable `CONTACT_POST_ADDRESS`. Google Script can be used to handle form submissions. [instructions](https://github.com/dwyl/learn-to-send-email-via-google-script-html-no-server) and [an improved version of the script](handleFormSubmission.gs). 
    - [OPTIONAL] If you want a "Hero" section at the top of the home page, just set `hero.hide` to `false` in `theme.yaml`.
    - [OPTIONAL] If you want [Plausible Analytics](https://plausible.io/): add `PLAUSIBLE_DOMAIN=mywebsite.com` to environment variables.
- Creating content
    - Blog posts are in `mock_posts` and `posts` folders. By default only mock posts are used (to help you tweak the website before you have a lot of content). You can switch to real posts by creating an environment variable `POSTS_FOLDER=posts`. Please try not to accidentally repost my real posts if you are only tinkering.
    - When you create posts, a folder with a name like `2020-03-05--my-book-review` will be published, whereas a name like `my-book-review` will be considered a draft and will not be published. There are ways to accidentally publish drafts. If you are worried about that, the easiest way to avoid it is to deploy your site from GitHub via Netlify and _never commit draft posts to the repo_.

## Attribution

Hi, I'm Amita. I didn't do everything by myself; I leveraged the work of many awesome creators.

I started building on top of [Atte Juvonen](https://github.com/baobabKoodaa) awesome [blog](https://github.com/baobabKoodaa/blog). Icons are mostly from [FontAwesome](https://origin.fontawesome.com/).

Main changes from Atte's version:

- Converted the blog starter to a portfolio website. This involved creating a new landing page, an `About` component, a new `/blog` page for blog posts, and a new `/notes` for shorter posts.
- add support for [Disqus](https://disqus.com/) comments under each blog post
- Removed author bio from under each post, as the blog says everywhere that the posts are written by me. (The author content still exists, to be included in case of guest posts).
- Removed the contact form, and simply provided the email address. This has its pros and cons but I decided to go for a hassle free approach...
- Added subscribtion form in the follow page itself, that hits the [MailChimp](https://mailchimp.com/) subscribe API directly.
- Fixed RSS feed and added more properties. Added title, link, image, tags etc. information. This RSS feed I then utilize to create Newsletter in MailChimp.
- Added 'time to read' metadata for each blog post.
- Added social share buttons at the bottom of each blog post.
- Removed the cover image for each post on the blog page. They needed to be resized to an aspect ratio, and I felt images were taking much more space than the actual content.
- Earlier it was mandatory to supply a cover image for each post. Removed the condition as I felt this condition was a hinderance in competion of a blog post. Added appropriate conditions in the `ReImg` component and elsewhere to handle that.
- Fixed tags to point to correct path
- Changed the date format to a more user-friendly one.

You can checkout the list of issues to see what all is under development!
