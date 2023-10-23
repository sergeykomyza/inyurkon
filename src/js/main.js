
// ================================================== ПРОКРУТКА, ШАПКА
const headerLogic = ()=> {
    const header = document.querySelector('.header')
    function headerActiveToggle() {
        const scrollSize = window.pageYOffset
        scrollSize > 1 ? header.classList.add('active') : header.classList.remove('active')
    }
    window.addEventListener('load', headerActiveToggle) 
    window.addEventListener('scroll', headerActiveToggle) 
}
const mMenuToggle = ()=> {
    document.querySelector('.js-mmenuToggle').addEventListener('click', ()=>{
        document.querySelector('.header-menu').classList.toggle('active')
    })
}
// =============================================================================== tabs
const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
    const header = document.querySelector(headerSelector),
          tab = document.querySelectorAll(tabSelector),
          content = document.querySelectorAll(contentSelector);
    function hideContent(){
      content.forEach(item => {
        item.style.display = 'none';
      });
      tab.forEach(item => {
        item.classList.remove(activeClass);
      });
    }
    
    function showContent(i){
      content[i].style.display = 'block';
      tab[i].classList.add(activeClass);
    }
    
    header.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target;
      if( target &&
              (target.classList.contains(tabSelector.replace(/\./,"")) ||
          target.parentNode.classList.contains(tabSelector.replace(/\./,"")))){
              tab.forEach((item, i) => {
                  if(target == item || target.parentNode == item){
                      hideContent();
                      showContent(i);
                  }
              });
          }
    });
  
    hideContent();
    showContent(0); 
    
}

// ==================================================\Fancybox
const fancybox = ()=> {
    Fancybox.bind("[data-fancybox]", {
    });
    
    Fancybox.bind('[data-fancybox="news"]', {
        Thumbs: {
          type: 'none',
          autoStart: false,
        },
    });
}

// ================================================== МАСКА ДЛЯ ИНПУТОВ (https://github.com/RobinHerbots/Inputmask)
const inputMask = () => {
    $(".js-maskPhone").inputmask({
        mask: "+7 999 999 99 99",
        clearIncomplete: true
    });
}

// ================================================== СЛАЙДЕР SWIPER (https://swiperjs.com/get-started) 
const sliders = () => {
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'vertical',
        loop: true,
    
        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },
    
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    
        // And if we need scrollbar
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    });
}

// ================================================== parallax
const parallax = (elem, startPos, marker)=> {
    gsap.to(elem, {
        transform: `translateY(${innerHeight / 1}px)`,
        ease: "none",
        scrollTrigger: {
            trigger: elem,
            start: startPos,
            end: "+=1500",
            scrub: true,
            // snap: {
            //     snapTo: 0.5, duration: 1, delay: 0.3, ease: 'back.out(1)'
            // },
            // markers: {
            //     fontSize: '20px',
            //     startColor: 'green',
            //     endColor: 'red'
            // },
            markers: marker
        }
    });
}
    
parallax('.main-page .js-parallax1', "60% 50%", false)
parallax('.main-page .js-parallax2', "40% 50%", false)
parallax('.main-page .js-parallax3', "-20% 50%", false)
// ================================================== КАРТА, ОТЛОЖЕННАЯ ЗАГРУЗКА (ЧТОБЫ УЛУЧШИТЬ ПОКАЗАТЕЛИ - PageSpeed Insights)
const map = ()=> {
    document.addEventListener('DOMContentLoaded', function () {
        setTimeout(function() {
            var headID = document.getElementsByTagName("body")[0];         
            var newScript = document.createElement('script');
            newScript.type = 'text/javascript';
            newScript.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
            headID.appendChild(newScript);
        }, 500);
        setTimeout(function() {
                var myMap = new ymaps.Map("map", {
                center: [55.761147, 37.651259],
                zoom: 16,
                controls: ['smallMapDefaultSet']
            }, {
                searchControlProvider: 'yandex#search'
            });
    
            myGeoObject = new ymaps.GeoObject({
                geometry: {
                    type: "Point"
                },
            });
            myMap.geoObjects
                .add(myGeoObject)
                .add(new ymaps.Placemark([55.761112, 37.652292], {
                    balloonContent: '<strong>101000, г. Москва, улица Покровка 40Б, подъезд 3</strong>',
                    iconCaption: 'Покровка 40Б'
                }, {
                    preset: 'islands#blueCircleDotIconWithCaption',
                    iconCaptionMaxWidth: '200'
                }));
    
            myMap.setType('yandex#publicMap');
    
            myMap.behaviors.disable('scrollZoom');
            //на мобильных устройствах... (проверяем по userAgent браузера)
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                //... отключаем перетаскивание карты
                myMap.behaviors.disable('drag');
            }
        }, 1000);
    });
}

// ==================================================
headerLogic()
mMenuToggle()
inputMask()
if (document.querySelector('.services')) {
    tabs('.services-choose__buttons', '.services-choose__button', '.services-choose__content', 'active');
}
fancybox()
if(document.querySelector('#map')){
    map()
}

