REPORTER = dot
TESTTIMEOUT = 10000
TESTS = test/*.js
SS_PID = $(shell ps -ef | grep bin/selenium-server | grep -v grep | awk '{print $$2}')
SYSTEM_NAME = $(shell uname -a | awk '{print $$1}')
SYSTEM_VERSION = $(shell uname -a | awk '{ print $$NF }')
PROJECT_DIR = $(shell pwd)

ensure-driver:
	rm -rf bin/chromedriver
	@if [ $(SYSTEM_NAME) == Darwin ]; then \
		unzip -o -d bin bin/chromedriver_mac.zip; \
	fi
	@if [ $(SYSTEM_NAME) == Linux ]; then \
		unzip -o -d bin bin/chromedriver_linux64.zip; \
	fi

boot: stop ensure-driver
	PATH=$(PROJECT_DIR)/bin:$(PATH) java -jar bin/selenium-server-standalone-2.24.1.jar > out.log &
	@echo "selenium start."
	@sleep 6

stop:
	@if [ "$(SS_PID)" != "" ]; then \
		kill $(SS_PID); \
	fi

test: boot
	@NODE_ENV=test node_modules/mocha/bin/mocha \
		--reporter $(REPORTER) --timeout $(TESTTIMEOUT) $(TESTS)
	@$(MAKE) stop

.PHONY: test boot stop ensure-driver
