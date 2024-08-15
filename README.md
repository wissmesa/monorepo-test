# Test Toolbox - Luis Mesa

## Documentation

Once the project has been cloned, Run

```bash
npm install
```

on both the server and client, then

```bash
docker compose up --build
```

in the root to build the two applications; In the case of the client it runs on port: 8000 and for the server: 3000.

## Running Tests

To run tests, run the following command

```bash
  docker ps
  docker exec -it <CONTAINER_ID> sh
  npm run test
```
