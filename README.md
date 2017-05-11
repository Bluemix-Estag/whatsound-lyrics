# WhatSound Lyrics MicroService



Endpoint to get a JSON object of watson lyrics response

REST API example:

```
    GET https://lyrics-api.mybluemix.net/whatsound/api/v1/vagalume/lyrics/values?track=Shape%20Of%20You&artist=Ed%20Sheeran
```

Requesting a JSON Object having context artist and music, to get Lyric's for Watson.

# Response:

```
 {
    lyrics": {
    "track": "\"The club isn't the best place to find a lover\\nSo the bar is where I go\\nMe and my friends at the table doing shots\\nDrinking faster and then we talk slow\\nCome over and start up a conversation with just me\\nAnd trust me I'll give it a chance now ...
    "target": "\"[A Sua Forma] \\n\\nA balada não é o melhor lugar para se achar um amor\\nEntão eu vou para o bar\\nEu e meus amigos na mesa tomando shots\\nBebendo cada vez mais rápido, então falamos devagar\\nVenha aqui e comece uma conversa só comigo\\nE confie em mim, eu vou dar uma chance agora\\nPegue a minha mão, pare\\nColoque Van Morrisson para tocar\\nE aí nós começamos a dançar\\nE agora estou cantando
  },
  "message": "",
  "status": true
    }
 }

```
