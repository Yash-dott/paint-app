let selected_btn = document.querySelectorAll(".selected_btn")
let color_checkbox = document.querySelector("#color_checkbox")
let color_picker = document.querySelector("#color_picker")
let progress_bar = document.querySelector("#progress_bar")
let clear_canvas_btn = document.querySelector("#clear_canvas_btn")
let download_canvas = document.querySelector("#save_canvas")
let canvas = document.querySelector("#canvas")
let ctx = canvas.getContext("2d");
let ismouseclick = false
let selected_tool
let prev_offsetX , prev_offsetY
let prev_canvas

window.addEventListener("load",()=>{
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
})

// get selected tool
selected_btn.forEach((selected_btn)=>{
    selected_btn.addEventListener("click",()=>{
        selected_tool = selected_btn.id
    })
})

mousepress=(e)=>{
    ismouseclick = true
    prev_offsetX = e.offsetX
    prev_offsetY = e.offsetY
    ctx.beginPath()
    prev_canvas = ctx.getImageData(0, 0, canvas.width, canvas.height)
}


draw=(e)=>{
    if(!ismouseclick){
        return;
    }
    ctx.putImageData(prev_canvas, 0, 0)

    // rectangle
    if(selected_tool == "Rectangle"){

        if(color_checkbox.checked){
            ctx.fillRect(e.offsetX , e.offsetY, (prev_offsetX - e.offsetX), (prev_offsetY - e.offsetY))
            ctx.fillStyle = `${color_picker.value}`
        }else{
            ctx.lineWidth = progress_bar.value;
            ctx.beginPath()
            ctx.rect(e.offsetX , e.offsetY, (prev_offsetX - e.offsetX), (prev_offsetY - e.offsetY))
            ctx.stroke()
        }
    }

    // circle
    if(selected_tool == "Circle"){

        ctx.beginPath()
        ctx.arc(prev_offsetX, prev_offsetY ,(e.offsetX - prev_offsetX), 0, 2 * Math.PI);

        if(color_checkbox.checked){
            ctx.fillStyle = `${color_picker.value}`
            ctx.fill()
        }else{
            ctx.lineWidth = progress_bar.value;
            ctx.stroke()
        }
    }

    // brush
    if(selected_tool == "Brush"){

        ctx.lineWidth = progress_bar.value;
        ctx.lineTo(e.offsetX, e.offsetY)
        ctx.strokeStyle = `${color_picker.value}`
        ctx.stroke()
    }
    if(selected_tool == "Eraser"){
        ctx.clearRect(e.offsetX, e.offsetY, progress_bar.value, progress_bar.value)
    }

}

document.addEventListener("mousemove",draw)
document.addEventListener("mousedown",mousepress)
document.addEventListener("mouseup",()=>{
   ismouseclick = false
})


// clear canvas
clear_canvas_btn.addEventListener("click",()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})


// download canvas image
download_canvas.addEventListener("click",()=>{
    let anchor = document.createElement("a")
    anchor.setAttribute("download","text.jpg")
    anchor.href = `${canvas.toDataURL()}`
    anchor.click()
})