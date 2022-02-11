import {gsap} from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cursor from './cursor';
import {preloader} from './preloader';
import LocomotiveScroll from 'locomotive-scroll';
import Menu from './menu';

gsap.registerPlugin(ScrollTrigger);

const menuEl = document.querySelector('[data-scroll-container]');

preloader('.item').then(() => {
    const scroll = new LocomotiveScroll({el: menuEl, smooth: true});
    const cursor = new Cursor(document.querySelector('.cursor'));
    new Menu(menuEl);

    const target = document.querySelector('.item.active');
    const items = document.querySelector('.items');
    const menu = document.querySelector('.menu');

    gsap.registerPlugin(ScrollTrigger);

    scroll.on("scroll", ScrollTrigger.update);
    
    ScrollTrigger.scrollerProxy("[data-scroll-container]", {
      scrollTop(value) {
        return arguments.length
          ? scroll.scrollTo(value, 0, 0)
          : scroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      }
    });

    ScrollTrigger.defaults({
      toggleActions: "restart pause resume pause",
      scroller: "[data-scroll-container]"
    });

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".item.active",
        repeat: true,
        scrub: true,
        pin: ".items",
        start: "0 0",
        end: "+=250%"
      },
      onComplete: aClass,
      onUpdate: rClass
    })

    .fromTo("header .border", {translateY: 0, scale: 1}, {delay: 2.7, duration: 4.5, translateY: 0, scale: 0.24, ease: "[0.74,0.2,1,-0.22]"})
    .fromTo(".item.active .border", {translateY: 0, scale: 1}, {delay: 2.7, duration: 4.5, translateY: 0, scale: 0.24, ease: "[0.74,0.2,1,-0.22]"})
    .to(".item.active", {duration: 4, fontSize: 108}, 0).to(".item.active", {delay: 5, duration: 2, color: "#E5E5E5",fontSize: 15}, 0)
    .to(".menu", {duration: 3, translateY: -300}, 0).to("#trigger", {duration: 4, translateX: 100}, 0)
    .fromTo("header", {background: "linear-gradient(to bottom, rgba(229,229,229,0) 0%,rgba(0,0,0,0) 100%)"}, {background: "linear-gradient(to bottom, rgba(229,229,229,0.65) 0%,rgba(0,0,0,0) 100%)"})

    function aClass(){
      items.classList.add("active");
    }

    function rClass(){
      items.classList.remove("active");
    }

    ScrollTrigger.addEventListener("refresh", () => scroll.update());

    ScrollTrigger.refresh();

});


