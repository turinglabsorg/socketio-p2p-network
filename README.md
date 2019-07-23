## Simple P2P experiment with SocketIO and ExpressJS

Install dependencies with ```npm intall``` first.

Open two different terminals and run something like this:

```
node peer.js --port=3000 --peer=http://localhost:3001
```

and on the other one run:


```
node peer.js --port=3000 --peer=http://localhost:3001
```

You will see the two peers communicate in a bidirectional way pinging each other forever!
