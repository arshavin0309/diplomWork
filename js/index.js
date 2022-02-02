
const swiper = new Swiper('.swiper', {
    loop: true,
});

const projects__swiper = new Swiper('.projects__swiper', {
  loop: true,
  slidesPerView: 3,
  navigation: {
    nextEl: ".projects__next",
    prevEl: ".projects__prev"
  },
});

$( function() {
    $( "#accordion" ).accordion({
    collapsible: true,
    icons: false
    });
});

// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init(){
    // Создание карты.
    var myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [55.76, 37.64],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 14
    });
}

let h3 = document.querySelectorAll('.accordeon__title')
let img = document.querySelectorAll('.accordeon__arrow')

h3.forEach((x)=>{
  x.addEventListener('click', function(){
      for (const item of h3) {
          if (h3.classList.contains('ui-state-active')) {
              // img.style переворачиваем стрелку
          }
      }
  })
})

let gallerySlider = new Swiper(".slides-container", {
  slidesPerView: 1,
  grid: {
    rows: 1,
    fill: "row"
  },
  spaceBetween: 20,
  pagination: {
    el: ".gallery .test-pagination",
    type: "fraction"
  },
  navigation: {
    nextEl: ".test-next",
    prevEl: ".test-prev"
  },

  breakpoints: {
    441: {
      slidesPerView: 2,
      grid: {
        rows: 2
      },
      spaceBetween: 30
    },

    1200: {
      slidesPerView: 3,
      grid: {
        rows: 2
      },
      spaceBetween: 50
    }
  },

  a11y: false

  // on: {
  //   /* исправляет баг с margin-top остающимся при смене брейкпоинта, это было нужно в 6-й версии свайпера */
  //   beforeResize: function () {
  //     this.slides.forEach((el) => {
  //       el.style.marginTop = "";
  //     });
  //   }
  // }
});

let gallerySlider2 = new Swiper(".slides-container_2", {
  slidesPerView: 1,
  grid: {
    rows: 1,
    fill: "row"
  },
  spaceBetween: 20,
  pagination: {
    el: ".test-section .test-pagination_2",
    type: "fraction"
  },
  navigation: {
    nextEl: ".test-next",
    prevEl: ".test-prev"
  },

  breakpoints: {
    441: {
      slidesPerView: 2,
      grid: {
        rows: 1
      },
      spaceBetween: 30
    },

    1200: {
      slidesPerView: 3,
      grid: {
        rows: 1
      },
      spaceBetween: 50
    }
  },

  a11y: false

  // on: {
  //   /* исправляет баг с margin-top остающимся при смене брейкпоинта, это было нужно в 6-й версии свайпера */
  //   beforeResize: function () {
  //     this.slides.forEach((el) => {
  //       el.style.marginTop = "";
  //     });
  //   }
  // }
});


const MOBILE_WIDTH = 580;

const sliderParamsNotMobile = {
  sliderWrap: 'js-slider-main',
  cardsContainerName: "js-slider",
  cardsWrapName: "js-slides-wrap",
  card: "slide",
  paginationClassName: "test-pagination_3",
  navClassName: "test-navigation_3",
  navBtnClassName: "nav-btn_3",
  navPrev: "test-prev_3",
  navNext: "test-next_3"
};

function getWindowWidth() {
  console.log(document.body.scrollWidth)
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.body.clientWidth,
    document.documentElement.clientWidth
  );
}

function activateSlider(params) {
  const navigation = document.createElement("div");
  const pagination = document.createElement("div");
  const navBtnPrev = document.createElement("button");
  const navBtnNext = document.createElement("button");

  navigation.classList.add(params.navClassName);

  navBtnPrev.classList.add(params.navBtnClassName);
  navBtnPrev.classList.add(params.navPrev);
  navigation.prepend(navBtnPrev);

  pagination.classList.add(params.paginationClassName);
  navigation.append(pagination);

  navBtnNext.classList.add(params.navBtnClassName);
  navBtnNext.classList.add(params.navNext);
  navigation.append(navBtnNext);

  params.sliderWrapElem.prepend(navigation);

  params.cardsContainer.classList.add("swiper-container");
  params.cardsWrap.classList.add("swiper-wrapper");

  params.cardsSlider = new Swiper(`.${params.cardsContainerName}`, {
    slidesPerView: 3,
    spaceBetween: 20,

    pagination: {
      el: `.${params.sliderWrap} .${params.paginationClassName}`,
      type: "fraction"
    },

    navigation: {
      nextEl: `.${params.navNext}`,
      prevEl: `.${params.navPrev}`
    },

    on: {
      beforeInit() {
        document.querySelectorAll(`.${params.card}`).forEach((el) => {
          el.classList.add("swiper-slide");
        });
      },

      beforeDestroy() {
        this.slides.forEach((el) => {
          el.classList.remove("swiper-slide");
          el.removeAttribute("role");
          el.removeAttribute("aria-label");
        });

        this.pagination.el.remove();
        navigation.remove();
      }
    }
  });
}

function destroySlider(params) {
  params.cardsSlider.destroy();
  params.cardsContainer.classList.remove("swiper-container");
  params.cardsWrap.classList.remove("swiper-wrapper");
  params.cardsWrap.removeAttribute("aria-live");
  params.cardsWrap.removeAttribute("id");
}

function checkWindowWidth(params) {
  const currentWidth = getWindowWidth();
  params.sliderWrapElem = document.querySelector(`.${params.sliderWrap}`);
  params.cardsContainer = document.querySelector(
    `.${params.cardsContainerName}`
  );
  params.cardsWrap = document.querySelector(`.${params.cardsWrapName}`);

  if (
    currentWidth > MOBILE_WIDTH &&
    (!params.cardsSlider || params.cardsSlider.destroyed)
  ) {
    activateSlider(params);
  } else if (currentWidth <= MOBILE_WIDTH && params.cardsSlider) {
    destroySlider(params);
  }
}

checkWindowWidth(sliderParamsNotMobile);

window.addEventListener("resize", function () {
  checkWindowWidth(sliderParamsNotMobile);
});
