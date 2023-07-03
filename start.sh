#!/bin/bash
set -e
TEMP=$1
SERVICE=${TEMP:-""}

docker-compose up $SERVICE --build --remove-orphans