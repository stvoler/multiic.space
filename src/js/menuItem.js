import {gsap} from 'gsap';
import { map, lerp, clamp, getMousePos } from './utils';
const images = Object.entries(require('../img/*.gif'));

let mousepos = {x: 0, y: 0};
let mousePosCache = mousepos;
let direction = {x: mousePosCache.x-mousepos.x, y: mousePosCache.y-mousepos.y};

window.addEventListener('mousemove', ev => mousepos = getMousePos(ev));

export default class MenuItem {
    constructor(el, inMenuPosition, animatableProperties) {
        this.DOM = {el: el};
        this.inMenuPosition = inMenuPosition;
        this.animatableProperties = animatableProperties;
        this.DOM.textInner = this.DOM.el.querySelector('h4');
        this.layout();
        this.initEvents();
    }
    layout() {
        this.DOM.reveal = document.createElement('div');
        this.DOM.reveal.className = 'hover';
        this.DOM.revealInner = document.createElement('div');
        this.DOM.revealInner.className = 'hover-inner';
        this.DOM.revealImage = document.createElement('div');
        this.DOM.revealImage.className = 'hover-img';
        this.DOM.revealImage.style.backgroundImage = `url(${images[this.inMenuPosition][1]})`;

        this.DOM.revealInner.appendChild(this.DOM.revealImage);
        this.DOM.reveal.appendChild(this.DOM.revealInner);
        this.DOM.el.appendChild(this.DOM.reveal);
    }

    calcBounds() {
        this.bounds = {
            el: this.DOM.el.getBoundingClientRect(),
            reveal: this.DOM.reveal.getBoundingClientRect()
        };
    }
    // bind some events
    initEvents() {
        this.mouseenterFn = (ev) => {
            // show the image element
            this.showImage();
            this.firstRAFCycle = true;
            // start the render loop animation (rAF)
            this.loopRender();
        };
        this.mouseleaveFn = () => {
            // stop the render loop animation (rAF)
            this.stopRendering();
            // hide the image element
            this.hideImage();
        };
        
        this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
        this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
    }
    // show the image element
    showImage() {
        // kill any current tweens
        gsap.killTweensOf(this.DOM.revealInner);
        gsap.killTweensOf(this.DOM.revealImage);
        
        this.tl = gsap.timeline({
            onStart: () => {
                // show the image element
                this.DOM.reveal.style.opacity = 1;
                // set a high z-index value so image appears on top of other elements
                gsap.set(this.DOM.el, {zIndex: images.length});
            }
        })
        // animate the image wrap
        .to(this.DOM.revealInner, 0.2, {
            ease: 'Sine.easeOut',
            startAt: {x: direction.x < 0 ? '-100%' : '100%'},
            x: '0%'
        })
        // animate the image element
        .to(this.DOM.revealImage, 0.2, {
            ease: 'Sine.easeOut',
            startAt: {x: direction.x < 0 ? '100%': '-100%'},
            x: '0%'
        }, 0);
    }
    // hide the image element
    hideImage() {
        // kill any current tweens
        gsap.killTweensOf(this.DOM.revealInner);
        gsap.killTweensOf(this.DOM.revealImage);

        this.tl = gsap.timeline({
            onStart: () => {
                gsap.set(this.DOM.el, {zIndex: 1});
            },
            onComplete: () => {
                gsap.set(this.DOM.reveal, {opacity: 0});
            }
        })
        .to(this.DOM.revealInner, 0.2, {
            ease: 'Sine.easeOut',
            x: direction.x < 0 ? '100%' : '-100%'
        })
        .to(this.DOM.revealImage, 0.2, {
            ease: 'Sine.easeOut',
            x: direction.x < 0 ? '-100%' : '100%'
        }, 0);
    }
    // start the render loop animation (rAF)
    loopRender() {
        if ( !this.requestId ) {
            this.requestId = requestAnimationFrame(() => this.render());
        }
    }
    // stop the render loop animation (rAF)
    stopRendering() {
        if ( this.requestId ) {
            window.cancelAnimationFrame(this.requestId);
            this.requestId = undefined;
        }
    }
    // translate the item as the mouse moves
    render() {
        this.requestId = undefined;
        // calculate position/sizes the first time
        if ( this.firstRAFCycle ) {
            this.calcBounds();
        }
        // calculate the mouse distance (current vs previous cycle)
        const mouseDistanceX = clamp(Math.abs(mousePosCache.x - mousepos.x), 0, 100);
        // direction where the mouse is moving
        direction = {x: mousePosCache.x-mousepos.x, y: mousePosCache.y-mousepos.y};
        // updated cache values
        mousePosCache = {x: mousepos.x, y: mousepos.y};

        // new translation values
        // the center of the image element is positioned where the mouse is
        this.animatableProperties.tx.current = Math.abs(mousepos.x - this.bounds.el.left) - this.bounds.reveal.width/2;
        this.animatableProperties.ty.current = Math.abs(mousepos.y - this.bounds.el.top) - this.bounds.reveal.height/2;
        // new rotation value
        this.animatableProperties.rotation.current = this.firstRAFCycle ? 0 : map(mouseDistanceX,0,100,0,direction.x < 0 ? 60 : -60);
        // new filter value
        this.animatableProperties.brightness.current = this.firstRAFCycle ? 1 : map(mouseDistanceX,0,100,1,4);

        this.animatableProperties.tx.previous = this.firstRAFCycle ? this.animatableProperties.tx.current : lerp(this.animatableProperties.tx.previous, this.animatableProperties.tx.current, this.animatableProperties.tx.amt);
        this.animatableProperties.ty.previous = this.firstRAFCycle ? this.animatableProperties.ty.current : lerp(this.animatableProperties.ty.previous, this.animatableProperties.ty.current, this.animatableProperties.ty.amt);
        this.animatableProperties.rotation.previous = this.firstRAFCycle ? this.animatableProperties.rotation.current : lerp(this.animatableProperties.rotation.previous, this.animatableProperties.rotation.current, this.animatableProperties.rotation.amt);
        this.animatableProperties.brightness.previous = this.firstRAFCycle ? this.animatableProperties.brightness.current : lerp(this.animatableProperties.brightness.previous, this.animatableProperties.brightness.current, this.animatableProperties.brightness.amt);
        
        gsap.set(this.DOM.reveal, {
            x: this.animatableProperties.tx.previous,
            y: this.animatableProperties.ty.previous,
            rotation: this.animatableProperties.rotation.previous,
            filter: `brightness(${this.animatableProperties.brightness.previous})`
        });

        // loop
        this.firstRAFCycle = false;
        this.loopRender();
    }
}