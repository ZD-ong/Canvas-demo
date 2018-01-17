var canvas = document.getElementById('main')

var pageWidth = document.documentElement.clientWidth
var pageHeight = document.documentElement.clientHeight

canvas.width = pageWidth
canvas.height = pageHeight

window.onresize = function () {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
}

var context = canvas.getContext('2d')

var painting = false
var lastPoint = { x: undefined, y: undefined }

//当鼠标按下
canvas.onmousedown = function (a) {
    painting = true
    var x = a.clientX
    var y = a.clientY
    lastPoint = { 'x': x, 'y': y }
    drawCircle(x, y, 2)
}

//鼠标移动
canvas.onmousemove = function (a) {
    if (painting) {
        var x = a.clientX
        var y = a.clientY
        var newPoint = { 'x': x, 'y': y }
        drawCircle(x, y, 2)
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint //时刻更新终点
    }
}

//鼠标抬起
canvas.onmouseup = function (a) {
    painting = false
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