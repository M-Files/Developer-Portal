---
layout: page
title: Concepts
---

## HTTP

HTTP (HyperText Transfer Protocol) is a request-response protocol that is used by web applications to communicate, typically, with web servers: the client requests content from the server, the server executes that request, and the server then returns a response to the client.  In a typical web browser scenario: your web browser requests a HTML file from the server (the web browser forms and sends a *HTTP request*), the server processes that request, and the server returns the content to the client (the server forms and sends back a *HTTP response*).

![Visualisation of a HTTP request and response using Telerik Fiddler](request-response.png)

A *HTTP request* is built of a number of parts:
* A request line (which denotes the resource which is requested) including the [request method](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods).
* Optional [header fields](https://en.wikipedia.org/wiki/HTTP_request_header_field) which further detail the content the client would like, e.g. the accepted content types.
* A newline.
* An optional [message body](https://en.wikipedia.org/wiki/HTTP_message_body).

![A HTTP request](request.png)
<p class="note">The HTTP header (including the request line) is highlighted by a <span css="color: blue">blue line</span>, and the request body (blank in this case) highlighted by a <span css="color: red">red line</span>.</p>

A *HTTP response* is built of similar parts:
* A response [status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes).
* Optional [header fields](https://en.wikipedia.org/wiki/HTTP_response_header_field) which further detail the response given, e.g.accepted content type.
* A newline.
* An optional [message body](https://en.wikipedia.org/wiki/HTTP_message_body).

![A HTTP response](response.png)
<p class="note">The HTTP header (including the response status code) is highlighted by a <span css="color: blue">blue line</span>, and the response body highlighted by a <span css="color: red">red line</span>.</p>

[More information on HTTP can be found on Wikipedia](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)

## REST

Unlike HTTP, REST is not a protocol. Whilst REST (Representational state transfer) is not designed to only function over HTTP, HTTP is the most common protocol over which REST functions.  REST is not a language used for communication.  Instead, REST is a set of architectural principles which typically include:

* The use of URIs to identify resources (e.g. `/REST/objects/0/123` may identify an object of type `0` with ID `123`).
* The use of verbs (typically [HTTP request methods](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods)) to define the action being taken (e.g. `GET` requests details of the resource, whilst `DELETE` removes it).
* The use of content negotiation (i.e. the ability for the requestor to describe what content types it can accept, and for the server to choose one to describe the content).  *Note that the M-Files Web Service is typically used with the JSON content type.*.

[More information on REST can be found on Wikipedia](https://en.wikipedia.org/wiki/Representational_state_transfer)

## Serialization and Deserialization

In order to pass data structures from the calling application to the server, and back again from the server to the calling application, they must be serialised (converted to structured text) and then deserialised (converted back again).  Whilst the [MFWS has experimental support for data encoded in XML](https://www.m-files.com/mfws/parameters.html), most calling applications use [JavaScript Object Notation](http://json.org) instead, and this will be used in all samples.
