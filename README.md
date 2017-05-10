# WhatSound Conversation MicroService



Endpoint to get a JSON object of watson converation response

REST API example:

```
    POST https://whatsound-conversation.mybluemix.net/
```

Sending a JSON Object having context object and text, to continue Watson Conversation's chat

# Response:

```
 {
    text = [{"Ola"}], 
    context : { } 
    ...
 }

```

@return An object of all the conversation params
