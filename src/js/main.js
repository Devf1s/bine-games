import * as flsFunctions from "./modules/functions.js";
import Swiper, { Autoplay } from 'swiper';
import Lenis from '@studio-freight/lenis';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

flsFunctions.isWebp();

(function () {
	//* --- Modal Window --- *//
	const modal = document.getElementById('modal');
	const openBtn = document.getElementById('openBtn');
	const closeBtn = document.getElementById('closeBtn');
	
	openBtn.onclick = function() {
		modal.classList.add('open');
		lenis.stop();
	}

	closeBtn.onclick = function() {
		modal.classList.remove('open');
		lenis.start();
	}

	window.onclick = function(e) {
		if (e.target == modal) {
			modal.classList.remove('open');
			lenis.start();
		}
	}


	//* --- Slider --- *//
	const additionalSlide = document.getElementById('additionalSlide');
	const swiper = new Swiper('.game__slider', {
		modules: [Autoplay],
		speed: 1400,
		spaceBetween: 30,
		centeredSlides: true,
		slidesPerView: 'auto',
		grabCursor: true,
		loop: true,
		loopedSlides: 5,
		effect: 'none',
		autoplay: {
			delay: 500,
		},
		breakpoints: {
			// ... //
		}
	});
	if (window.innerWidth <= 480) {
		swiper.destroy();
		additionalSlide.classList.add('swiper-slide');
	}


	//* --- Horizontal Scroll --- *//
	const lenis = new Lenis({
		duration: 1.2,
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		direction: 'vertical',
		gestureDirection: 'vertical',
		smooth: true,
		mouseMultiplier: 1,
		smoothTouch: false,
		touchMultiplier: 2,
		infinite: false,
	});
	window.lenis = lenis;
	
	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);


	gsap.registerPlugin(ScrollTrigger);
	const container = document.querySelector('.roadmap__items');
	let timeout = 0.5;
	if (window.innerWidth <= 480) timeout = 2.5;

	gsap.to(container, {
		x: () => -(container.scrollWidth - document.documentElement.clientWidth) + "px",
		ease: "none",
		scrollTrigger: {
		  trigger: container,
		  invalidateOnRefresh: true,
		  pin: '.roadmap',
		  scrub: 1,
		  end: () => "+=" + container.offsetWidth * timeout
		}
	});


	//* --- Timer --- *//
	let delay = 1000 * 60 * 60; // hour 

	function Timer() {
		let currentDate = new Date().getTime(),
			countDownDate = new Date('Jan 11, 2023 12:00:00').getTime(),
			timeLeft = countDownDate - currentDate;

		let months = Math.floor(timeLeft / ((1000 * 60 * 60 * 24) * 30)),
			days = Math.floor((timeLeft % ((1000 * 60 * 60 * 24) * 30)) / (1000 * 60 * 60 * 24)), 
			hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		
		let numbers = null,
			list = [],
			dateElements = [];
		
		const div = document.querySelector('.dynamite__numbers');

		dateElements.push(months, days, hours);
		dateElements.forEach((dateElement, index) => {
			numbers = NumberToImage(dateElement);
			list.push(numbers);
			
			if (index === dateElements.length - 1) {
				if (div.hasChildNodes()) {
					div.replaceChildren(); // delete old child nodes 
					list.forEach(numbers => div.appendChild(numbers));
				} else {
					list.forEach(numbers => div.appendChild(numbers));
				}
			}
		});

		setTimeout(() => {
			Timer();
		}, delay); // Verification will take place every hour
	}
	Timer();

	function NumberToImage(numbers) {
		const div = document.createElement('div');
		div.classList.add('dynamite__number');
	
		if (numbers < 0) numbers = 0; 
		numbers = Array.from(String(numbers), Number);
		if (numbers.length < 2) numbers.unshift(0); // add 0 before single digit
	
		numbers = numbers.map(number => {
			const img = document.createElement('img');
			img.src = `img/presale/numbers/number${number}.png`;
			img.alt = `Number ${number}`;
			div.appendChild(img);
		});
		return div;
	}
	

	//* --- Burger --- *//
	const burger = document.querySelector('.icon-menu'),
		  burgerMenu = document.querySelector('.nav'),
		  burgerWrapper = document.querySelector('.header'),
		  burgerList = [burger, burgerMenu, burgerWrapper];

	burger.addEventListener('click', () => {
		burgerList.forEach((e) => {
			e.classList.toggle('active');
		});
	});
})();