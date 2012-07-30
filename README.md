Ghost
========

Node Front-end automation test framework written in Node.js.  
基于Selenium WebDriver和借鉴Camme的Webdriverjs实现。为何不直接采用Webdriverjs，原因有二：  
1. Camme的代码风格看似沿袭C\#  
2. Webdriverjs代码中职责不单一，包含驱动部分和测试部分代码。相对而言，测试部分代码不是那么优秀，所以选择结合`mocha`完成整个框架。保持各自的职责单一性。  
3. API接口沿袭过去的方式，不太贴合前端。Ghost尽量提供jQuery风格的API给工程师，使得编写自动化测试代码可以更愉快。  

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

# Documentation
[Getting Started with Web Ghost](https://github.com/TBEDP/ghost/blob/master/doc/getting_started.md)  
[API Documentation](https://github.com/TBEDP/ghost/blob/master/doc/APIs.md)  


# TODO
1. 熟悉webdriverjs.
2. 利用工具类跑通交互行为.
3. 集成mocha/should.
4. 组织成框架.
5. 写cases.