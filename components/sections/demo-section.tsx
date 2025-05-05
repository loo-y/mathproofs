"use client";

import { useRef, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const examples = [
  {
    id: "algebra",
    name: "Algebra",
    problem:
      "Prove that for any integers a, b, and c, if a divides bc and gcd(a, b) = 1, then a divides c.",
    solution: [
      "Since gcd(a, b) = 1, by Bézout's identity, there exist integers x and y such that:",
      "ax + by = 1",
      "Multiplying both sides by c:",
      "axc + byc = c",
      "Since a divides bc, we have bc = ka for some integer k.",
      "Therefore, byc = bkc, and our equation becomes:",
      "axc + bkc = c",
      "Factor out c:",
      "c(ax + bk) = c",
      "Since c ≠ 0 (otherwise the statement is trivial), we can divide both sides by c:",
      "ax + bk = 1",
      "Rearranging:",
      "c = a(xc) + bkc",
      "Since a divides a(xc) and a divides bc (which means a divides bkc), a divides their sum c.",
    ],
  },
  {
    id: "calculus",
    name: "Calculus",
    problem:
      "Prove that if f is a continuous function on [a, b] and f(a) and f(b) have opposite signs, then there exists at least one c ∈ (a, b) such that f(c) = 0.",
    solution: [
      "Given f is continuous on [a, b] and f(a) and f(b) have opposite signs.",
      "Without loss of generality, assume f(a) < 0 and f(b) > 0.",
      "Define a new function g(x) = f(x) for all x ∈ [a, b].",
      "Since f is continuous on [a, b], g is also continuous on [a, b].",
      "We have g(a) = f(a) < 0 and g(b) = f(b) > 0.",
      "By the Intermediate Value Theorem, for any value k between g(a) and g(b), there exists c ∈ [a, b] such that g(c) = k.",
      "In particular, since 0 is between g(a) and g(b), there exists c ∈ [a, b] such that g(c) = 0.",
      "Thus, f(c) = 0 for some c ∈ [a, b].",
      "To show c ∈ (a, b), note that f(a) < 0 and f(b) > 0 by assumption.",
      "Therefore, c ≠ a and c ≠ b, which means c ∈ (a, b).",
    ],
  },
  {
    id: "number-theory",
    name: "Number Theory",
    problem:
      "Prove that the sum of two consecutive perfect squares cannot be a perfect square.",
    solution: [
      "Suppose we have two consecutive perfect squares: n² and (n+1)².",
      "Their sum is n² + (n+1)² = n² + n² + 2n + 1 = 2n² + 2n + 1.",
      "Assume this sum is a perfect square, so 2n² + 2n + 1 = m² for some integer m.",
      "Rearranging: 2n² + 2n + 1 - m² = 0",
      "This can be written as: (2n + 1)² - 2(2n + 1) + 1 - m² = 0",
      "Simplifying: (2n + 1)² - 2(2n + 1) + 1 - m² = 0",
      "Further: (2n + 1 - 1)² - m² = 0",
      "Which gives us: (2n)² - m² = 0",
      "Therefore: 4n² - m² = 0",
      "So m² = 4n²",
      "This means m = ±2n",
      "Since m is an integer, let's say m = 2n (positive case).",
      "Substituting back: 2n² + 2n + 1 = 4n²",
      "Simplifying: 2n + 1 = 2n²",
      "Rearranging: 2n² - 2n - 1 = 0",
      "Using the quadratic formula: n = (2 ± √(4 + 8))/4 = (2 ± √12)/4 = (2 ± 2√3)/4 = (1 ± √3)/2",
      "Since n must be an integer, and (1 ± √3)/2 is irrational, we have a contradiction.",
      "Therefore, the sum of two consecutive perfect squares cannot be a perfect square.",
    ],
  },
];

export function DemoSection() {
  const [activeTab, setActiveTab] = useState("algebra");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const solutionRef = useRef<HTMLDivElement>(null);

  const activeSolution =
    examples.find((ex) => ex.id === activeTab)?.solution || [];

  // Handle demo animation
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPlaying && currentStep < activeSolution.length) {
      timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 1500);
    } else if (currentStep >= activeSolution.length) {
      setIsPlaying(false);
    }

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, activeSolution.length]);

  // Reset animation when tab changes
  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, [activeTab]);

  const handlePlayDemo = () => {
    setCurrentStep(0);
    setIsPlaying(true);
  };

  return (
    <section id="examples" className="py-20 md:py-28 bg-muted/50">
      <div className="container max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            See It In Action
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore examples of how our platform solves different types of
            mathematical problems
          </p>
        </div>

        <div className="bg-card border rounded-xl shadow-lg overflow-hidden">
          <Tabs
            defaultValue="algebra"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <div className="p-4 border-b bg-muted/50">
              <TabsList className="grid grid-cols-3 sm:w-[400px]">
                {examples.map((example) => (
                  <TabsTrigger key={example.id} value={example.id}>
                    {example.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {examples.map((example) => (
              <TabsContent
                key={example.id}
                value={example.id}
                className="p-6 space-y-8"
              >
                <div>
                  <h3 className="text-lg font-medium mb-3">Problem</h3>
                  <div className="bg-muted rounded-lg p-4">
                    <p>{example.problem}</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium">Solution</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePlayDemo}
                      disabled={isPlaying}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Watch Solution
                    </Button>
                  </div>

                  <div
                    className="bg-background border rounded-lg p-4 h-[300px] overflow-y-auto"
                    ref={solutionRef}
                  >
                    <div className="space-y-4">
                      {example.solution
                        .slice(0, currentStep)
                        .map((step, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="p-3 bg-muted/50 rounded"
                          >
                            <p>{step}</p>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button asChild>
                    <Link href="/solve">
                      Try It Yourself <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
