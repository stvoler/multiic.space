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
        pin: ".items",
        start: "0 0",
        scrub: 2,
        end: "+=270%"
      },
      onComplete: aClass,
      onUpdate: rClass
    })

    tl.fromTo("header .border", {width: 1}, {delay: 2.7, duration: 4.5, width: 'calc(100vw - 80px)', ease: "[0.74,0.2,1,-0.22]"})
    tl.fromTo(".item .border", {borderColor: '#000', scale: 1}, {delay: 2.7, duration: 4.5, borderColor: '#fff', scale: 1, ease: "[0.74,0.2,1,-0.22]"})
    tl.fromTo(".block-1 .title", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.4, duration: 3, transform: 'translateY(-300px) scaleY(4.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"})
    tl.fromTo(".block-1 .text", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.3, duration: 2.5, transform: 'translateY(-560px) scaleY(3.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"})
    // .to(".item .text", {duration: 4, transform: 'translateY(0px) scaleY(0)'}, 0).to(".item .text", { duration: 2, transform: 'translateY(0px) scaleY(4.5)'}, 0)
    tl.to(".menu", {duration: 3, translateY: '-300px'}, 0).to("#trigger", {duration: 4, translateX: '30vw'}, 0)
    // .fromTo("header", {background: "linear-gradient(to bottom, rgba(229,229,229,0) 0%,rgba(0,0,0,0) 100%)"}, {background: "linear-gradient(to bottom, rgba(229,229,229,0.65) 0%,rgba(0,0,0,0) 100%)"})
    tl.fromTo("header .border-half", {filter: 'opacity(0)', right: '40px'}, {delay: 1.7, duration: 2.5, filter: 'opacity(1)', right: '50%', ease: "[0.74,0.2,1,-0.22]"})

    let tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".items2 .item.active",
        repeat: true,
        pin: ".items2",
        start: "0 0",
        scrub: 2,
        end: "+=270%"
      },
      onComplete: aClass,
      onUpdate: rClass
    })

    
    tl2.fromTo(".block-2 .title", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.3, duration: 3, transform: 'translateY(-300px) scaleY(4.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"})
    tl2.fromTo(".block-2 .text-1", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.2, duration: 2.5, transform: 'translateY(-500px) scaleY(3.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"})
    tl2.fromTo(".block-2 .text-2", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.2, duration: 2.5, transform: 'translateY(-900px) scaleY(3.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"})


    tl2.fromTo(".block-3 .title", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.3, duration: 3, transform: 'translateY(-300px) scaleY(4.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"})
    tl2.fromTo(".block-3 .text", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.2, duration: 2.5, transform: 'translateY(-500px) scaleY(3.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"})

    function aClass(){
      items.classList.add("active");
    }

    function rClass(){
      items.classList.remove("active");
    }

    ScrollTrigger.addEventListener("refresh", () => scroll.update());

    ScrollTrigger.refresh();

});


