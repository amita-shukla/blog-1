---
title: Dynamic Programming : Rod Cutting Problem
tags: ["ALGORITHMS","DATA STRUCTURES","JAVA","PROGRAMMING"]
author: Amita Shukla
---


One of the most popular problem based on Dynamic Programming is Rod Cutting. 
 


### Problem Statement

Given a rod of n inches and a table of prices, determine the maximum revenue that can be obtained by cutting up the rod and selling the pieces.

 


For example, let the prices be as:

 


| **Length** | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
| ---------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Price** | 1 | 5 | 8 | 9 | 10 | 17 | 17 | 20 | 24 | 30 |

 


For further details of the problem, have a look in the CLRS book. 
 
Given a rod of a particular length, there can be many combinations in which it can be cut. However, the length of each piece can be sold as per given in the table, yielding different revenue. Hence, the task is to maximize this revenue. 
 
 


[![](https://www.cs.indiana.edu/~achauhan/Teaching/B403/LectureNotes/images/07-rodcutting-example.jpg)](https://www.cs.indiana.edu/~achauhan/Teaching/B403/LectureNotes/images/07-rodcutting-example.jpg)

 
 
A recursive solution may seem obvious: 
 


However this solution is really inefficient. This is because the above routine calls itself again and again with the same parameter values. Hence, it solves its subproblems repeatedly. 
 
So we need some optimizations. Dynamic Programming comes to rescue! 
 


#### Top Down Memoization

A minor tweak is that we can save the results as and when they are computed.

 


 


This is top down approach. 
 


#### Bottom Up Method

In this method, we first evaluate the revenue for subproblems and save it in a array. The result of sub problems that is saved is used to solve a larger problem.

 


In the above code, you may observe that I have written the condition of the inner loop as `j <= i / 2`. This is an optimization. If the condition was instead `j < i`, then, the loop would have computed the same result twice. 
e.g. The revenue for a cut 1,3 is the same as the cut 3,1. 
A discussion on the above : <http://stackoverflow.com/questions/7198585/dynamic-programming-rod-cutting> 
 


#### Print Complete Solution

Till now our function just returns an int value, that is the maximum obtainable revenue. However, we might like to know the points at which the rod should be cut. To get the optimum solution, we need to extend the above solution to save the points of cutting in a 'solution' array.

This 'solution' array is then supplied to the print function that prints the cuts. 
You can view the code for this problem here: 
<https://github.com/amita-shukla/programs/blob/master/DpRodCut.java> 
 


 


The solution can be printed using the top down approach as well. 
The other versions of this problem may be : A cost is associated with each cut as well. To solve this problem, what we can do is write the dp condition as: 
 
`q = max( q, p [j]+ dp[ i−j ] − c )` 
 
Another interesting version of the rod cutting problem is <http://qa.geeksforgeeks.org/4063/minimize-the-cutting-cost-latest-google-question>.

