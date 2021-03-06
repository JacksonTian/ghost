# Web Ghost API documentation

## API
### Ghost
构造函数  
```
var ghost = new Ghost(opts);
```
opts的选项有：  
`browser`： 浏览器，默认为`firefox`。其余支持的值有`chrome`、`ie`、`opera`、`safari`、`iphone`、`internet explorer`  
`host`：指定Selenium服务位置。默认为`localhost`  
`port`：指定Selenium服务的端口。默认为4444  

### status([callback])  
实例方法。获取WebDriver服务器的状态  
`callback`：返回服务端状态，包括os和build。  

### open([callback])  
实例方法。打开浏览器客户端  
`callback`：浏览器打开后会执行  

### go(url, [callback])  
实例方法。访问一个URL地址  
`url`：网页地址  
`callback`：页面打开后会执行。  

### url(callback)  
实例方法。获取当前页的URL地址  
`callback`：返回当前页面的URL。  

### getTitle(callback)  
实例方法。获取当前页面title  
`callback`: 返回title  

### isVisible(selector, callback)  
实例方法。查看一个元素是否可见。  
`selector`：css选择器。  
`callback`：返回isVisible(true/false)标识。  

### click(selector, [callback])  
实例方法。根据选择器点击一个元素。  
`selector`：css选择器  
`callback`：可选的回调函数  

### await(time)  
实例方法。等待一段时间  
`time`：等待时间，单位毫秒  

### text(selector, callback)  
实例方法。根据选择器，获取文本值  
`selector`：css选择器  
`callback`：返回文本值  

### val(selector, value, [callback])  
实例方法。查找某个输入元素，输入值  
`selector`：css选择器  
`value`：输入值  
`callback`：输入完毕后执行回调

### val(selector, [callback])  
实例方法。查找某个输入元素，获取值  
`selector`：css选择器  
`callback`：返回元素的值

### hasClass(selector, className, callback)  
实例方法。根据选择器查找元素，并获取该元素是否包含指定的class  
`selector`：css选择器  
`callback`：返回是否含有某个类

### attr(selector, attributeName, callback)  
实例方法。根据选择器查找元素，并获取该元素的属性  
`selector`：css选择器  
`attributeName`：属性名  
`callback`：返回属性的值  

### done(callback)  
实例方法。前述方法执行完毕后，将会调用回调执行  
`callback`：回调函数  

### end(callback)  
实例方法。关闭浏览器，结束回话  
`callback`： 回话结束后，调用执行  

### getAlertText([callback])  
实例方法。获取弹出框上的文本  
`callback`： 回话结束后，调用执行，返回弹出框上的文本

### accept([callback])  
实例方法。点击弹出框alert、confirm、prompt的确认按钮
`callback`： 回话结束后，调用执行  

### dismiss([callback])  
实例方法。点击弹出框alert的确认按钮，confirm、prompt的取消按钮
`callback`： 回话结束后，调用执行  