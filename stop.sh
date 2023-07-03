#!/bin/bash
set -e
TEMP=$1
SERVICE=${TEMP:-""}

docker-compose down $SERVICE --remove-orphans
docker system prune -a -f