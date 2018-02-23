var canvas = document.getElementById('main')
//获取cavas上下文
var context = canvas.getContext('2d')
var lineWidth = 5

autoSetCanvasSize(canvas)
listenToUser(canvas)





//画点函数
function drawCircle(x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
}

//画线函数
function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1) //起点
    context.lineWidth = lineWidth
    context.lineTo(x2, y2) //终点
    context.stroke()
    context.closePath()
}

var eraserEnable = false
brush.onclick = function(){
    eraserEnable = false
    lineWidth = 8
    brush.classList.add('active')
    eraser.classList.remove('active')
    pen.classList.remove('active')
}
eraser.onclick = function(){
    eraserEnable = true
    eraser.classList.add('active')
    brush.classList.remove('active')
    pen.classList.remove('active')
}
pen.onclick = function(){
    eraserEnable = false
    lineWidth = 5
    pen.classList.add('active')
    eraser.classList.remove('active')
    brush.classList.remove('active')
}
clear.onclick = function(){
    context.clearRect(0, 0, canvas.width, canvas.height)
}
save.onclick = function(){
    var url = canvas.toDataURL('image/png')
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '我的画布'
    a.click()
}

black.onclick = function(){
    context.strokeStyle = '#333333'
    context.fillStyle = '#333333'
    black.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    yellow.classList.remove('active')
}
green.onclick = function(){
    context.strokeStyle = '#fdcf46'
    context.fillStyle = '#fdcf46'
    green.classList.add('active')
    blue.classList.remove('active')
    yellow.classList.remove('active')
    black.classList.remove('active')
}
blue.onclick = function () {
    context.strokeStyle = '#fc4e42'
    context.fillStyle = '#fc4e42'
    blue.classList.add('active')
    green.classList.remove('active')
    yellow.classList.remove('active')
    black.classList.remove('active')
}
yellow.onclick = function () {
    context.strokeStyle = '#1173b9'
    context.fillStyle = '#1173b9'
    yellow.classList.add('active')
    blue.classList.remove('active')
    green.classList.remove('active')
    black.classList.remove('active')
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

function listenToUser(canvas) {

    var using = false
    var lastPoint = { x: undefined, y: undefined }
    
    //特性检测
    if(document.body.ontouchstart !== undefined){
        //触屏设备
        canvas.ontouchstart = function(a){
            console.log(1)
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            console.log(x,y)
            using = true
            if (eraserEnable) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = { 'x': x, 'y': y }
            }
        }
        canvas.ontouchmove = function(a){
            console.log(2)
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
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
        canvas.ontouchend = function(){
            console.log(3)
            using = false
        }
    }else{
        //非触屏设备
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
    
}