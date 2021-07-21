---
title: Keeping Code Private in a Public Repository
tags: ["GIT"]
cover: drafts.jpg
author: Amita Shukla
---

In this post I talk about how I am managing my draft posts private while keeping all the published content part of a public repository. 

[Skip Intro](#lets-begin) below and jump right to commands.

A few months before [I launched my blog on a fresh platform](https://amitashukla.in/blog/announcing-an-all-new-and-improved-site/). Instead of using Blogger, I had shifted to Static Site Generator Gatsby, and published the blog on Github. The blog is open-sourced, hence all the activities are up on display. All was good, but soon I realized the one flexibility offered by Blogger that I was taking for granted, DRAFT POSTS! For example, these were my pending posts on Blogger: 

<re-img src="blogger_drafts.png"></re-img>

The above list is nothing compared to what I had before the Grand Cleanup: I carried out a Swachhata Abhiyan and deleted the posts that were never meant to be written. It doesn't mean that these posts were meant to be published, it was just that I had added some content to these so I didn't feel like losing them. Well, bygones are bygones.

It took me a lot of courage though to publish the above list. Maybe I shall carry out another Swachhata Abhiyan and delete this post as well, so if you're viewing this, then you're probably looking at a limited edition post... 

I never realized before putting all my posts publicly that my draft posts will also need to be made public. I had a few options now:
1.    Just put up my posts out there, in a directory named 'drafts'. Who is gonna visit your profile anyway! And whoever does look, they can, and let's be positive here, give me positive feedback.

2.    Do not commit the draft posts at all, just keep them in your local system (recommended by the author from whom I forked this project).

Both the above approaches did not sound good to me:

1.  Just like my dressing style, I like it to be presentable. Of course, not all my repos are presentable. But this repository is different in the sense that I talk about this one a lot. Also just like I like to change clothes privately, I like to write posts privately.

<p>
<center><img src="monkey_typing.gif"></img></center>
</p>

2.  This completely defeats the purpose, I need those draft posts everywhere so that I can add on to them as soon as I get an idea. 

<p>

So here it is. The repo that is behind this blog always contains the published content. Of course, the other development efforts that go into the repo are public (check out this list of issues), but the drafts need to be hidden. They wield a lot of power (of destroying my image of writing well-thought-out posts). 

<re-img src="drafts.jpg"></re-img>

##<a name="lets-begin">Let's begin</a>

Here is the flow I am working on currently to manage my private posts.

1. **Create a private repository** on Github.

2. **Add Private Remote**: Go to your repository on local, and add another remote called 'private', pointing to the private repository.

3. **Push code to Private Remote**: Push to this private remote. Now your local code is hosted to two remote repositories, one public and one private.

Now all we need to do is push public content to public remote (`origin`) and private content on private remote (`private`)

Each remote has an associated main branch. For origin it is master, and for private it is 'draft'

4. **Move to Anchor Branches**: Every time I start a new post, I first switch from master to draft. 

```git
git checkout master
git checkout draft
```

5. **Update Draft Branch**: Now before I start with anything, this branch needs to be updated with the latest development work on origin.

```git
git pull origin master
git push private draft
```
Now, the two remotes are in sync.

5. **Create Feature Branch**: In this way, I also make sure that the draft branch remains my anchor branch from where all the new draft post branches can have their own cut. So, I create another branch from the draft branch. I follow a format where the post branches start with `post/` prefix. can have their own cut. So, I create another branch to from draft. I follow a format where the post branches start with 'post/' prefix.

```git
$ git checkout -b post/how-to-draft-posts
Switched to a new branch 'post/how-to-draft-posts' 
```

6. **Code**: Now starts the regular flow of writing, I create a new directory under `content` directory and in it place the index.md and start writing...

After I am done, I can do my regular testing on local using `gatsby develop` command.

7. **Push to Private**: Now suppose I am not done with this post completely. So, I, very carefully, push this post to the **private** remote repository.

`git push private post/how-to-draft-posts`, or `git push -u private post/how-to-draft-posts` if doing for the first time. This takes up the current state of the branch and pushes it to the private repository.

The above steps 5-7 I keep following until I am done with my post.

8. **Pull Your Work from Private**: If I am on a different machine, and I need to continue with my private post/code, I need to first pull it up. For this, I update my remotes on my local:

```git
git remote update

git checkout post/how-to-draft-posts
```    

9.  **Push to Origin**: Now once I am done with the draft, and have tested it locally, I am all set to make it public, and ready to publish. Hence, I push my code to origin.

```git
git push -u origin post/how-to-draft-posts
```

10. **Create Pull Request**: Next, continuing with the usual flow, create a pull request, the code now being ready to be merged to master.