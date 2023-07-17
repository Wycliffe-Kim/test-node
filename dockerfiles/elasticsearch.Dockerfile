FROM docker.elastic.co/elasticsearch/elasticsearch:8.8.2

ENV cluster.name=traffic-commander
ENV bootstrap.memory_lock=true
ENV ES_JAVA_OPTS="-Xms512m -Xmx512m"