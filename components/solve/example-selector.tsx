"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calculator, BookOpen, PiSquare, BrainCircuit } from "lucide-react";

const examples = [
  {
    id: "algebra",
    title: "Algebra",
    icon: Calculator,
    problems: [
      {
        id: "algebra-1",
        title: "Quadratic Equation Properties",
        preview:
          "Prove that if a quadratic equation ax² + bx + c = 0 has real roots, then they sum to -b/a.",
      },
      {
        id: "algebra-2",
        title: "Inequality Proof",
        preview:
          "Show that for all positive real numbers a and b, the arithmetic mean is greater than or equal to the geometric mean.",
      },
    ],
  },
  {
    id: "calculus",
    title: "Calculus",
    icon: BookOpen,
    problems: [
      {
        id: "calculus-1",
        title: "Mean Value Theorem",
        preview:
          "Prove the Mean Value Theorem for a continuous function f on [a,b] that is differentiable on (a,b).",
      },
      {
        id: "calculus-2",
        title: "L'Hospital's Rule",
        preview: "Prove L'Hospital's Rule for the indeterminate form 0/0.",
      },
    ],
  },
  {
    id: "number-theory",
    title: "Number Theory",
    icon: PiSquare,
    problems: [
      {
        id: "number-theory-1",
        title: "Perfect Square Properties",
        preview:
          "Prove that the sum of two consecutive perfect squares cannot be a perfect square.",
      },
      {
        id: "number-theory-2",
        title: "Divisibility Rule",
        preview:
          "Prove that if p is a prime number greater than 3, then p² - 1 is divisible by 24.",
      },
    ],
  },
  {
    id: "discrete-math",
    title: "Discrete Math",
    icon: BrainCircuit,
    problems: [
      {
        id: "discrete-math-1",
        title: "Pigeonhole Principle",
        preview:
          "Use the Pigeonhole Principle to prove that among any n+1 integers, there must be at least two that leave the same remainder when divided by n.",
      },
      {
        id: "discrete-math-2",
        title: "Graph Coloring",
        preview:
          "Prove that every planar graph can be colored with at most 4 colors.",
      },
    ],
  },
];

interface ExampleSelectorProps {
  onSelect: () => void;
}

export function ExampleSelector({ onSelect }: ExampleSelectorProps) {
  const [activeTab, setActiveTab] = useState("algebra");

  return (
    <div>
      <h3 className="text-base font-medium mb-3">
        Or try one of our examples:
      </h3>

      <Tabs
        defaultValue="algebra"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
          {examples.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="flex items-center"
            >
              <category.icon className="h-4 w-4 mr-2" />
              <span>{category.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {examples.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.problems.map((problem) => (
                <Card key={problem.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">{problem.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {problem.preview}
                    </p>
                    <Button variant="outline" size="sm" onClick={onSelect}>
                      Use This Example
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
