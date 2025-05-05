"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Camera, ScanSearch, FileCode, CheckCircle2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    title: "Capture",
    description: "Upload an image of your math problem or type it in",
    icon: Camera,
    color:
      "bg-blue-500/20 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  },
  {
    title: "Analyze",
    description: "AI recognizes and interprets the mathematical notation",
    icon: ScanSearch,
    color:
      "bg-purple-500/20 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
  },
  {
    title: "Formalize",
    description: "Problem is converted to formal mathematical language",
    icon: FileCode,
    color:
      "bg-orange-500/20 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
  },
  {
    title: "Verify",
    description: "Solution is proven with formal verification methods",
    icon: CheckCircle2,
    color:
      "bg-emerald-500/20 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  },
];

export function WorkflowSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const stepElements = stepsRef.current.filter(Boolean) as HTMLDivElement[];

    if (!section || stepElements.length === 0 || typeof window === "undefined")
      return;

    // Main animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "bottom 70%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate the connector line
    const connector = section.querySelector(".connector-line") as HTMLElement;
    if (connector) {
      tl.fromTo(
        connector,
        { height: 0 },
        { height: "100%", duration: 1.5, ease: "power3.out" },
        0,
      );
    }

    // Animate each step
    stepElements.forEach((step, index) => {
      tl.fromTo(
        step,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" },
        index * 0.2,
      );
    });

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, []);

  return (
    <section id="how-it-works" className="py-20 md:py-28" ref={sectionRef}>
      <div className="container max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg">
            Our streamlined process transforms your math problems into formally
            verified solutions
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical connector line */}
          <div className="connector-line absolute left-[27px] md:left-1/2 top-[40px] bottom-0 w-[2px] bg-primary/30 md:-translate-x-px h-0" />

          <div className="space-y-16 md:space-y-24 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => (stepsRef.current[index] = el)}
                className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 opacity-0"
              >
                <div
                  className={`flex-none z-10 flex items-center justify-center h-14 w-14 rounded-full ${step.color}`}
                >
                  <step.icon className="h-7 w-7" />
                </div>

                <div className="md:w-1/2 md:text-right md:pr-8 md:order-first">
                  {index % 2 === 0 ? (
                    <div className="md:hidden">
                      <h3 className="text-xl font-semibold mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </>
                  )}
                </div>

                <div className="md:w-1/2 md:pl-8">
                  {index % 2 === 0 ? (
                    <div className="hidden md:block">
                      <h3 className="text-xl font-semibold mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  ) : (
                    <div className="md:hidden">
                      <h3 className="text-xl font-semibold mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
