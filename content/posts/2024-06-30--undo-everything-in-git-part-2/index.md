---
title: Undo everything in Git - Part 2
tags: ["GIT"]
author: Amita Shukla
---

In my previous post Undo Git part 1, I disucussed various scenarios when you're developing your code locally, and the commands to undo your changes using git. Now, in this post we discuss the undo strategies when we have pushed our code to remote already.

To make any kind of changes to a remote repository, one needs to make changes locally, and then push them to local. 
### Undo a commit already pushed to remote repository

Consider a commit pushed to a remote repository:

<re-img src="commit_in_repo.png"></re-img>

Here's how it looks locally:
```git
$ git log
commit 5dd42d0b09f344380bd9445e25cfc1549d30a803 (HEAD -> master, origin/master, origin/HEAD)
Author: amita-shukla <amitashukla0906@gmail.com>
Date:   Sun Jun 30 13:49:27 2024 +0530

    commit8

commit e0659d87c69f37ff625f53924571316c693e1eed
Merge: a07f7bc c58946b
Author: Amita Shukla <amitashukla0906@gmail.com>
Date:   Sat Jun 1 22:06:58 2019 +0530

    Merge pull request #1 from amita-shukla/feature
    
    Feature
```

Undoing this commit involves 2 steps:
1. Undo a commit locally
2. Force push

Detailed scenarios on how to undo a commit locally are described here. Let's discuss 2 of those scenarios:

#### undo using git revert
We can use `git revert`, which creates a new commit on top of the commit. Refer the steps to do so here. Now, once the change is reverted locally, push the change to remote. You do not need to force push, as this is a normal commit and doesn't change the history.

#### undo using git reset
Now, if we wish to change the history, we can use `git reset`. Now we may want to keep our change locally or erase the changes altogether. Here, I am choosing the example where we wish to erase the commit from history:

```git
commit 5dd42d0b09f344380bd9445e25cfc1549d30a803 (HEAD -> master, origin/master, origin/HEAD)
Author: amita-shukla <amitashukla0906@gmail.com>
Date:   Sun Jun 30 13:49:27 2024 +0530

    commit8
```
We reset to the commit previous to the current `HEAD` commit (=`HEAD^`):

```git
$ git reset --hard HEAD^
HEAD is now at e0659d8 Merge pull request #1 from amita-shukla/feature
```
Confirm using `git log`, the latest commit `HEAD` is gone.

```git
$ git log
commit e0659d87c69f37ff625f53924571316c693e1eed (HEAD -> master)
Merge: a07f7bc c58946b
Author: Amita Shukla <amitashukla0906@gmail.com>
Date:   Sat Jun 1 22:06:58 2019 +0530

    Merge pull request #1 from amita-shukla/feature
    
    Feature
```
Observe that push won't work:
```git
$ git push origin master
To https://github.com/amita-shukla/sample-repo.git
 ! [rejected]        master -> master (non-fast-forward)
error: failed to push some refs to 'https://github.com/amita-shukla/sample-repo.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```
Now, force push:
```git
$ git push --force origin master
Total 0 (delta 0), reused 0 (delta 0)
To https://github.com/amita-shukla/sample-repo.git
 + 5dd42d0...e0659d8 master -> master (forced update)
```

Confirm remotely:
<re-img src="reverted_commit_remote.png"></re-img>

### undo a merge commit

#### A merge commit
A merge commit is a special type of commit as it has 2 parents instead of 1. Consider the output of `git log` after I have merged my pull request from a branch `feature` to `master`:

```git
$ git log
commit e0659d87c69f37ff625f53924571316c693e1eed (HEAD -> master, origin/master, origin/HEAD)
Merge: a07f7bc c58946b
Author: Amita Shukla <amitashukla0906@gmail.com>
Date:   Sat Jun 1 22:06:58 2019 +0530

    Merge pull request #1 from amita-shukla/feature
    
    Feature
```
Compare this to a normal commit:
```git
commit a07f7bcfdbabb13fbda35f615deb61fdbb30cd5b
Author: Amita Shukla <amitashukla0906@gmail.com>
Date:   Sat Jun 1 22:03:10 2019 +0530

    commit7
```

As you see, the merge commits mentions the merge happening between the two parent commits: `Merge: a07f7bc c58946b`.

#### revert and push
As mentioned in the previous post about reverting a commit, you can revert a commit locally, and then push the reverted commit to remote. This is the safest way to undo a commit, without touching history.

```git
git checkout master
git revert -m 1 [SHA of the merge commit]
git push
```

### undo a rebase
```git
# reset to the point after which the rebase started
git reset --hard HEAD@{5}

# run below command if the rebase didn't finish
git rebase --abort
```

### undo a push
make sure no one is pulling changes from your branch
dont' mess with the space time continuum

https://stackoverflow.com/questions/134882/undoing-a-git-rebase/135614#135614

```
git revert <latest commit>
git push
```

change history

```git
git push -f origin last_known_good_commit:branch_name
```

### undo a merged pull request

### undo a deleted branch
