# Scroll-Driven Hero Section Animation

A hero section where scrolling drives the animation: a car moves across the
screen and its trail reveals the "WELCOME ITZFIZZ" headline.

**Live demo:** https://YOUR-USERNAME.github.io/car-scroll-animation/

## Features
- Intro animation on load: road wipes in, car slides in, stat cards appear one by one
- Scroll-linked animation: car position and headline reveal tied to scroll progress
- Smooth easing using GSAP ScrollTrigger `scrub`
- Performance-friendly: animates transforms and `clip-path`, no layout reflows
- Responsive layout

## Tech Stack
Next.js (React), Tailwind CSS, GSAP + ScrollTrigger, HTML, CSS, JavaScript

## How it works
The hero is a tall section (400vh) with a sticky 100vh stage. One scroll
progress value (0 to 1) from ScrollTrigger drives both the car's X position and
the clip-path of the green trail, so the two stay perfectly in sync.

## Run locally
npm install
npm run dev

Then open http://localhost:3000
