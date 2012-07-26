Ghost
========

Node Front-end automation test framework written in Node.js.  
基于Selenium WebDriver和Camme的Webdriverjs实现。


# Prerequirement
- 下载[webdriver2.0服务包](http://code.google.com/p/selenium/downloads/detail?name=selenium-server-standalone-2.24.1.jar&can=2&q=)
- 运行下载到的服务包(请替换x为对应的版本号)  

```
java -jar selenium-server-standalone-2.x.x.jar
```
- 如果需要在Chrome上运行自动化脚本，请下载[Chrome driver](http://code.google.com/p/chromedriver/downloads/list)

# Installation
```
npm install webghost
```


# TODO
1. 熟悉webdriverjs.
2. 利用工具类跑通交互行为.
3. 集成mocha/should.
4. 组织成框架.
5. 写cases.