import * as THREE from 'three';

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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
    tl.to(".menu", {duration: 3, translateY: '-300px'}, 0).to("#trigger", {duration: 4, translateX: '30vw'}, 0)
    tl.fromTo("header .line-1", {filter: 'opacity(0.5)', right: 0}, {delay: 0.7, duration: 0.5, filter: 'opacity(1)', right: '50%', ease: "[0.74,0.2,1,-0.22]"})
    tl.fromTo("header .line-3", {filter: 'opacity(0.5)', right: 0}, {delay: 0.7, duration: 0.5, filter: 'opacity(1)', right: 0, ease: "[0.74,0.2,1,-0.22]"})
  
    // .to(".item .text", {duration: 4, transform: 'translateY(0px) scaleY(0)'}, 0).to(".item .text", { duration: 2, transform: 'translateY(0px) scaleY(4.5)'}, 0)
    // .fromTo("header", {background: "linear-gradient(to bottom, rgba(229,229,229,0) 0%,rgba(0,0,0,0) 100%)"}, {background: "linear-gradient(to bottom, rgba(229,229,229,0.65) 0%,rgba(0,0,0,0) 100%)"})

    let tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".items2 .item.active",
        repeat: true,
        pin: ".items2",
        start: "0 0",
        scrub: 2,
        end: "+=400%"
      },
      onComplete: aClass,
      onUpdate: rClass
    })

    
    tl2.fromTo(".block-2 .title", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.3, duration: 3, transform: 'translateY(-400px) scaleY(4.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"}, "1.8")
    tl2.fromTo(".block-2 .text-1", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.2, duration: 2.5, transform: 'translateY(-500px) scaleY(3.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"})
    tl2.fromTo(".block-2 .text-2", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.2, duration: 2.5, transform: 'translateY(-900px) scaleY(3.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"}, "<+=0.2")
    tl2.fromTo("header .line-1", {filter: 'opacity(0.5)', right: '50%'}, {delay: 1.7, duration: 2.5, filter: 'opacity(1)', right: '33%', ease: "[0.74,0.2,1,-0.22]"})
    tl2.fromTo("header .line-2", {filter: 'opacity(0.5)', right: 0}, {delay: 0.7, duration: 0.5, filter: 'opacity(1)', right: '66%', ease: "[0.74,0.2,1,-0.22]"})
    tl2.fromTo("header .line-3", {filter: 'opacity(0.5)', right: 0}, {delay: 0.7, duration: 0.5, filter: 'opacity(1)', right: 0, ease: "[0.74,0.2,1,-0.22]"})

    let tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".items3 .item.active",
        repeat: true,
        pin: ".items3",
        start: "0 0",
        scrub: 2,
        end: "+=270%"
      },
      onComplete: aClass,
      onUpdate: rClass
    })

    tl3.fromTo(".block-3 .title", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.3, duration: 3, transform: 'translateY(-300px) scaleY(4.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"}, "1.8")
    tl3.fromTo(".block-3 .text-1", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.2, duration: 2.5, transform: 'translateY(-500px) scaleY(3.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"})
    tl3.fromTo(".block-3 .text-2", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.2, duration: 2.5, transform: 'translateY(-500px) scaleY(3.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"}, "<+=0.2")
    tl3.fromTo(".block-3 .text-3", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.2, duration: 2.5, transform: 'translateY(-500px) scaleY(3.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"}, "<+=0.35")
    tl3.fromTo("header .line-1", {filter: 'opacity(0.5)', right: '33%'}, {delay: 1.7, duration: 2.5, filter: 'opacity(1)', right: '25%', ease: "[0.74,0.2,1,-0.22]"})
    tl3.fromTo("header .line-2", {filter: 'opacity(0.5)', right: '66%'}, {delay: 0.7, duration: 0.5, filter: 'opacity(1)', right: '50%', ease: "[0.74,0.2,1,-0.22]"})
    tl3.fromTo("header .line-3", {filter: 'opacity(0.5)', right: 0}, {delay: 0.7, duration: 0.5, filter: 'opacity(1)', right: '75%', ease: "[0.74,0.2,1,-0.22]"})

    let tl4 = gsap.timeline({
      scrollTrigger: {
        trigger: ".items4 .item.active",
        repeat: true,
        pin: ".items4",
        start: "0 0",
        scrub: 2,
        end: "+=270%"
      },
      onComplete: aClass,
      onUpdate: rClass
    })

    tl4.fromTo(".block-4 .title", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.3, duration: 3, transform: 'translateY(-300px) scaleY(4.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"}, "1.8")
    tl4.fromTo(".block-4 .text-1", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.2, duration: 2.5, transform: 'translateY(-500px) scaleY(3.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"})
    tl4.fromTo(".block-4 .text-2", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.2, duration: 2.5, transform: 'translateY(-500px) scaleY(3.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"}, "<+=0.2")
    tl4.fromTo(".block-4 .text-3, .block-4 .text-3", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.2, duration: 2.5, transform: 'translateY(-500px) scaleY(3.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"}, "<+=0.35") 
    tl4.fromTo("header .line-1", {filter: 'opacity(0.5)', right: '25%'}, {delay: 0.7, duration: 0.5, filter: 'opacity(1)', right: '25%', ease: "[0.74,0.2,1,-0.22]"}, 0)
    tl4.fromTo("header .line-2", {filter: 'opacity(0.5)', right: '50%'}, {delay: 0.7, duration: 0.5, filter: 'opacity(1)', right: '50%', ease: "[0.74,0.2,1,-0.22]"}, 0)
    tl4.fromTo("header .line-3", {filter: 'opacity(0.5)', right: '75%'}, {delay: 0.7, duration: 0.5, filter: 'opacity(1)', right: '75%', ease: "[0.74,0.2,1,-0.22]"}, 0)

    let tl5 = gsap.timeline({
      scrollTrigger: {
        trigger: ".items5 .item.active",
        repeat: true,
        pin: ".items5",
        start: "0 0",
        scrub: 1,
        end: "+=100%"
      },
      onComplete: aClass,
      onUpdate: rClass
    })
    
    tl5.fromTo("header .line-1", {filter: 'opacity(0)', right: '25%'}, {delay: 0.7, duration: 2.5, filter: 'opacity(0)', right: 0, ease: "[0.74,0.2,1,-0.22]"}, 0)
    tl5.fromTo("header .line-2", {filter: 'opacity(0)', right: '50%'}, {delay: 0.7, duration: 2.5, filter: 'opacity(0)', right: 0, ease: "[0.74,0.2,1,-0.22]"}, 0)
    tl5.fromTo("header .line-3", {filter: 'opacity(0)', right: '75%'}, {delay: 0.7, duration: 2.5, filter: 'opacity(0)', right: 0, ease: "[0.74,0.2,1,-0.22]"}, 0)
    tl5.fromTo("header .border", {height: 'calc(100vh - 80px)', top: '40px', bottom: 'auto'}, {delay: 2.7, duration: 4.5, height: '20vh', top: '60%', ease: "[0.74,0.2,1,-0.22]"})
    tl5.fromTo(".block-5 .title", {transform: 'translateY(0px) scaleY(3)', lineHeight: 0.8}, {delay: 0.3, duration: 3, transform: 'translateY(50px) scaleY(1)', lineHeight: 1.2, ease: "[0.74,0.2,1,-0.22]"}, "1.8")
    tl5.fromTo(".block-5 .text", {transform: 'translateY(50px) scale(0.4)', lineHeight: 1.2}, {delay: 0.2, duration: 2.5, transform: 'translateY(0px) scale(1)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"})

    function aClass(){
      items.classList.add("active");
    }

    function rClass(){
      items.classList.remove("active");
    }

    ScrollTrigger.addEventListener("refresh", () => scroll.update());

    ScrollTrigger.refresh();

});












































console.clear();

const renderer = new THREE.WebGLRenderer({ alpha: true, antialiase: true });
const w = document.querySelector('.w');
renderer.setSize(window.innerWidth, window.innerHeight);
w.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  80, window.innerWidth / window.innerHeight, 1, 1000
);
// camera.position.z = 540;
camera.position.z = 7; /* for dino */
camera.position.y = 1.5;

let light = new THREE.DirectionalLight(0xefefff, 1.8);
light.position.set(1, 1, 1).normalize();
scene.add(light);

window.addEventListener("resize", function () {
  let width = window.innerWidth;
  let height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

const loader = new GLTFLoader();
let mixer;
let model;
loader.load(
  // "glass_circles_copy.gltf",
  "dinosaur.glb",
  function (gltf) {
    gltf.scene.traverse(function (node) {
      if (node instanceof THREE.Mesh) {
        node.castShadow = true;
        node.material.side = THREE.DoubleSide;
      }
    });

    model = gltf.scene;
    scene.add(model);

    mixer = new THREE.AnimationMixer(model);
    const action = mixer.clipAction(gltf.animations[0]);
    action.play();
    createAnimation(mixer, action, gltf.animations[0]);
  }
);

const clock = new THREE.Clock();
function render() {
  requestAnimationFrame(render);
  const delta = clock.getDelta();
  if (mixer != null) mixer.update(delta);
  // if (model) model.rotation.y += 0.0025;

  renderer.render(scene, camera);
}

render();

function createAnimation(mixer, action, clip) {
  let proxy = {
    get time() {
      return mixer.time;
    },
    set time(value) {
      action.paused = false;
      mixer.setTime(value);
      action.paused = true;
    }
  };

  let scrollingTL = gsap.timeline({
    scrollTrigger: {
      // trigger: renderer.domElement,
      start: "top center",
      end: "bottom center",
      scrub: 1,
      onUpdate: function () {
        camera.updateProjectionMatrix();
      }
    }
  });

  scrollingTL.to(proxy, {
    time: clip.duration,
    repeat: 0
  });
}

// init();
// animate();

// function init() {
//   gsap.to('.w', {
//     scrollTrigger: {
//       trigger: renderer.domElement,
//       start: "top center",
//       end: "bottom top",
//       scrub: true,
//       toggleActions: "restart pause resume pause"
//     },
//     y: Math.PI
//   });
//   gsap.to('.w', {duration: 3, translateY: '-300px'}, 0)
// }

// function animate() {
//   requestAnimationFrame(animate);
//   renderer.render(scene, camera);
// }


function onMouseMove(e) {
  const x = e.clientX
  const y = e.clientY

  gsap.to(scene.rotation, {
    y: gsap.utils.mapRange(0, window.innerWidth, 1, -1, x),
    x: gsap.utils.mapRange(0, window.innerHeight, 1, -1, y),
  })
}
window.addEventListener('mousemove', onMouseMove)