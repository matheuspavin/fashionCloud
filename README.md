# Fashion Cloud Test - Matheus Pavin Pedroso

**Use at will, but quote, so we're all happy.**

**CONTACT INFO:**

**[Matheus Pavin](https://matheuspavin.github.io/index.html)**

# Instructions

**This project is intended to run on unix systems**

1. As said, this project needs a mongodb instance running on mongodb://127.0.0.1:27017/
1. In the main folder run the following command: **npm start**

### IMPORTANT
**Inside the /server/utils folder, it has a file with the Requests set up. It is called Requests.json**
**The mongodb settings can be modified in the config.js file, inside the config folder.**

### Running the tests
1. Start the server.
1. In the main folder run the following command: **npm test**
1. It will run, stop and provide the output on the terminal
1. The tests run in a different collection, not modifying the main collection.


## ENDPOINTS

**Endpoint that returns the cached data for a given key**
- GET
- http://localhost:4300/cache/:key

**Endpoint that returns all stored keys in the cache**
- GET
- http://localhost:4300/cache

**Endpoint that creates/updates the data for a given key**
- POST
- http://localhost:4300/cache/:key

**Endpoint that removes a given key from the cache**
- DELETE
- http://localhost:4300/cache/:key

**Endpoint that removes all keys from the cache**
- DELETE
- http://localhost:4300/cache
