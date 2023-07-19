#!/bin/bash
set -e

docker-compose --env-file docker-compose.env up --build --remove-orphans -d