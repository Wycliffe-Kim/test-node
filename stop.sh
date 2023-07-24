#!/bin/bash
set -e

TEMP=$1
IS_PRUNE=${TEMP:-false}

docker-compose --env-file docker-compose.env down --remove-orphans

if [ $IS_PRUNE = true ]; then
    docker system prune -a -f
fi