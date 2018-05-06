# Fashion Cloud Test - Matheus Pavin Pedroso

### Use will, but quote, so we're all happy.

# Instructions

**This project is intended to run on unix systems**

1. As said, this project needed a mongodb instance running on mongodb://127.0.0.1:27017/
1. In the main folder run the install.sh script.
1. Run the newly created run.sh file.

### IMPORTANT
** Inside the folder utils, it has a file with the Requests set up. It calls Requests.json

### Running the tests
1. Start the server, by running the run.sh file.
1. Run the file tests.sh.
1. It will run and stop and give the information, on the terminal.


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


## CONTACT INFO
### [Matheus Pavin](https://matheuspavin.github.io/index.html)
