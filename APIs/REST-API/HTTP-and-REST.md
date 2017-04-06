---
layout: page
title: HTTP and REST
---

## HTTP

HTTP (HyperText Transfer Protocol) is a request-response protocol that is used by web applications to communicate, typically, with web servers: the client requests content from the server, the server executes that request, and the server then returns a response to the client.  In a typical web browser scenario: your web browser requests a HTML file from the server (the web browser forms and sends a *HTTP request*), the server processes that request, and the server returns the content to the client (the server forms and sends back a *HTTP response*).

A *HTTP request* is built of a number of parts:
* A request line (which denotes the resource which is requested) including the [request method](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods).
* Optional [header fields](https://en.wikipedia.org/wiki/HTTP_request_header_field) which further detail the content the client would like, e.g. the accepted content types.
* A newline.
* An optional [message body](https://en.wikipedia.org/wiki/HTTP_message_body).

A *HTTP response* is built of similar parts:
* A response [status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes).
* Optional [header fields](https://en.wikipedia.org/wiki/HTTP_response_header_field) which further detail the response given, e.g.accepted content type.
* A newline.
* An optional [message body](https://en.wikipedia.org/wiki/HTTP_message_body).

[More information on HTTP can be found on Wikipedia](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)

## REST

Whilst REST (Representational state transfer) is not designed to only function over HTTP, HTTP is the most common protocol over which REST functions.

[More information on REST can be found on Wikipedia](https://en.wikipedia.org/wiki/Representational_state_transfer)