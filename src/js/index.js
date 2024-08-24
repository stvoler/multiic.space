// import * as THREE from 'three';
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import {gsap} from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Cursor from './cursor';
import {preloader} from './preloader';
import LocomotiveScroll from 'locomotive-scroll';
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const menuEl = document.querySelector('[data-scroll-container]');

// new ResizeObserver(() => scroll.update()).observe(document.querySelector("[data-scroll-container]"))

preloader('.item').then(() => {
    const scroll = new LocomotiveScroll({el: menuEl, smooth: true, lerp: 0.08});
    const cursor = new Cursor(document.querySelector('.cursor'));
    const items = document.querySelector('section');

    gsap.registerPlugin(ScrollTrigger);

    scroll.on("scroll", ScrollTrigger.update);
    
    ScrollTrigger.scrollerProxy(menuEl, {
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
      scroller: menuEl
    });

    const settings = {
      size: 150,
      angle: 0,
      scale: 0,
      iterations: 10,
      speed: 0.3,
      offset: 0,
      slices: 12
    };

    let canvasWidth, canvasheight;
    let canvas = document.querySelector('#ctx');
    let context = canvas.getContext('2d');
    let bufferCanvas = document.createElement('canvas');
    let bufferContext = bufferCanvas.getContext('2d');
    
    window.addEventListener('resize', resize);
    resize();
    function resize() {
      canvasWidth = bufferCanvas.width = canvas.width = window.innerWidth;
      canvasheight = bufferCanvas.height = canvas.height = window.innerHeight;
      bufferContext.translate(canvasWidth * 0.5, canvasheight);
      bufferContext.strokeStyle = '#c3c3c3';
    }
    
    function draw() {
      requestAnimationFrame(draw);
      let points = [];
      bufferContext.save();
      bufferContext.setTransform(1, 0, 0, 1, 0, 0);
      bufferContext.clearRect(0, 0, canvasWidth, canvasheight);
      bufferContext.restore();
      bufferContext.beginPath();
      bufferContext.moveTo(0, 0);
      bufferContext.lineTo(0, -settings.size * settings.scale);
      bufferContext.stroke();
      drawShape({x: 0, y: -settings.size * settings.scale, angle: -Math.PI * 0.5, size: settings.size});
      for (var i = 0; i < settings.iterations; i++) {
        for (var j = points.length - 1; j >= 0; j--) {
          drawShape(points.pop());
        }
      }
      function drawShape(point) {
        drawBranch(point, 1); // Branch right
        drawBranch(point, -1); // Branch left
      }
      function drawBranch(point, direction) {
        let angle = point.angle + (settings.angle * direction + settings.offset);
        let size = point.size * settings.scale;
        let x = point.x + Math.cos(angle) * size;
        let y = point.y + Math.sin(angle) * size;
        bufferContext.beginPath();
        bufferContext.moveTo(point.x, point.y);
        bufferContext.lineTo(x, y);
        bufferContext.stroke();
        points.unshift({x: x, y: y, angle: angle, size: size});
      }
      let side1 = canvasWidth * 0.5;
      let side2 = canvasheight * 0.5;
      let radius = Math.sqrt(side1 * side1 + side2 * side2);
      bufferContext.globalCompositeOperation = 'destination-in';
      bufferContext.fillStyle = '#c3c3c3';
      bufferContext.beginPath();
      bufferContext.arc(0, 0, radius, -(Math.PI * 0.5 + (Math.PI / settings.slices)), -(Math.PI * 0.5 - (Math.PI / settings.slices)));
      bufferContext.lineTo(0, 0);
      bufferContext.closePath();
      bufferContext.fill();
      bufferContext.globalCompositeOperation = 'source-over';
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvasWidth, canvasheight);
      context.translate(canvasWidth * 0.5, canvasheight * 0.5);
      for (var i = 0; i < settings.slices; i++) {
        context.rotate(Math.PI * 2 / settings.slices);
        context.drawImage(bufferCanvas, -canvasWidth * 0.5, -canvasheight);
      }
    }  
    draw();
    
    const music = document.querySelector(".music");

    gsap.set(settings, {offset: 0})
    gsap.set(settings, {scale: 0})
    gsap.set(settings, {angle: 0})
    gsap.set("header .border", {width: 'calc(100vw - 80px)'})
    // gsap.set("header .line-1, header .line-2, header .line-3", {opacity: 0, transform: 'translateX(0px)'})

    let tl0 = gsap.timeline({
      scrollTrigger: {
        trigger: ".items0",
        repeat: true,
        pin: ".items0",
        start: "0 0",
        scrub: 0.1,
        end: "+=117%",
        id: "#b0",
        // markers: true,
        // onEnter: () => {
        //   music.play()
        // }
      },
      onComplete: aClass,
      onUpdate: rClass
    })

    tl0.set("header .border", {width: '1px'})
    tl0.set("header .line-1, header .line-2, header .line-3", {opacity: 0, transform: 'translateX(0px)'})
    tl0.fromTo(music, {playbackRate: 0.99, volume: 0.63}, {duration: 0.4, playbackRate: 1, volume: 0.63})
    tl0.fromTo("#circles", {filter: "blur(0px)"}, {duration: 1.9, filter: "blur(0px)"})
    tl0.fromTo(".block-0 .img", {filter: 'grayscale(1)'}, {duration: 12, filter: 'grayscale(0)', ease: "power1.in"})
    tl0.fromTo(".block-0 .title", {transform: 'translateY(0px) scaleY(1)'}, {duration: 12, opacity: 0, transform: 'translateY(-20px) scaleY(3.6)', ease: "power1.in"})
    tl0.fromTo(".block-0 .text", {transform: 'translateY(0px) scaleY(1)'}, {duration: 12, opacity: 0, transform: 'translateY(-40px) scaleY(1.1)', ease: "power1.in"}, "<")
    tl0.fromTo(".block-0 .img", {transform: 'translateY(0px) scaleY(1)'}, {duration: 12, opacity: 0, transform: 'translateY(-40px) scaleY(1.04)', ease: "power1.in"}, "<")
    .to("#trigger", {duration: 10, opacity: 0, translateY: '-40px', ease: "power1.in"}, "<")
    tl0.to("#circles", {duration: 1.9, filter: "blur(2px)"}, "<")
    tl0.to(music, {playbackRate: 0.09, volume: 0.45}, "<")
    .addLabel("b0", ">")
    
    let tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".items1",
        repeat: true,
        pin: ".items1",
        start: "0 0",
        scrub: 0.1,
        end: "+=117%",
        id: "#b1",
      },
      onComplete: aClass,
      onUpdate: rClass
    })
    tl1.set("header .line-1, header .line-2, header .line-3", {opacity: 0, transform: 'translateX(0px)'})
    .addLabel("b1", ">")
    tl1.to("body", {duration: 9, background: '#23231b', color: '#fff'})
    tl1.fromTo(".block-1 .character", {filter: 'grayscale(0.5) brightness(0)', opacity: 0.2}, {duration: 9, filter: 'grayscale(0) brightness(1)', opacity: 1, ease: "power1.in"})
    tl1.fromTo(music, {playbackRate: 0.99, volume: 0.63}, {duration: 0.4, playbackRate: 1, volume: 0.63})
    tl1.fromTo("#circles", {filter: "blur(0px)"}, {duration: 1.9, filter: "blur(0px)"})
    tl1.fromTo("header .border", {width: '1px'}, {delay: 4.8, duration: 7.2, width: 'calc(100vw - 80px)', ease: "power1.in"})
    tl1.fromTo(".item .border", {borderColor: '#000'}, {delay: 2.7, duration: 4.5, borderColor: '#fff', ease: "power1.in"})
    tl1.fromTo(".block-1 .title", {transform: 'translateY(0px) scaleY(1)'}, {duration: 12, opacity: 0, transform: 'translateY(-20px) scaleY(4)', ease: "power1.in"})
    tl1.to("#circles", {duration: 1.9, filter: "blur(2px)"}, "<")
    tl1.to(music, {playbackRate: 0.09, volume: 0.45}, "<")
    tl1.fromTo("header .line-1", {opacity: 0, transform: 'translateX(0px)'}, {delay: 0.7, duration: 2.7, opacity: 0.72, transform: 'translateX(-50vw)', ease: "power1.in"})
    tl1.fromTo("header .line-3", {opacity: 0, transform: 'translateX(0px)'}, {delay: 0.5, duration: 1.8, opacity: 0, transform: 'translateX(0px)', ease: "power1.in"})
    tl1.fromTo(".block-1 .img-ch", {transform: 'translateY(0px) scaleY(1)'}, {duration: 11, opacity: 0, transform: 'translateY(-90px) scale(1)', ease: "power1.in"}, "<")

    let tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".items2",
        repeat: true,
        pin: ".items2",
        start: "0 0",
        scrub: 0.1,
        end: "+=117%",
        id: "#b2",
      },
      onComplete: aClass,
      onUpdate: rClass
    })
    .addLabel("b2", 0)
    tl2.to("body", {duration: 9, background: '#492b28', color: '#fff'})
    tl2.fromTo(".block-2 .character", {filter: 'grayscale(0.5) brightness(0)', opacity: 0.2}, {duration: 9, filter: 'grayscale(0) brightness(1)', opacity: 1, ease: "power1.in"})
    tl2.fromTo("#circles", {filter: "blur(2px)"}, {duration: 1.9, filter: "blur(0px)"})
    tl2.fromTo(music, {playbackRate: 0.09, volume: 0.45}, {duration: 0.2, playbackRate: 1, volume: 0.63})
    tl2.fromTo("header .border", {padding: '0'}, {duration: 4.5, padding: '0'})
    tl2.fromTo(".block-2 .title", {transform: 'translateY(0px) scaleY(1)'}, {duration: 12, opacity: 0, transform: 'translateY(-20px) scaleY(4)', ease: "power1.in"})
    tl2.fromTo(".block-2 .text-1", {transform: 'translateY(0px) scaleY(1)'}, {duration: 11, opacity: 0, transform: 'translateY(-40px) scaleY(1.1)', ease: "power1.in"}, "<")
    tl2.to("#circles", {duration: 1.9, filter: "blur(2px)"}, "<")
    tl2.to(music, {playbackRate: 0.09, volume: 0.45}, "<")
    tl2.fromTo("header .line-1", {opacity: 0.99, transform: 'translateX(-50vw)'}, {delay: 0.7, duration: 2.7, opacity: 0.99, transform: 'translateX(-66vw)', ease: "power1.in"})
    tl2.fromTo("header .line-2", {opacity: 0, transform: 'translateX(0px)'}, {delay: 0.5, duration: 1.8, opacity: 0.99, transform: 'translateX(-34vw)', ease: "power1.in"})
    tl2.fromTo("header .line-3", {opacity: 0, transform: 'translateX(0px)'}, {delay: 0.5, duration: 1.8, opacity: 0, transform: 'translateX(0px)', ease: "power1.in"})
    tl2.fromTo(".block-2 .img-ch", {transform: 'translateY(0px) scaleY(1)'}, {duration: 11, opacity: 0, transform: 'translateY(-40px) scaleY(1)', ease: "power1.in"}, "<")

    let tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".items3",
        repeat: true,
        pin: ".items3",
        start: "0 0",
        scrub: 0.1,
        end: "+=117%",
        id: "#b3",
      },
      onComplete: aClass,
      onUpdate: rClass
    })
    .addLabel("b3", 0)
    tl3.to("body", {duration: 9, background: '#1f3133', color: '#fff'})
    tl3.fromTo(".block-3 .character", {filter: 'grayscale(0.5) brightness(0)', opacity: 0.2}, {duration: 9, filter: 'grayscale(0) brightness(1)', opacity: 1, ease: "power1.in"})
    tl3.fromTo("#circles", {filter: "blur(2px)"}, {duration: 1.9, filter: "blur(0px)"})
    tl3.fromTo(music, {playbackRate: 0.09, volume: 0.45}, {duration: 0.2, playbackRate: 1, volume: 0.63})
    tl3.fromTo("header .border", {padding: '0'}, {duration: 4.5, padding: '0'})
    tl3.fromTo(".block-3 .title", {transform: 'translateY(0px) scaleY(1)'}, {duration: 12, opacity: 0, transform: 'translateY(-20px) scaleY(4)', ease: "power1.in"})
    tl3.fromTo(".block-3 .text-2", {transform: 'translateY(0px) scaleY(1)'}, {duration: 11, opacity: 0, transform: 'translateY(-40px) scaleY(1.1)', ease: "power1.in"}, "<")
    tl3.fromTo(".block-3 .text-3", {transform: 'translateY(0px) scaleY(1)'}, {duration: 11, opacity: 0, transform: 'translateY(-20px) scaleY(1.1)', ease: "power1.in"}, "<")
    tl3.to("#circles", {duration: 1.9, filter: "blur(2px)"}, "<")
    tl3.to(music, {playbackRate: 0.09, volume: 0.45}, "<")
    tl3.fromTo("header .line-1", {opacity: 0.99, transform: 'translateX(-66vw)'}, {delay: 0.7, duration: 2.7, opacity: 0.99, transform: 'translateX(-74vw)', ease: "power1.in"})
    tl3.fromTo("header .line-2", {opacity: 0.99, transform: 'translateX(-34vw)'}, {delay: 0.5, duration: 1.8, opacity: 0.99, transform: 'translateX(-50vw)', ease: "power1.in"})
    tl3.fromTo("header .line-3", {opacity: 0.99, transform: 'translateX(0px)'}, {delay: 0.5, duration: 1.8, opacity: 0.99, transform: 'translateX(-26vw)', ease: "power1.in"})
    tl3.fromTo(".block-3 .img-ch", {transform: 'translateY(0px) scaleY(1)'}, {duration: 11, opacity: 0, transform: 'translateY(-40px) scaleY(1)', ease: "power1.in"}, "<")

    let tl4 = gsap.timeline({
      scrollTrigger: {
        trigger: ".items4",
        repeat: true,
        pin: ".items4",
        start: "0 0",
        scrub: 0.1,
        end: "+=117%",
        id: "#b4",
      },
      onComplete: aClass,
      onUpdate: rClass
    })
    .addLabel("b4", 0)
    tl4.to("body", {duration: 9, background: '#282533', color: '#fff'})
    tl4.fromTo(".block-4 .character", {filter: 'grayscale(0.5) brightness(0)', opacity: 0.2}, {duration: 9, filter: 'grayscale(0) brightness(1)', opacity: 1, ease: "power1.in"})
    tl4.fromTo("#circles", {filter: "blur(2px)"}, {duration: 1.9, filter: "blur(0px)"})
    tl4.fromTo(music, {playbackRate: 0.09, volume: 0.45}, {duration: 0.2, playbackRate: 1, volume: 0.63})
    tl4.fromTo("header .border", {padding: '0'}, {duration: 4.5, padding: '0', ease: "power1.in"})
    tl4.fromTo(".block-4 .title", {transform: 'translateY(0px) scaleY(1)'}, {duration: 12, opacity: 0, transform: 'translateY(-20px) scaleY(4)', ease: "power1.in"})
    tl4.fromTo(".block-4 .text-2", {transform: 'translateY(0px) scaleY(1)'}, {duration: 11, opacity: 0, transform: 'translateY(-40px) scaleY(1.1)', ease: "power1.in"}, "<")
    tl4.fromTo(".block-4 .text-3, .block-4 .text-4", {transform: 'translateY(0px) scaleY(1)'}, {duration: 10, opacity: 0, transform: 'translateY(-40px) scaleY(1.1)', ease: "power1.in"}, "<") 
    tl4.to("#circles", {duration: 1.9, filter: "blur(2px)"}, "<")
    tl4.to(music, {playbackRate: 0.09, volume: 0.45}, "<")
    tl4.fromTo("header .line-1", {opacity: 0.99, transform: 'translateX(-74vw)'}, {delay: 0.7, duration: 2.7, opacity: 0, transform: 'translateX(-74vw)', ease: "power1.in"})
    tl4.fromTo("header .line-2", {opacity: 0.99, transform: 'translateX(-50vw)'}, {delay: 0.5, duration: 1.8, opacity: 0, transform: 'translateX(-50vw)', ease: "power1.in"})
    tl4.fromTo("header .line-3", {opacity: 0.99, transform: 'translateX(-26vw)'}, {delay: 0.5, duration: 1.8, opacity: 0, transform: 'translateX(-26vw)', ease: "power1.in"})
    tl4.fromTo(".block-4 .img-ch", {transform: 'translateY(0px) scaleY(1)'}, {duration: 11, opacity: 0, transform: 'translateY(-40px) scaleY(1)', ease: "power1.in"}, "<")
    // tl4.to(".block-4 .text-1", {duration: 9, opacity: 0}, "b5-=0.1")

    let tl5 = gsap.timeline({
      scrollTrigger: {
        trigger: ".items5",
        repeat: true,
        pin: ".items5",
        start: "0 0",
        scrub: 0.8,
        end: "+=117%",
        id: "#b5",
      },
      onComplete: aClass,
      onUpdate: rClass
    })
    .addLabel("b5", 0)
    tl5.fromTo("header .line-1", {opacity: 0, transform: 'translateX(-74vw)'}, {duration: 0.1, opacity: 0, transform: 'translateX(0px)', ease: "power1.in"})
    tl5.fromTo("header .line-2", {opacity: 0, transform: 'translateX(-50vw)'}, {duration: 0.1, opacity: 0, transform: 'translateX(0px)', ease: "power1.in"})
    tl5.fromTo("header .line-3", {opacity: 0, transform: 'translateX(-26vw)'}, {duration: 0.1, opacity: 0, transform: 'translateX(0px)', ease: "power1.in"})
    tl5.fromTo("#circles", {filter: "blur(2px)"}, {duration: 1.9, filter: "blur(0px)"})
    tl5.fromTo(music, {playbackRate: 0.09, volume: 0.45}, {duration: 0.2, playbackRate: 1, volume: 0.63})
    tl5.fromTo("header .border", {height: 'calc(100vh - 80px)', transform: 'scale(1)'}, {delay: 1.8, duration: 3.5, height: 'calc(100vh - 80px)', transform: 'scale(1.1)', ease: "power1.in"})
    tl5.fromTo(".block-5 .title", {transform: 'translateY(1000px) scaleY(2)', lineHeight: 0.8}, {delay: 0.3, duration: 12, transform: 'translateY(80px) scaleY(1)', lineHeight: 1, ease: "power1.in"}, "1.8")
    tl5.fromTo(".block-5 .text", {transform: 'translateY(50px) scale(0.4)', lineHeight: 1.2}, {delay: 0.2, duration: 10, transform: 'translateY(0px) scale(1)', lineHeight: 1, ease: "power1.in"}, ">-=8")
    
    let tlTree = gsap.timeline({
      scrollTrigger: {
        start: "top center",
        end: "100%",
        scrub: 1.8,
      }
    });
    tlTree.set("#circles", {filter: "blur(0px)"})
    tlTree.set(settings, {offset: 0, scale: 0, angle: 0, iterations: 9})
    tlTree.set(music, {playbackRate: 1, volume: 0.63})
    tlTree.to(settings, {angle: 0, scale: 0, duration: 1.5}, "b0+=0.01")
    tlTree.to(settings, {angle: 0, scale: 0.55, duration: 0.31}, "b1+=0.01")
    tlTree.to('.w', {transform: 'translate(-31vw, 6vw)', duration: 0.5}, ">")
    tlTree.to(settings, {angle: 0.63, scale: 0.58, duration: 1.5}, ">")
    tlTree.to('.w', {transform: 'translate(0vw, 6vw)', duration: 0.5}, ">")
    tlTree.to(settings, {angle: 0.5, scale: 0.53, duration: 1.5}, "b2+=0.01")
    tlTree.to('.w', {transform: 'translate(31vw, 6vw)', duration: 0.5}, ">")
    tlTree.to(settings, {angle: 0.72, scale: 0.59, duration: 1.5}, "b3+=0.01")
    tlTree.to('.w', {transform: 'translate(0vw, 0vw)', duration: 0.5}, ">")
    tlTree.to(settings, {angle: 0.63, scale: 0.57, duration: 0.5}, "b4+=0.01")
    tlTree.to(settings, {angle: 0.5, scale: 0.54, duration: 0.8}, ">")
    tlTree.to(settings, {angle: 0.5, scale: 0.54, iterations: 3, duration: 0.04}, ">")
    tlTree.to(settings, {angle: 0.5, scale: 0.54, duration: 0.8}, ">")

    gsap.utils.toArray("nav a").forEach(function(a) {
      a.addEventListener("click", function(e) {
        let menuItems = document.querySelectorAll('.menu a');
        menuItems.forEach(el => {
          el.classList.remove('active');
        })
        a.classList.add('active');
        e.preventDefault();
        const id = e.target.getAttribute("href"),
              trigger = ScrollTrigger.getById(id);
        // gsap.to(window, {
        //   duration: 1,
        //   scrollTo: trigger ? trigger.start : id,
        // });
        scroll.scrollTo(trigger ? trigger.start : id, 180)
      });
    });


    // const menuItem1 = document.querySelector('.menu-item-1');
    // const menuItem2 = document.querySelector('.menu-item-2');
    // const menuItem3 = document.querySelector('.menu-item-3');
    // const menuItem4 = document.querySelector('.menu-item-4');

    // // menuItem1.addEventListener("click", () => {
    // //   tl0.timeScale(50.0).play(1, true)
    // // })

    // // menuItem2.addEventListener("click", () => {
    // //   tl1.timeScale(50.0).play(1, true)
    // //   tlTree.play("b1+=0.01")
    // // })

    // // menuItem3.addEventListener("click", () => {
    // //   tl2.timeScale(50.0).play(0, true)
    // //   tlTree.play("b2+=0.01")
    // // })

    // // menuItem4.addEventListener("click", () => {
    // //   tl3.timeScale(50.0).play(0, true)
    // //   tlTree.play("b3+=0.01")
    // // })


    function aClass(){items.classList.add("active")}
    function rClass(){
      items.classList.remove("active");
    }
    ScrollTrigger.addEventListener("refresh", () => scroll.update());
    ScrollTrigger.refresh();


    window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
    let renderers = {
    'circlesTrigger': (function() {
      let circles = [];
      let initialized = false;
      let height = 0;
      let width = 0;
      let init = function(config) {
        let count = config.count;
        width = config.width;
        height = config.height;
        let circleMaxWidth = (width*0.66) >> 0;
        let circlesEl = document.querySelector('#circles');
        for(var i = 0; i < count; i++ ){
          let node = document.createElement('div');
          node.style.width = node.style.height = (i/count*circleMaxWidth) + 'px';
          node.classList.add('circle');
          circles.push(node);
          circlesEl.appendChild(node);
        }
        initialized = true;
      };
      let max = 256;
      let renderFrame = function(frequencyData) {
        for(var i = 0; i < circles.length; i++) {
          let circle = circles[i];
          circle.style.cssText = '-webkit-transform:scale('+((frequencyData[i]/max))+')';
        }
      };
      return {
        init: init,
        isInitialized: function() {
          return initialized;
        },
        renderFrame: renderFrame
      }
    })()
  };
  function Visualization(config) {
    let audio,
      analyser,
      source,
      audioCtx,
      frequencyData,
      running = false,
      renderer = config.renderer,
      width = config.width || 360,
      height = config.height || 360;

    let init = function() {
      audio = document.querySelector(".music");
      audioCtx = new AudioContext();
      analyser = audioCtx.createAnalyser();
      source =  audioCtx.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
      analyser.fftSize = 64;
      frequencyData = new Uint8Array(analyser.frequencyBinCount);
      renderer.init({
        count: analyser.frequencyBinCount,
        width: width,
        height: height
      });
    };
    this.start = function() {
      running = true;
      audio.play();
      renderFrame();
    };
    this.stop = function() {
      running = false;
      audio.pause();
    };
    this.setRenderer = function(r) {
      if (!r.isInitialized()) {
        r.init({
          count: analyser.frequencyBinCount,
          width: width,
          height: height
        });
      } 
      renderer = r;
    };
    this.isPlaying = function() {
      return running;
    }
    let renderFrame = function() {
      analyser.getByteFrequencyData(frequencyData);
      renderer.renderFrame(frequencyData);
      if (running) {
        requestAnimationFrame(renderFrame);
      }
    };
    init();
  };
  let vis = document.querySelector('.initiator');
  let soundIcon = document.querySelector('.sound-icon');
  let soundIconSvg = document.querySelector('.sound-icon svg');
  let v = null;
  vis.onclick = (function() {
    return function() {
      let el = this;
      let id = el.parentNode.id;
      if (!v) {
        v = new Visualization({renderer: renderers[id] });
      }
      v.setRenderer(renderers[id]);
      if (v.isPlaying()) {
        v.stop();
        el.style.backgroundColor = '#cbff33';
        soundIcon.classList.remove('active');
      }else {
        v.start();
        el.style.backgroundColor = 'rgba(232,237,218,0.9)';
        soundIcon.classList.add('active');
      }
    };
  })();
  soundIcon.addEventListener("click", () => {
    soundIcon.classList.add('mute');
    soundIconSvg.animationsPaused()
        ? soundIconSvg.unpauseAnimations()
        : soundIconSvg.pauseAnimations();
    vis.click();
  })
});