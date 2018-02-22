var canvas = document.getElementById('main')
//获取cavas上下文
var context = canvas.getContext('2d')

autoSetCanvasSize(canvas)
listenToMouse(canvas)





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
    eraserEnable = true
    action.className = 'actions x'
}

brush.onclick = function(){
    eraserEnable = false
    action.className = 'actions'
}


function autoSetCanvasSize(canvas) {
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
}

function listenToMouse(canvas) {

    var using = false
    var lastPoint = { x: undefined, y: undefined }

    //当鼠标按下
    canvas.onmousedown = function (a) {

        var x = a.clientX
        var y = a.clientY
        using = true
        if (eraserEnable) {
            context.clearRect(x - 5, y - 5, 10, 10)
        } else {
            lastPoint = { 'x': x, 'y': y }
        }

    }

    //鼠标移动
    canvas.onmousemove = function (a) {
        var x = a.clientX
        var y = a.clientY
        if (!using) {
            return
        }
        if (eraserEnable) {
            context.clearRect(x - 5, y - 5, 10, 10)
        }
         else {
        var newPoint = { 'x': x, 'y': y }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint //时刻更新终点
    }
}

//鼠标抬起
canvas.onmouseup = function (a) {
    using = false
}
}