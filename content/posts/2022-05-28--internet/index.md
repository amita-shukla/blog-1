---
title: How Internet Works
tags: ["TECHNOLOGY"]
cover: http_call.png
author: Amita Shukla
---

## What is Internet
Internet is nothing but a network of machines connected **globally**. The purpose of the creation of internet was to create a network to exchange information from not a centralized but a distributed system. A centralized system is one where all the information to be passed comes to a single place/machine, and then that machine relays that information to the respective recepient. Creating a decentralized system meant there is no single place to relay information to/from, thus decreasing the chances of failure.

So if the printer at your home is connected to your PC with a wire, would you call it internet? The answer is no because this is your personal network and not the global network the internet is. If you PC connects to your wifi router, and that router is in turn connected to an internet provider service, then your PC becomes a part of the internet. 

But how do all these machines in the entire world know how to talk to each other? It is because they all communicate using the same set of rules, called the **protocol**. This protocol is called the **Internet Protocol**. 

## Modes of Communication
Now we talk about this global network called internet, but how is this made possible? How can I send an email from New Delhi to New York (11,747 km)? 

Well whether you send a text, a song or a cat video over the internet, it is all sent in the form of 0 and 1 signals. Each 0/1 signal is called a **bit**, and 8 bits make a **byte** and 1024 bytes make a **kilo byte** and 1024 kil bytes make a **mega byte** and 1024 mega bytes make a **giga byte**. So if you send a pdf book of about 350 pages over the internet, it means you wish to send a about 3 bytes over the internet.

So for these machines on the internet, all it has to do is deal with these bits. Now to send these bits accross the world, you can send via the following modes:

- radio waves: So if you type your message on your phone connected to the wifi, it is sent across to a nearest router wirelessly, using radio waves. These waves only travel through short distances, and that is why you try to get into the 'wifi range' to get connected to the internet.
- electricity: Once these bits reach upto your router, your router probably has a wired connection to your Internet Service Provider, and then these bits are realyed over those wires as electric signals. But even these electric signals are not able to travel that far.
- light: So what else can we use to send signals 0&1 over far distances that is even faster than electricity? It is light. We have laid down these huge optical fibres throughout the world, even under the ocean, to travel across the world.

So any information or activity over the internet travels over these modes to go to the right recepient.

## Routers and Packets
We are talking about routers, so before moving forward let me explain what a router is. It is basically a device that receives these bits, and directs these to wherever they are meant to go to. A Router is the answer to the next question we are going to talk about.

So that next question comes is: if we are only sending bits of information, why not all this information gets mixed?? So if me and my brother are both sending these bits to the same wifi router, how come never such a mistake occurs that I get his message and he gets mine?

Well that's because I lied when I said we only send bits. On top of bits we send a lot of other information also. We actually send not individual bits but **packets**, which is basically a unit of data, that on top of bits of data (called the **payload**) also contain other info such as  the sender's address, the recepient address, protocol used etc.

So both your message and your brother's message are sent to the same router, but you do not receive that message because you're not the recepient. That is why you see this warning everywhere to refrain from sending confidential information over a public wifi, because any 'hacker' can tap that router, unwrap all the packets, and read all your data without you knowing.

## IP addresses and Domains
Just like to reach to a particular destination you need an address, each device on the internet has an address assigned to it, called an **IP address**. So when you try to visit a website, you (a **client**) sends a request to the device where the website is running (a **web server**) by providing the **IP address** of the device. e.g. 174.129.14.120

This IP address is called the **IPv4** address, consists of 4 parts (just like a mailing address would have parts such as house number, locality, state, country etc.). This entire address is 32 bits long, with around 4 billion unique addresses. 

But the internet is getting more and more devices connecting to it, and we are transitioning to a much longer IPv6 addresss system, that uses 128 bits. 


But these addresses for a human mind are really hard, and that is why we map them to some familiar name which you normally type into your browser, such as `google.com`. This is called a **domain name**. Now these are not any random names, these names have to fall into a naming system, e.g. for an address `https://accounts.google.com`, `com` is called a **top level domain**, `google` is the **domain name**, `accounts` is the **subdomain**, `http` is the **protocol** used to fetch the contents from google.com. And also, `google.com` is called the **root domain**.

## DNS
The domains that we talked about above are what we as humans need to remember in order to connect to a server. But the internet only reach out to a device by using its IP address only. So we maintain a mapping of domain names -> IP addresses in DNS servers (Domain Name System servers). A DNS server is what we first reach out to get the IP address of the server of a website.

Now imagine the time it would take to look for an address if all of them are saved at a single place. The DNS servers instead are distributed hierarchially, with around 14 root level domains mapping to domains such as `.com`, `.org` etc. This distribution makes the search really fast, and most of the times once an address is resolved, it is cached by our ISP for future use.

So whenever we goto a browser and type a website name, we are doing nothing but going to the DNS servers, interpret the IP address associated with the website name (domain name), and then goto that IP address and get the contents of that server. The address `http://google.com` indicates the how and what we need to get. We use a protocol called HTTP, that enables us to GET a document of type HTML.

<re-img src="http_call.png"></re-img>

## HTTP

Whenever we have to hit a website we basically hit a server using the HTTP protcol. HTTP stands for **Hyper Text Transfer Protocol**. We talked about the Internet Protocol (IP) earlier, which standardized the way packets talked with each other. HTTP protcol is a 'higher level'  protocol which guides the internet to transfer contents of a webpage. 

> By 'higher level' we mean it's an application layer protocol, which is the topmost layer of packaging of the data being transferred...

Now as we have seen a lot of times, a webpage contains not only some text, it contains tables, images, videos, links to other pages. And all these webpages are designed differently, meaning these webapges come with their own styling information as well.

All this is encapsulated in a file written in HTML format or **Hyper Text Markup Language**.

We can use HTTP to not only fetch hyper text documents, we also have expanded it to get images, audio, video, or to POST form data from the client (your browser) to the server.

While HTTP is used to transfer things, it is not responsible to maintain a connection between two entities. It needs to use another protocol for doing so, and while it need not be connection based, it does need that protocol to be reliable, hence it uses a protocol called **TCP/IP** (I know I am too late to introduce it here...).

A TCP connection is first established, and then is used to send a request (or several) and receive a response.

## Epilogue

There is so much to go deep into the internet. Just like the internet itself, the knowledge about how it works is too deep as well. This high level stuff helped me to explain internet to people who, well, don't understand it. I also realized after this they started to get bored and hungry. So I am making a conscious decision to not bore you further. 

For me, this has been a very refreshing post. It felt like ages I went into this beginner stuff and nonetheless I realized its importance coz I had forgotten some of it!