"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CarSvg from "./CarSvg";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE = "WELCOME ITZFIZZ".split("");
const TOP = [
  { value: "58%", text: "Increase in pick up point use", cls: "bg-[#dff74f] text-black" },
  { value: "27%", text: "Increase in pick up point use", cls: "bg-[#333] text-white" },
];
const BOTTOM = [
  { value: "23%", text: "Decreased in customer phone calls", cls: "bg-[#6bcbff] text-black" },
  { value: "40%", text: "Decreased in customer phone calls", cls: "bg-[#fa7328] text-black" },
];

const Card = ({ value, text, cls }) => (
  <div className={`stat w-40 rounded-2xl p-4 md:w-[19vw] md:p-[1.6vw] ${cls}`}>
    <div className="text-4xl font-bold md:text-[4.5vw] md:leading-none">{value}</div>
    <p className="mt-2 text-xs md:text-[1.2vw]">{text}</p>
  </div>
);

export default function Hero() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const vw = () => window.innerWidth;
      const carW = () => document.querySelector(".car").offsetWidth;

      // ---- Intro on load: road wipes in, car slides in, stats pop in one by one
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".road", { scaleY: 0, duration: 0.8 })
        .from(".car", { opacity: 0, x: "-=60", duration: 0.8 }, "-=0.3")
        .from(".stat", { opacity: 0, y: 40, duration: 0.8, stagger: 0.18 }, "-=0.4");

      // ---- Scroll-linked: one progress value (0..1) drives car + reveal trail
      const state = { p: 0 };
      const render = () => {
        const w = vw();
        const startX = -carW();
        const endX = w;                     // car fully exits right
        const x = startX + (endX - startX) * state.p;
        gsap.set(".car", { x });
        // trail ends just behind the car's nose-to-tail midpoint
        const edge = x + carW() * 0.15;
        const hidden = Math.min(100, Math.max(0, 100 - (edge / w) * 100));
        gsap.set(".trail", { clipPath: `inset(0 ${hidden}% 0 0)` });
      };
      render();

      gsap.to(state, {
        p: 1,
        ease: "none",
        onUpdate: render,
        scrollTrigger: { trigger: ".track", start: "top top", end: "bottom bottom", scrub: 1.2 },
      });

      const onResize = () => render();
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="track relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* stat cards */}
        <div className="absolute right-[6vw] top-[3vh] flex gap-4 md:gap-[3vw]">
          {TOP.map((s) => <Card key={s.value} {...s} />)}
        </div>
        <div className="absolute bottom-[3vh] right-[10vw] flex gap-4 md:gap-[3vw]">
          {BOTTOM.map((s) => <Card key={s.value} {...s} />)}
        </div>

        {/* road strip */}
        <div className="road absolute inset-x-0 top-[38%] h-[26%] origin-center bg-[#1e1e1e]">
          {/* green trail + headline, revealed from the left as the car passes */}
          <div className="trail absolute inset-0 flex items-center bg-[#45dc7f]" style={{ clipPath: "inset(0 100% 0 0)" }}>
            <h1 className="flex w-full justify-between px-[1vw] text-[7.5vw] font-black leading-none text-[#111]">
              {HEADLINE.map((c, i) => (
                <span key={i} className={c === " " ? "w-[2vw]" : ""}>{c}</span>
              ))}
            </h1>
          </div>
        </div>

        {/* car */}
        <div className="car absolute left-0 top-[51%] z-20 w-[34vw] -translate-y-1/2 will-change-transform md:w-[28vw]">
          <CarSvg className="h-auto w-full drop-shadow-[0_10px_20px_rgba(0,0,0,.5)]" />
        </div>
      </div>
    </section>
  );
}
