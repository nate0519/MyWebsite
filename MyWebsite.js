/*document.addEventListener("DOMContentLoaded",function(){
    const transition = document.getElementById("transition");
    
    setTimeout( () =>{
        document.body.style.overflow = 'auto'
    }, 1000);
});*/

document.addEventListener("DOMContentLoaded", function () {
    //加載畫面轉場
    const progressBar = document.getElementById('progress-bar');
    const transition = document.getElementById('transition');
    const progresscontainer = document.getElementById('progress-container');
    const progresstext = document.getElementById('progress-text');
    const loaded = document.getElementById('loaded');
    
    let progress = 0;
    const interval = setInterval(() => {
        if (progress < 100) {
            progress += 10;
            progressBar.style.width = progress + '%';
            progresstext.textContent = progress + '%';
        }else {
            clearInterval(interval);
            setTimeout(() =>{
                transition.classList.add('hidden');
                progresscontainer.classList.add('hidden2');
                loaded.style.opacity = 1;
            },300);
        }
    },100);

    //背景圖片輪播
    const carousel = document.getElementById("web");

    const images = [
        'url("background/IMG_1644.JPG")',
        'url("background/DSC_0154.JPG")',
        'url("background/IMG_2102.JPG")'
    ];

    let currentIndex = 0;

    function backgroundchange(){
        carousel.style.opacity = 0.8;
        setTimeout(() =>{
            currentIndex = (currentIndex+1) % images.length;
            carousel.style.backgroundImage = images[currentIndex];
            carousel.style.opacity = 1;
        },1000);
        
    }

    carousel.style.backgroundImage = images[currentIndex];

    setInterval(backgroundchange,5000);
    //側邊選單
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const pageToList = document.getElementById('page_to_list');

    menuToggle.addEventListener('click', ()=>{
        sideMenu.classList.toggle('open');
        menuOverlay.classList.toggle('visible');
    });
    menuOverlay.addEventListener('click',()=>{
        sideMenu.classList.remove('open');
        menuOverlay.classList.remove('visible');
    });
    pageToList.addEventListener('click', ()=>{
        window.location.href = "list.html";
    });

    //照片檢視器
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const closeLightbox = document.getElementById('close-lightbox');
    const prevPhoto = document.getElementById('prev-photo');
    const nextPhoto = document.getElementById('next-photo');
    const photos = document.querySelectorAll('.photo');
    const countPhoto = document.getElementById('count-photo');
    let photoIndex = 0;
    let count = 0;
    function enterFullScreen(){
        if(lightboxImg.requestFullscreen){
            lightboxImg.requestFullscreen();
        }else if(lightboxImg.webkitRequestFullscreen){
            lightboxImg.webkitRequestFullscreen();
        }else if(lightboxImg.msRequestFullscreen){
            lightboxImg.msRequestFullscreen();
        }
    }
    function exitFullScreen(){
        if(document.exitFullscreen){
            document.exitFullScreen();
        }else if(document.webkitExitFullscreen){
            document.webkitExitFullscreen();
        }else if(document.msExitFullsreen){
            document.msExitFullsreen();
        }
    }
    function toggleFullScreen(){
        if(!document.fullscreenElement){
            enterFullScreen();
        }else{
            exitFullScreen();
        }
    }
    function showPrevImage(){
        photoIndex = (photoIndex - 1 + photos.length) % photos.length;
        lightboxImg.src = photos[photoIndex].src;
        countPhoto.textContent = (photoIndex + 1) + '/' + photos.length;
    }
    function showNextImage(){
        photoIndex = (photoIndex + 1) % photos.length;
        lightboxImg.src = photos[photoIndex].src;
        countPhoto.textContent = (photoIndex + 1) + '/' + photos.length;
    }
    photos.forEach((photo,index) =>{
        photo.addEventListener('click', () =>{
            photoIndex = index;
            count = photoIndex+1;
            lightboxImg.src = photo.src;
            countPhoto.textContent = count + '/' + photos.length;
            lightbox.classList.add('visible');
        });
    });
    //按鈕關閉照片檢視器
    closeLightbox.addEventListener('click', ()=>{
        lightbox.classList.remove('visible');
    });
    //點擊開啟照片檢視器
    lightbox.addEventListener('click', (e) =>{
        if(e.target === lightbox){
            lightbox.classList.remove('visible');
        }
    });
    //按鈕切換全螢幕
    fullscreenBtn.addEventListener('click',toggleFullScreen);
    //ESC關閉照片檢視器
    document.addEventListener('keydown', (e)=>{
        if(e.key === 'Escape'){
            lightbox.classList.remove('visible');
        }
    });
    //左右鍵控制照片
    document.addEventListener('keydown', (e)=> {
        if(e.key === 'ArrowRight'){
            showNextImage();
        }
        else if(e.key === 'ArrowLeft'){
            showPrevImage();
        }
    });
    //按鈕控制照片
    prevPhoto.addEventListener('click',showPrevImage);
    nextPhoto.addEventListener('click',showNextImage);
});




