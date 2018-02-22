# Canvas-demo

## 分析项目
### web端
1. 按下鼠标开始
```
canvas.onmousedown = function(){}
```
2. 滑动鼠标画画
```
canvas.onmousemove = function(){}
```
3. 松开鼠标结束
```
canvas.onmouseup = function(){}
```
### 移动端
1. 触屏开始
```
canvas.ontouchstart = function(){}
```
2. 滑动手指
```
canvas.ontouchmove = function(){}
```
3. 移开手指结束
canvas.ontouchend = function(){}

## 所需API
- 获取画布
```
var canvas = document.getElementById('canvas')
```
- 获取画布上下文
```
var context = canvas.getContent('2d')
```
- 填充画布颜色、设置画布大小
```
context.fillStyle= 'red'
context.fillRect(0,0,100,100) //(左x,左y,右x,右y)
```
另，全屏视口宽高(IE并不支持。。。)
```
var pageWidth = document.documentElement.clientWidth
var pageHight = document.documentElement.clientHight
```
**不要使用CSS控制画布宽高（等比缩放）**
- 描边、并设置大小
```
context.strokeStyle = 'yello'
context.strokeRect(10,10,100,100)//(左x,左y,右x,右y)
```
- 画圆
```
context.beginPath()
context.arc(150,150,10,0,360) //(x,y,r,开始角度,Math.PI*2)
context.fill()
```
- 画圆圈
```
context.beginPath()
context.arc(150,150,10,0,360) //(x,y,r,开始角度,Math.PI*2)
context.stroke()
```
- 绘制路径
```
context.beginPath()
context.moveTo(0,0) //起点
context.lineTo(100,100) //终点
context.lineWidth = 5 //线的粗细
context.stroke()
context.closePath()
```
- 橡皮擦
```
context.clearRect(50,50,10,10)
```
