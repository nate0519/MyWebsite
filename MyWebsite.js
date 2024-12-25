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

    //照片檢視器
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.getElementById('close-lightbox');
    const prevPhoto = document.getElementById('prev-photo');
    const nextPhoto = document.getElementById('next-photo');
    const photos = document.querySelectorAll('.photo');
    let photoIndex = 0;
    function showPrevImage(){
        photoIndex = (photoIndex - 1 + photos.length) % photos.length;
        lightboxImg.src = photos[photoIndex].src;
    }
    function showNextImage(){
        photoIndex = (photoIndex+1) % photos.length;
        lightboxImg.src = photos[photoIndex].src;
    }
    photos.forEach((photo,index) =>{
        photo.addEventListener('click', () =>{
            photoIndex = index;
            lightboxImg.src = photo.src;
            lightbox.classList.add('visible');
        });
    });
    closeLightbox.addEventListener('click', ()=>{
        lightbox.classList.remove('visible');
    });
    lightbox.addEventListener('click', (e) =>{
        if(e.target === lightbox){
            lightbox.classList.remove('visible');
        }
    });
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




