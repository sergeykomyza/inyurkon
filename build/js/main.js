
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
  
// ==================================================
const cases = (parentSection) => {
    let box = document.querySelector(parentSection),
        items = box.querySelectorAll('.js-elem'),
        btnMore = box.querySelector('.js-moreItems'),
        showItem = 6,
        k = 0
    items.forEach(item => {
        item.style.display = 'none'
    })
    const show = () => {
        k += showItem
        for (let i = 0; i < k; i++) {
            i >= items.length - 1 || items.length <= showItem ? btnMore.style.display = 'none' : btnMore.style.display = 'flex'
            if(i <= items.length-1){
                items[i].style.display = 'block'
            }
        }
    }
    show()
    btnMore.addEventListener('click', () => {
        show()
    })
}

// ==================================================
const fullNew = () => {
    const newModal = document.querySelector('.full-new')
    const newsPreviews = document.querySelectorAll('.new')
    newsPreviews.forEach(item => {
        const newBtn = item.querySelector('.js-openFullNew')
        const newTitle = item.querySelector('.new__title')
        newBtn.addEventListener('click', function(){
            newModal.innerHTML = item.innerHTML
        })
    })
}

// ==================================================\Fancybox
Fancybox.bind("[data-fancybox]", {
});

Fancybox.bind('[data-fancybox="news"]', {
    Thumbs: {
      type: 'none',
      autoStart: false,
    },
  });

// ================================================== МАСКА ДЛЯ ИНПУТОВ (https://github.com/RobinHerbots/Inputmask)
$(document).ready(function () {
    $(".js-maskPhone").inputmask({
        mask: "+7 999 999 99 99",
        clearIncomplete: true
    });
    $('.email').inputmask({
        mask: "*{1,20}[.*{1,20}]@*{1,20}.*{2,4}",
        clearIncomplete: true
    //     greedy: false,
    //     onBeforePaste: function (pastedValue, opts) {
    //         pastedValue = pastedValue.toLowerCase();
    //         return pastedValue.replace("mailto:", "");
    //     },
    //     definitions: {
    //         '*': {
    //             validator: "[0-9A-Za-z-а-я-]",
    //             casing: "lower"
    //         }
    //     }
    });
    $(".js-maskDate").inputmask({
        mask: "99/99/9999",
        clearIncomplete: true,
        'placeholder': 'dd/mm/yyyy'
    });
});

// ================================================== СЛАЙДЕР SWIPER (https://swiperjs.com/get-started) 
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
// ================================================== 
// ================================================== 
// ================================================== 
// ================================================== 
// ================================================== 
// ================================================== 
// ================================================== 
// ================================================== 
headerLogic()
mMenuToggle()
tabs('.services-choose__buttons', '.services-choose__button', '.services-choose__content', 'active')
cases('.news')
fullNew()
// ================================================== КАРТА, ОТЛОЖЕННАЯ ЗАГРУЗКА (ЧТОБЫ УЛУЧШИТЬ ПОКАЗАТЕЛИ - PageSpeed Insights)
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function() {
        var headID = document.getElementsByTagName("body")[0];         
        var newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        newScript.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
        headID.appendChild(newScript);
    }, 3000);
    setTimeout(function() {
            var myMap = new ymaps.Map("map", {
            center: [55.917879, 37.806326],
            zoom: 13,
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
            .add(new ymaps.Placemark([55.917879, 37.806326], {
                balloonContent: '<strong></strong>',
                iconCaption: 'М.О., г. Королев, ул. Ленина 12'
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
    }, 4000);
});

/* иногда карта не загружается таким образом (например в битриксе)
 тогда надо сделать обращение к ней как это указано в документации, через ymaps.ready - https://yandex.ru/dev/maps/jsapi/doc/2.1/quick-start/index.html?from=techmapsmain

ymaps.ready(init);

function init(){

    var myMap = new ymaps.Map("map", {
        center: [56.745981, 37.179787],
        zoom: 13,
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
        .add(new ymaps.Placemark([56.745981, 37.179787], {
            balloonContent: '<strong></strong>',
            iconCaption: 'М.О., г. Королев, ул. Ленина 12'
        }, {
            preset: 'islands#blueCircleDotIconWithCaption',
            iconCaptionMaxWidth: '200'
        }));

    myMap.setType('yandex#publicMap');
    // отключаем масштабирование скроллом       
    myMap.behaviors.disable('scrollZoom');
    // на мобильных устройствах... (проверяем по userAgent браузера)
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        //... отключаем перетаскивание карты
        myMap.behaviors.disable('drag');
    }
        
}
*/
