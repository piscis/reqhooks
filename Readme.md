# ReqHooks - Post and Pre filter for express/connect
ReqHooks is a simple filter library that sits on top of express/connect. With it you can:  
  
* Enforce URL-Schemes to your routes
* Globally redirect non existing routes to existing routes
* Globally mange response header on on routes 

## The Hooks
In this section you´ll find the information about the hooks that ships with reqhooks.  

## Filter hook  
The filter hook analyses the incoming request and checks if the URL-Scheme in this requests matches your global rules. This is very important if you have SEO sites and need a unique way off linking to it otherwise you might end up with some strange linking behavior.  
  
The good thing about the filter hook is, you can customize it to your needs. There a some default filters out of the box for example:  

*  **toLowerCase** - transform every character to lowercase
*  **toUpperCase** - transform every character to uppercase
*  **whitespace** - Removes whitespaces and adds **-** (minus)
*  **stripLastSlash** - Make sure your urls not ending with a **/** 
*  **noneAlnum** - Removes everything but alphanumeric characters, **.** and **/** 

[Example](http://github.com/piscis/reqhooks/examples/filter/app.js "See the example")  

## Header hook
The header hook is the point where you append headers to the response global before they going back to the client. For example if you have to send out P3P headers on your side this might be the right place to add them.

[Example](http://github.com/piscis/reqhooks/examples/header/app.js "See the example")

## Redirect hook
The redirect hook takes routes for you´re side and redirects them to a existing route. To make your ''app.js'' small and clean you can prepare a external configuration and add it to the redirect hook definition. 
  
[Example](http://github.com/piscis/reqhooks/examples/redirect/app.js "See the example")  