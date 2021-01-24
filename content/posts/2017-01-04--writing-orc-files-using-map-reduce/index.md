---
title: Writing ORC files using Map Reduce
tags: ["BIG DATA","HIVE","JAVA","PROGRAMMING"]
author: Amita Shukla
---


Let's talk about text files first. Storing data as text files is the simplest thing to do. But there are many, many other requirements that just cannot be fulfilled by that. Dealing with text data comes with its challenges... 


 


### Hey, why don't you text me?

#### Delimiters.

The delimiters give a hard time. When you have huge data to handle (we are talking about Big Data here), storing them as text files means we need to define a character that separates the data into columns and rows. But what if this special character is a part of the data itself? So, if you think that ^ is a character that is highly unlikely to occur in the data, you will most probably encounter it in the next batch! You do need data munging to make sure the data doesn't get messed up.

 


#### Performance.

Being Selective, suppose you have a huge dataset and you wish to query a small part of it. Let's say you write a query in Hive. But to answer your query on text data, hive now needs to read the whole data set until it finds the result. This incurs performance penalties.

 


### Column Oriented Formats

Then comes this thing called Column Oriented Formats. According to Tom White in Hadoop The Definitive Guide :

_A column-oriented layout permits columns that are not accessed in a query to be skipped._

_ 
_

So, if I need to read a single columns only, then also the whole row is loaded into the memory. But with column oriented formats you can escape that. Hence, it gives you performance benefits when we need to fire queries involving only a small number of columns.

Column oriented formats need to maintain row splits in buffer, hence they need memory for reading and writing purposes.

 


### ORC File Format

First thing first, ORC stands for Optimised Row Columnar. ORC is under the project Apache Hive, is used to efficiently store Hive data.It offers excellent compression ratios through the use of Run length encoding. Data stored in ORC format can be read through HCatalog so any Pig or MapReduce program can work with ORC format seamlessly.

 


### Writing ORC using MapReduce

ORC files can be written using Java MapReduce. For this, we need a Mapper class and a driver class.

 


Let us suppose we have data stored in the form of text files, in HDFS. We need to migrate that data to a hive table storing it in ORC format.

 


Consider the data first:

 
Now, it's time to write the mapper. 
 
The mapper contains two methods, `setup()`and `map()`. 
The `setup()` method contains the code that is run once for all the instances of `map()` that are launched. The ORC Serde requires to specify the type string - A string that specifies the column name and the corresponding data types. Next, I create a `mapping` object, a mapping between columns and their datatypes. This mapping is used in the `map()` method later. 
 
The `map()` method contains the code to read each line, process it, and write it in ORC format at the specified location. But, as seen from the signature, each line comes in `Text` format. For storing the data in respective data types, we spilt the line into columns and parse the data type according to the `mapping` object using the method `buildList()`. The `buildList()` method returns a list of objects, i.e. the parsed data in its respective data type. 
 
The Driver class for calling the mapper is written like this: 
 
 
The method `setNumReduceTasks()` sets the number of reducers to 0. This is an indication that the output of the mapper goes as the final output. The input and the output path are taken as the arguments. For writing in ORC, we set the output key as `NullWritable` and output value as `Writable.` 


Let me now provide other POJOs used here : 
 
 
 
In the above method `buildList()`, I have caught the exception instead of throwing it so that the mapper doesn't stop entirely if the data is not according to its expected datatype (Suppose a null value). 
 
For running the application, export the class files in a jar archive, and then execute the hadoop jar command, providing the input and output HDFS locations: However, here it is important to export the `HADOOP_CLASSPATH`. Also, all external jars needed, like here, I included the hive jars under the libjars option. 



 $ classpath=`echo /usr/lib/hive/lib/* | sed 's/ /:/g'`
 $ export HADOOP_CLASSPATH=\"$classpath\"
 $ libjars=`echo /usr/lib/hive/lib/* | sed 's/ /,/g'`
 $ hadoop jar ORCWriter.jar FileMapperDriver -libjars $libjars /user/cloudera/in /user/cloudera/output 

