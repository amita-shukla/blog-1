---
title: Providing

author: Amita Shukla
---


Let's talk about Map Reduce Programming. It is simple in the first go. In fact, dealing with distributed systems has never been simpler. Design your job into Map and Reduce tasks. Implement these functions, create a jar, and run the hadoop jar command on your Hadoop cluster. Voila! A whole lot of things done on any amount of data. 
But, Map Reduce runs with its default set of configurations, and these defaults may not fit your particular case. When it comes to dealing with big data over a distributed environment, we need some tweaks every now and then. 
 


### Let's take an example.

The number of Reducers. If the number of reducers is more, then it results in a lot of reshuffling over the network and reduces performance. If it turns out to be less, then it anyways results in overloading each reducer with too much of map data. So what is the solution? Make the number of reducers configurable, on each run, depending on the data you are dealing with. 
 
The above example was just one of the configs. You may require a lot more : 


 


So, there has to be a way to plug in these configurations into the code from outside. Now, for running our Map Reduce job, we need to fire the hadoop jar command : 


 


`hadoop jar <jar-path> <class-name> <options>`

 


We know that the options passed through command line are directly treated as arguments to the java program. Here is where the role of Tool Runner comes to play.

 


> _The ToolRunner is a command interpreter. It works in conjunction with GenericOptionsParser to parse the generic hadoop command line arguments and modifies the Configuration of the Tool. The application-specific options are passed along without being modified._

 


Let's see the difference with this small program : 
 


 
I trigger the following command : 


> `hadoop jar tool.jar Test -Dmapred.reduce.tasks=0 arg1 args2`

 
The output of the above program is as follows: 
 


 
As we can see, all the arguments are taken as it is by the main method. However, when the run method is called the ToolRunner magic happens. It interprets the configurations passed to the program and separates them out of the other arguments. 
 


## How ToolRunner works?

To get a deeper understanding of what happens under the hood, let's have a look at the source code of the ToolRunner class : 
 


It's pretty simple. The run method internally calls the GenericOptionsParser : the class that does the command line arguments parsing, and parses the options. The call to run() at the last calls the run() of the Tool class, that is responsible for triggering the job. 
 
Now that we have our Hadoop settings as well as our arguments handled pretty well, we can focus on the rest of our MapReduce application!

