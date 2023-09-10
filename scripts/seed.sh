#!/bin/bash

export DBNAME=social

docker-compose exec mongo mongoimport --db=$DBNAME --collection=messages --file=/tmp/seeds/messages.json
docker-compose exec mongo mongoimport --db=$DBNAME --collection=users --file=/tmp/seeds/users.json
docker-compose exec mongo mongoimport --db=$DBNAME --collection=follows --file=/tmp/seeds/follows.json
docker-compose exec mongo mongoimport --db=$DBNAME --collection=likes --file=/tmp/seeds/likes.json
