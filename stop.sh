#!/bin/bash
set -e

docker-compose down --remove-orphans
docker system prune -a -f