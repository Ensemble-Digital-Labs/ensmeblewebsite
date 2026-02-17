function locoScroll() {
  gsap.registerPlugin(ScrollTrigger);


  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    mobile: {
      smooth: true,

    },

  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    },

    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();

}

function cursorMove() {
  const mouse = document.querySelector(".moving-circle");
  document.body.addEventListener('mousemove', function (dets) {
    mouse.style.left = `${dets.clientX}px`
    mouse.style.top = `${dets.clientY}px`

  })
}

function mainImageMovement() {

  const video = document.querySelector('.video>video');
  document.querySelector('#page1').addEventListener('mousemove', function (dets) {
    const rotx = (window.innerWidth / 2 - dets.clientX) / 17;
    const roty = -(window.innerHeight / 2 - dets.clientY) / 10;


    video.style.transform = `rotateX(${rotx}deg) rotateY(${-roty}deg)`;


  })

}

function leftArrow() {
  const circle = document.querySelector('.arrow-circle');
  const arrowInitial = document.querySelector('#arrow-initial');
  const arrowAfter = document.querySelector('#arrow-after');
  const arrowdiv = document.querySelector('.arrow');

  document.querySelector('.left-arrow').addEventListener('mouseover', function () {
    circle.style.scale = '0.3';
    circle.style.backgroundColor = '#A374FF'
    arrowInitial.style.top = '15vh'
    arrowAfter.style.top = '3.5vh'
    arrowdiv.style.scale = '3'


  })

  document.querySelector('.left-arrow').addEventListener('mouseleave', function () {
    circle.style.scale = 'initial'
    arrowInitial.style.top = '3.5vh'
    arrowAfter.style.top = '-7vh'
    arrowdiv.style.scale = 'initial'
    circle.style.backgroundColor = 'transparent'


  })


}

function NavHide() {
  const nav = document.querySelector('.nav');

  gsap.to(".hide", {

    scrollTrigger: {
      trigger: ".nav",
      scroller: "#main",
      start: "100% 10%",
      end: "top 20%",
      scrub: true,
      //   markers:true,

    },
    display: 'none',

  })

  gsap.to(".reveal", {

    scrollTrigger: {
      trigger: ".nav",
      scroller: "#main",
      start: "100% 10%",
      end: "top 20%",
      scrub: true,
      //   markers:true,

    },
    display: 'initial',

  })
}

function imagesScroll() {

  gsap.to(".images", {

    scrollTrigger: {
      trigger: ".images",
      scroller: "#main",
      scrub: true,
      // markers: true,

    },
    x: '-60vw',

  })

  gsap.to(".zoomed", {

    scrollTrigger: {
      trigger: ".zoomed",
      scroller: "#main",
      scrub: true,
      // markers: true,

    },
    width: "45vw",

  })
}

function ImageHover() {

  const image = document.querySelectorAll(".image");
  const zoom = document.querySelectorAll(".zoomed");

  const text = document.querySelectorAll(".texts");
  const spanColor = document.querySelectorAll(".label");


  for (let i = 0; i < image.length; i++) {
    image[i].addEventListener("mouseenter", function (dets) {

      const color = dets.path[0].dataset.color;
      spanColor[i].style.color = color;
      text[i].style.opacity = '1';
      zoom[i].style.transform = `scale(1.1)`;

    });
    image[i].addEventListener("mouseleave", function (dets) {

      text[i].style.opacity = '0'
      zoom[i].style.transform = `scale(1)`;

    });

  }

  const container = document.querySelector(".mySwiper");
  const dragcursor = document.querySelector(".drag-cursor")
  container.addEventListener("mousemove", function (e) {


    dragcursor.style.opacity = '1';
    dragcursor.style.left = e.clientX + "px";
    dragcursor.style.top = e.pageY / 2.5 + "px";

  })

  container.addEventListener("mouseleave", function (e) {
    dragcursor.style.opacity = '0';

  })

}

function imageReveal() {
  const container = document.querySelectorAll('.part');
  const image = document.querySelectorAll('.reveal-image');
  // const image = document.querySelectorAll('.rev-img');


  for (let i = 0; i < container.length; i++) {
    container[i].addEventListener('mousemove', function (dets) {
      image[i].style.opacity = '1';
      image[i].style.top = (dets.clientY) / 2 + 'px';
      image[i].style.left = dets.clientX + 'px';

    })

    container[i].addEventListener('mouseleave', function (dets) {
      image[i].style.opacity = '0';
    })
  }
}


function footerScroll() {


  gsap.to(".footer-cover-parallax", {

    scrollTrigger: {
      trigger: ".footer-cover-parallax",
      scroller: "#main",
      scrub: true,
      // markers: true,

    },
    height: "100vh",

  })
}

function eyeBall() {
  var balls = document.getElementsByClassName("ball");
  document.addEventListener('mousemove', function (e) {


    var x = e.clientX * 100 / window.innerWidth + "%";
    var y = e.clientY * 100 / window.innerHeight + "%";

    for (var i = 0; i < 2; i++) {
      balls[i].style.left = x;
      balls[i].style.top = y;
      balls[i].style.transform = "translate(-" + x + ",-" + y + ")";
    }
  })
}

function OpenCloseButton() {

  let menu = document.querySelector(".menu");
  let menu1 = document.querySelector("#menu");

  let full = document.querySelector("#fullscreen-nav");
  let line1 = document.querySelector("#line1");
  let line2 = document.querySelector("#line2");
  let btn = document.querySelector('.button-outlined')
  var logo = document.querySelectorAll('.logo-txt')

  let clickCounter = 1;

  menu.addEventListener("click", function () {
    if (clickCounter === 1) {

      full.style.transform = `translateY(0%)`;

      for (i = 0; i < logo.length; i++) {
        logo[i].style.color = '#A374FF';
      }

      menu1.style.backgroundColor = "transparent";
      menu1.style.border = '1.5px solid #A374FF'
      btn.style.opacity = '0';
      line1.style.transform = `rotate(45deg) translate(0px, 1px)`;
      line2.style.transform = `rotate(-45deg) translate(4px, -5px)`;


      gsap.from("#offering>h4", {
        opacity: 0,
        y: '-400',
        autoAlpha: 1,

      })
      gsap.from(".nav-contacts>h4", {
        opacity: 0,
        y: '-400',
        autoAlpha: 1,

      })

      clickCounter = 0;
    }

    else {
      full.style.transform = `translateY(-100%)`;
      btn.style.opacity = '1';


      line1.style.transform = `initial`;
      line2.style.transform = `initial`;

      for (i = 0; i < logo.length; i++) {
        logo[i].style.color = '#17F1D1';
      }
      menu1.style.backgroundColor = "#A374FF";
      menu1.style.border = 'none'

      line1.style.backgroundColor = '#fff'
      line2.style.backgroundColor = '#fff'



      clickCounter = 1;
    }

  })

}

function hovered() {
  let elem = document.querySelectorAll('#offering h4')
  let line = document.querySelectorAll('.cross-line')

  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener('mouseover', function () {
      line[i].style.width = '100%'
      line[i].style.right = '0%';

      line[i].style.animation = ' lineAnim 1s linear both';

    })

    elem[i].addEventListener('mouseleave', function () {
      line[i].style.width = '0%'
      line[i].style.animation = ' lineAnimBack 1s linear both';

    })

  }

}

function loader() {

  gsap.to("#loader", {
    y: '-100%',
    opacity: '0',
    zIndex: '-1',
    delay: 5,

  })

  gsap.from("#loader>h3", {
    duration: 2.5,

    onStart: function () {

      $('#loader>h3').textillate({
        loop: false,
        in: {
          effect: 'bounceInRight',
          callback: function () {
            $('#loader>h3').textillate('out');
          }
        },
        out: {
          effect: 'bounceOut',
        }
      });

    },

    onComplete: function () {
      gsap.from(".loader-owl", {
        delay: 2.3,
        display: 'initial',
        onStart: function () {

          $('.loader-owl').textillate({ in: { effect: 'bounceInRight' } });
        },

      })
    }

  })

}

function mainPageAnim() {
  gsap.from(".main-text", {
    left: '-30%',

    delay: '5',
    yoyo: true,
  })

}








if (window.innerWidth <= 500) {
  // load mobile script

  locoScroll();
  loader();
  mainImageMovement();
  leftArrow();
  imagesScroll();
  ImageHover();
  imageReveal();
  OpenCloseButton();
  hovered();
  mainPageAnim();

}
else { // viewportWidth width > 600
  // load desktop script
  locoScroll();
  loader();
  cursorMove();
  mainImageMovement();
  leftArrow();
  NavHide();
  imagesScroll();
  ImageHover();
  imageReveal();
  footerScroll();
  eyeBall();
  OpenCloseButton();
  hovered();
  mainPageAnim();
}
