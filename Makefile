NODE=docker run -it -p 0.0.0.0:3000:3000 --rm -v $(shell pwd)/app:/usr/src node

docker-build:
	docker build -t node .

dev:
	$(NODE) yarn dev

command:
	$(NODE) $(COMMAND)

install:
	$(NODE) yarn add $(PACKAGE)