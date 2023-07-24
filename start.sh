#!/bin/bash
set -e

TEMP=$1
IS_BACKGROUND=${TEMP:-false}

if [ "$IS_BACKGROUND" = "true" ]; then
  docker-compose --env-file docker-compose.env up --build --remove-orphans -d
else
  docker-compose --env-file docker-compose.env up --build --remove-orphans
fi