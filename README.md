for run application with server and client use the next commands:
1 - docker compose up --build
2 - then you gonna see the client at the port localhost:8000 and the server at the port localhost:3000
3 - for running the test :
3.1 docker ps, and then take de id of the container you want to check the test
3.2 docker exec -it <idcontainer> sh
3.3 npm run test
