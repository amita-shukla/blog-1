---
title: Undo everything in Git - Part 2
tags: ["GIT"]
cover: git.png
author: Amita Shukla
---

### undo a merge commit

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
