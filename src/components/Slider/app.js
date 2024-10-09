let nextDom = document.getElementById("next");
let prevDom = document.getElementById("prev");
let carouselDom = document.querySelector(".carousel");
let listItemDom = document.querySelector(".carousel .list");
let thumbnailDom = document.querySelector(".carousel .thumbnail");

function showSlider(type){
  let itemSlider = document.querySelectorAll('.carousel .list .item');
  let itemThumbnail = document.querySelectorAll('.carousel .thumbnail .item')

  if(type === 'next'){
      listItemDom.appendChild(itemSlider[0])
      thumbnailDom.appendChild(itemThumbnail[0])
      carouselDom.classList.add('next')
    }
}

nextDom.onclick = function(){
    showSlider('next')
  }