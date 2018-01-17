var canvas = document.getElementById('main')

fullScreen()

//获取页面宽高
function fullScreen() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
}

window.onresize = function () {
    fullScreen()
}

var context = canvas.getContext('2d')

var using = false
var lastPoint = { x: undefined, y: undefined }

//当鼠标按下
canvas.onmousedown = function (a) {

    var x = a.clientX
    var y = a.clientY
    if (eraserEnable) {
        using = true
        context.clearRect(x-5, y-5, 10, 10)
    } else {
        using = true
        lastPoint = { 'x': x, 'y': y }
    }

}

//鼠标移动
canvas.onmousemove = function (a) {
    var x = a.clientX
    var y = a.clientY
    if (eraserEnable) {
        if (using) {
            context.clearRect(x-5, y-5, 10, 10)
        }
    } else {
        if (using) {
            var newPoint = { 'x': x, 'y': y }
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint //时刻更新终点
        }
    }
}

//鼠标抬起
canvas.onmouseup = function (a) {
    using = false
}


//画点函数
function drawCircle(x, y, radius) {
    context.beginPath()
    context.fillStyle = 'black'
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
}

//画线函数
function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.strokeStyle = 'black'
    context.moveTo(x1, y1) //起点
    context.lineWidth = 5
    context.lineTo(x2, y2) //终点
    context.stroke()
    context.closePath()
}

//function for eraser
var eraserEnable = false
eraser.onclick = function () {
    eraserEnable = !eraserEnable
}