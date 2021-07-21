---
title: Keeping Code Private in a Public Reposiory
tags: ["GIT"]
cover: drafts.jpg
author: Amita Shukla
---

[Skip Intro](#lets-begin)

A few months before I launched my blog on a fresh platform. Instead of using Blogger, I had shifted to Static Site Generator Gatrsby, and published the blog on Github. The blog is open sourced, hence all the activities are up on display. All was good, but soon I realized the one flexibility offered by Blogger that I was taking for granted, DRAFT POSTS! For example, these were my pending posts on Blogger: 

<re-img src="blogger_drafts.png"></re-img>

The above list is nothing compared to what I had before the Grand Cleanup: I carried out a Swachhata Abhiyan and deleted the posts that were never meant to be written. It doesn't mean that these posts were meant to be published, it was just that I had added some content to these so I didn't feel like losing them. Well, bygones be bygones.

It took me a lot of courage though to publish the above list. May be I shall carry out another Swachhata Abhiyan and delete this post as well, so if you're viewing this, then you're probably looking at a limited edition post. 

I never realized before putting all my posts publicly that my draft posts will also need to be made public. I had a few options now:
- Just put up my posts out there, there is a drafts folder in my code. Who is gonna visit your profile anyway. And whoever does look, they can, and lets be positive here, give me positive feedback.
- Do not commit the my draft posts at all, just keep them in your local system (recommended by the author from whom I forked this project)

Both the above approaches did not sound good to me:
- Just like my dressing style, I like it to be presentable. Ofcourse, not all my repos are presentable. But this repository is different in the sense that I talk about this one a lot. Also just like I like to change clothes privately, I like to write posts privately.

<re-img src="monkey_typing.gif"></re-img>

- This completely defeats the purpose, I need those draft posts every where so that I can add on to them as soon as I get an idea. 

So here it is. The repo that is behind this blog always contains the published content. Ofcourse, the other development efforts that go into the repo are public (check out this list of issues), but the drafts need to be hidden. They wield a lot of power (of destroying my image of writing well thought-out posts). 

<re-img src="drafts.jpg"></re-img>

## Let's begin

Here is the flow I am working on currently to manage my private posts.

1. Create a private repository on Github.

2. Go to your repository on local, and add another remote called 'private', pointing to the private repository.

3. push to this private remote. Now your code on your system is actually on two servers, one public and anoter private.

Now all we need to do is push public content to public remote (origin) and private content on private remote (private)

Each remote has an associated main branch. For origin it is master, and for private it is 'draft'

4. every time I start a new post, I switch from master to draft. 

```
git checkout master
git checkout draft
```

5. Now before I start with anything, this branch needs to be updated with the latest development work on origin.

```
git pull origin master
git push private draft
```
Now, the two remotes are in sync.

5. In this way, I also make sure that the draft branch remains my anchor brach from where all the new draft post can have their own cut. So, I create another branch to from draft. I follow a format where the post bracnhes start with 'post/' prefix.

```
$ git checkout -b post/how-to-draft-posts
Switched to a new branch 'post/how-to-draft-posts' 
```

6. Now starts thre regular flow of writing, I create a new directory under content folder and in it place the index.md and start writing...

After I am done, I can do my regular testing on local using gatsby develop command

7. Now suppose I am not done with this post completely. So, I, very carefully, push this post to the **private** remote repository.

git push private post/what-an-idea-sir-ji, or git push -u private post/what-an-idea-sir-ji if doing for the first time.

This takes up the current state of branch and pushes it to the private repository.

The above steps 5-7 I keep following until I am done with my post.

Now once I am done with the draft, and have tested it locally, I just need to retrace my steps. i.e.
git push -u origin post/what-an-idea-sir-ji

Next, I create a pull request, ready to merged to master