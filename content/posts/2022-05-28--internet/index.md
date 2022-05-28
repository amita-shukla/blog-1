---
title: Internet
tags: ["TECHNOLOGY"]
author: Amita Shukla
---

# What is Internet
Internet is nothing but a network of machines connected **globally**. The purpose of the creation of internet was to create a network to exchange information from not a centralized but a distributed system. A centralized system is one where all the information to be passed comes to a single place/machine, and then that machine relays that information to the respective recepient. Creating a decentralized system meant there is no single place to relay information to/from, thus decreasing the chances of failure.

So if the printer at your home is connected to your PC with a wire, would you call it internet? The answer is no because this is your personal network and not the global network the internet is. If you PC connects to your wifi router, and that router is in turn connected to an internet provider service, then your PC becomes a part of the internet. 

But how do all these machines in the entire world know how to talk to each other? It is because they all communicate using the same set of rules, called the **protocol**. This protocol is called the **Internet Protocol**. 

# Mode of communication
Now we talk about this global network called internet, but how is this made possible? How can I send an email from New Delhi to New York (11,747 km)? 

Well whether you send a text, a song or a cat video over the internet, it is all sent in the form of 0 and 1 signals. Each 0/1 signal is called a **bit**, and 8 bits make a **byte** and 1024 bytes make a **kilo byte** and 1024 kil bytes make a **mega byte** and 1024 mega bytes make a **giga byte**. So if you send a pdf book of about 350 pages over the internet, it means you wish to send a about 3 bytes over the internet.

So for these machines on the internet, all it has to do is deal with these bits. Now to send these bits accross the world, you can send via the following modes:

- radio waves: So if you type your message on your phone connected to the wifi, it is sent across to a nearest router wirelessly, using radio waves. These waves only travel through short distances, and that is why you try to get into the 'wifi range' to get connected to the internet.
- electricity: Once these bits reach upto your router, your router probably has a wired connection to your Internet Service Provider, and then these bits are realyed over those wires as electric signals. But even these electric signals are not able to travel that far.
- light: So what else can we use to send signals 0&1 over far distances that is even faster than electricity? It is light. We have laid down these huge optical fibres throughout the world, even under the ocean, to travel across the world.

So any information or activity over the internet travels over these modes to go to the right recepient.

# Routers and Packets
We are talking about routers, so before moving forward let me explain what a router is. It is basically a device that receives these bits, and directs these to wherever they are meant to go to. A Router is the answer to the next question we are going to talk about.

So that next question comes is: if we are only sending bits of information, why not all this information gets mixed?? So if me and my brother are both sending these bits to the same wifi router, how come never such a mistake occurs that I get his message and he gets mine?

Well that's because I lied when I said we only send bits. On top of bits we send a lot of other information also. We actually send not individual bits but **packets**, which is basically a unit of data, that on top of bits of data (called the **payload**) also contain other info such as  the sender's address, the recepient address, protocol used etc.

So both your message and your brother's message are sent to the same router, but you do not receive that message because you're not the recepient. That is why you see this warning everywhere to refrain from sending confidential information over a public wifi, because any 'hacker' can tap that router, unwrap all the packets, and read all your data without you knowing.

# IP addresses and DNS
Just like to reach to a particular destination you need an address, each device on the internet has an address assigned to it, called an **IP address**. So when you try to visit a website, you (a **client**) sends a request to the device where the website is running (a **server**) by providing the IP address of the device 