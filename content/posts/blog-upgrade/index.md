---
title: Checkout my New and Improved Portfolio + Blog
tags: ["PROJECT"]
cover: blogging_meme.jpg 
author: Amita Shukla
---

I started this blog around 5 years ago, and at that time all I wanted was a place to write and publish. I wanted to go with the easiest way possible, and a quick search on "how to blog" yielded Blogger. I explored around it, and set it up with a free domain, a basic theme and a writing pad to write on. 

And since then I kept on adding new stuff to it. I named the blog Scribble, coz scriblling my notes was what I was doing on this blog. I got a custom free theme online that I liked and changed the look entirely. When I started working I realized that how common it was for people to buy domains, so  almost an year later I puchased a domain [amitashukla.in](amitashukla.in). 3 years down the line I discovered Github Pages and created a Portfolio website on top of it. But now I had to maintain 2 domains, one apex running the portfolio site and another subdomain [blog.amitashukla.in](blog.amitashukla.in) running the blog. So I then tweaked the portfolio site's css to look exactly like the blogger site! Overtime the entire site became this legacy software, it was simply a pain to maintain.

## Problems with Blogger
Blogger has been specialized for Blogging for a layman, but being a programmer it always felt limiting to use.
* It has its own platform specific syntax to code its theme. This had a lot of disadvantes, particularly:
  - The theme code was almost opaque. Though it was possible to locate the code for a particular widget, it was always tightly bound to the syntax. The free theme I downloaded had some code like where variables defined in unicodes like below that you just couldn't touch. 
  ```
  _0xeeb6 = eval(function(_0xf41ex1,_0xf41ex2,_0xf41ex3,_0xf41ex4,_0xf41ex5,_0xf41ex6){}...){if(_0xf41ex4[_0xf41ex3]){_0xf41ex1=_0xf41ex1[_0xeeb6[6]]( new RegExp(_0xeeb6[8]+_0xf41ex5(_0xf41ex3)+_0xeeb6[8],_0xeeb6[9]),_0xf41ex4[_0xf41ex3])}};return _0xf41ex1;}(_0xeeb6[0],62,118,_0xeeb6[3][_0xeeb6[2]](_0xeeb6[1]),0,{}));
  ```
  - customizing any widget code was difficult as you needed to understand the special syntax and escape HTML characters inside. Have a look at this navbar code:
  ```
  <b:widget id='Navbar1' locked='false' title='Navbar' type='Navbar'>
  <b:includable id='main'>&lt;script type=&quot;text/javascript&quot;&gt;
  &lt;div id=&quot;navbar-iframe-container&quot;&gt;&lt;/div&gt;&lt;script type=&quot;text/javascript&quot; src=&quot;https://apis.google.com/js/plusone.js&quot;&gt;&lt;/script&gt;&lt;script type=&quot;text/javascript&quot;&gt; gapi.load(&quot;gapi.iframes:gapi.iframes.style.bubble&quot;, function() {if (gapi.iframes &amp;&amp; gapi.iframes.getContext) {
          gapi.iframes.getContext().openChild({
              url: &#39;https://www.blogger.com/navbar.g?targetBlogID\x3d1167440767733751967\x26blogName\x3dScribble\x26publishMode\x3dPUBLISH_MODE_HOSTED\x26navbarType\x3dDISABLED\x26layoutType\x3dLAYOUTS\x26searchRoot\x3dhttp://blog.amitashukla.in/search\x26blogLocale\x3den_GB\x26v\x3d2\x26homepageUrl\x3dhttp://blog.amitashukla.in/\x26vt\x3d-6316158993390569589&#39;,
              where: document.getElementById(&quot;navbar-iframe-container&quot;),
              id: &quot;navbar-iframe&quot;
          });
        }
      });
  ```   
  If you look closely you would realize it was a script, but it screamed on your face that it wanted to be left alone.
* Blogger has a range of free widgets. After wordpress, perhaps blogger is the one which has the highest number of widgets. These widgets were more or less black-boxed, and that is all there is to it. Anything new I want to add means I again need to code in that blogger specific madness.
* Edit HTML. Blogger has this okeyish editor that you can write on, but anything the least creative needed to be coded in HTML, and I ended up doing that almost everytime. Apart from focussing on content, I was also contantly taking care of breaklines and headers and codesnippets.
* Blogger is a Content Management System (CMS). CMSs run on a server and the data is saved in a DB. Whenever we land on a page, these servers construct the entire page, populate data from database and serves it on the browser. A CMS has just too many moving parts that are simply out of your control.
* probably the most signinfcant of all, your blogger posts are owned by Google. 5-6 years before I wasn't really concerned about Big Companies owning all the data in the world, but these days scenario is different. The last thing I wanted was that I publish something that Google gets offended with and blocks by years of hardwork.

## Options
Well, there are a number of options out there apart from my current arrangements that I thought to move onto.

### WordPress 
Wordpress is on the same wagon as Blogger, it is also a CMS. But wordpress is much more powerful:
  - It has a lot of plugins that you can think about. 
  - You can also self-host it on the platform of your choice. 
  - It also has innumerable resources on every requirement possible. 

This was actually the option I thought about moving to first, but it has its own set of limitations.
  - Wordpress needs more resources to be hosted. I would need to not only buy space on cloud to host my files, but also processing power to run it continuously.
  - This means I would need to worry about managing the platform
  - After Blogger, I didn't want to be tied to any platform. While wordpres provides you it's own nice editor, I will be in the same position years down the line as I am today with Blogger.

### Medium
While medium looks like an excellent platform, but it again poses the problem of owning your content.
  - It looks like I own my content, would I ever read its terms of service before posting?
  - I can own my content, but I have no control over the reading experience it provides. I have heard people bickering about the pop ups, and Medium is just a company whose main focus is to maximise the audience.
It doesn't mean that I am totally anti-medium or similar platforms, a larger audience doesn't hurt. May be I post some of my content there!

## The curious case of Static Site Generators
5 years before when I hadn't even heard about Static Site Generators, I did realize that it was wise to keep my blog posts at a place other than my blogs, and I created a repository [blog](https://github.com/amita-shukla/blog) on Github where I would manually download all the HTML of my post and save them in markdown format. This obviously didn't work for long.

My Github portfolio served the about, contact, project pages of my site. These pages were simply HTML pages. I couldn't even think about adding more functionalities to them, because these were not maintainable. e.g. For a common component such as `NavBar`, had to be coded on all the pages. Then for any change I needed to go and make the same change at three more places.

This is where Static Site Generators come into play, the 'generate' these HTML, CSS and Javascript files. So under the hood:
* I create a normal application 
* Build the app locally
* The app generates simple HTML, CSS and Javascript files.
* These static files can be hosted a at almost free as these are just like any other files.

To add content:
* Create a markdown file
* the static site generator on building picks up these files and creates a separate page on the site for them automatically

## Why Gatsby?
There are a number of Static Site Generators out there, and I wanted to work on an ecosystem which gives me a lot of exposure to a number of libraries. I therefore narrowed down on Javascript based SSGs. I further had experience in React, so Gatsby was one of the top choices.
* Gastby is built on react, I can go on to do all what I can do with React. 
* Gatsby provides an interface on top of React so I don't need to worry about low level plumbing (such as routing) again.
* Optimized for Image hosting: Even though I don't have many images on my blog, I have struggled with images a lot as they seriously affect site performance. Gatsby has advanced mechanisms for keeping images responsive and creating placeholders for smooth transition while an image loads.
* **GraphQL!** Gatsby uses GraphQl to fetch all kinds of data, which I can use anywhere. I found this feature especially empowering.

## Netlify
[Netlify](https://www.netlify.com/) deserves a mention here as switching to it has made the entire workflow easier, with CI/CD, previews, builds, domain settings... all for free!

## What New is In and What old has Gone
- A faster website
- On SSL
- Well structured pages
- No clutter view
- Refined, responsive images
- A more descriptive 'about me' section
- A super cool logo and favicon
- No overflowing Code Snippets
- Emoji support :laughing:

## OpenSource
The blog is open source, meaning that all the source code and content is [here](https://github.com/amita-shukla/blog-1). Do checkout the README file and the issues in pipeline. If interested, you are free to fork (checkout the license).  I am still a beginner in React development, and simply abhore CSS, so all suggestion to improve the code are welcome! :smile: