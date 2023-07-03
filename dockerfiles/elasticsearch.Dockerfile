FROM elastic/elasticsearch:8.8.1

# Path: dockerfiles/elasticsearch.Dockerfile

ENV discovery.type=single-node
ENV ES_JAVA_OPTS="-Xms512m -Xmx512m"
