"use client";

import {
  FileImage,
  Sparkles,
  BrainCircuit,
  Eye,
  GitBranch,
  History,
  Code,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Image Recognition",
    description:
      "Upload images of handwritten or printed math problems for instant analysis",
    icon: FileImage,
    delay: 0,
  },
  {
    title: "Formal Verification",
    description: "Solutions are formally verified using Lean4 theorem proving",
    icon: Sparkles,
    delay: 0.1,
  },
  {
    title: "AI-Powered Analysis",
    description:
      "Utilizes Qwen2.5 and DeepSeek for accurate mathematical parsing",
    icon: BrainCircuit,
    delay: 0.2,
  },
  {
    title: "Step-by-Step Solutions",
    description:
      "Clear, detailed explanation of each step in the solution process",
    icon: Eye,
    delay: 0.3,
  },
  {
    title: "Proof Tree Visualization",
    description:
      "Interactive visualization of the proof structure and logic flow",
    icon: GitBranch,
    delay: 0.4,
  },
  {
    title: "Solution History",
    description: "Save and review your past problems and solutions",
    icon: History,
    delay: 0.5,
  },
  {
    title: "Export Options",
    description: "Download solutions as LaTeX, PDF, or Lean4 code",
    icon: Code,
    delay: 0.6,
  },
  {
    title: "Fast Processing",
    description: "Get solutions in seconds, even for complex problems",
    icon: Zap,
    delay: 0.7,
  },
];

export function FeaturesSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-20 md:py-28 bg-muted/50">
      <div className="container max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Advanced Features for Mathematical Analysis
          </h2>
          <p className="text-muted-foreground text-lg">
            Our platform combines state-of-the-art AI with formal mathematics to
            provide comprehensive solutions to complex problems.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
