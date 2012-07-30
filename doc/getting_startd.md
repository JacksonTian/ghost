利用Web Ghost实现和WebDriver[The 5 Minute Getting Started Guide](http://code.google.com/p/selenium/wiki/GettingStarted)实例相同的效果。

```javascript
var Ghost = require('webghost');

var ghost = new Ghost();
ghost.open() // 打开浏览器
.go("http://www.google.com/") // 访问Google
.val('input[name="q"]', "Cheese!") // 输入Cheese!
.submit("#tsf") // 提交表单
.await(1000) // 暂停1秒，等待跳转
.getTitle(function (title) {
  console.log("Page title is: " + title); // 打印标题
});
```

原始例子：

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;

public class Example  {
    public static void main(String[] args) {
        // Create a new instance of the html unit driver
        // Notice that the remainder of the code relies on the interface, 
        // not the implementation.
        WebDriver driver = new HtmlUnitDriver();

        // And now use this to visit Google
        driver.get("http://www.google.com");

        // Find the text input element by its name
        WebElement element = driver.findElement(By.name("q"));

        // Enter something to search for
        element.sendKeys("Cheese!");

        // Now submit the form. WebDriver will find the form for us from the element
        element.submit();

        // Check the title of the page
        System.out.println("Page title is: " + driver.getTitle());
    }
}
```
