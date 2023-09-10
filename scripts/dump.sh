#!/bin/bash

export DBNAME=social

docker-compose exec mongo mongoexport --db=$DBNAME --collection=messages --out=/tmp/seeds/messages.json
docker-compose exec mongo mongoexport --db=$DBNAME --collection=users --out=/tmp/seeds/users.json
docker-compose exec mongo mongoexport --db=$DBNAME --collection=follows --out=/tmp/seeds/follows.json
docker-compose exec mongo mongoexport --db=$DBNAME --collection=likes --out=/tmp/seeds/likes.json
