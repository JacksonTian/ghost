REPORTER = dot
TESTTIMEOUT = 2000
TESTS = test/*.js
PID = $(shell ps -ef | grep java | grep selenium-server | sed -n '1p' | awk '{print $2}') 


boot:
	bin/chromedriver &
	java -jar bin/selenium-server-standalone-2.24.1.jar > logs/out.log &
	@echo ".. Booted."

test:
	@NODE_ENV=test mocha \
		--reporter $(REPORTER) --timeout $(TESTTIMEOUT) $(TESTS)

.PHONY: test boot
