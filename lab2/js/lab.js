function toggleColor(){
  background = document.getElementById("content");
  title = document.getElementById("title-lab2")
  if(background.style.backgroundColor == "teal"){
    background.style.backgroundColor = "#3ae691"
    title.style.backgroundColor = "cyan"
  }else{
    background.style.backgroundColor = "teal"
    title.style.backgroundColor = "salmon"
  }
}
