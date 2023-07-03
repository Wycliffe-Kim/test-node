FROM fluent/fluentd:v1.11.5-debian-1.0

USER root

RUN buildDeps="sudo make gcc g++ libc-dev ruby-dev libffi-dev"
RUN apt-get update
RUN apt-get install -y --no-install-recommends $buildDeps
RUN gem install fluent-plugin-rewrite-tag-filter
RUN gem install fluent-plugin-elasticsearch

EXPOSE 8888