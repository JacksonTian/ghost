#!bash

filedir=`dirname $0`
version='21.0.1180.4'

curl -o $filedir/chromedriver_linux64.zip https://chromedriver.googlecode.com/files/chromedriver_linux64_$version.zip
curl -o $filedir/chromedriver_linux32.zip https://chromedriver.googlecode.com/files/chromedriver_linux32_$version.zip
curl -o $filedir/chromedriver_mac.zip https://chromedriver.googlecode.com/files/chromedriver_mac_$version.zip
curl -o $filedir/chromedriver_win.zip https://chromedriver.googlecode.com/files/chromedriver_win_$version.zip
curl -o $filedir/selenium-server-standalone-2.24.1.jar http://selenium.googlecode.com/files/selenium-server-standalone-2.24.1.jar

