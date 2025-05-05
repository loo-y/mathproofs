"use client";

import { useState } from "react";
import { FileUploader } from "@/components/solve/file-uploader";
import { ProcessingStages } from "@/components/solve/processing-stages";
import { SolutionDisplay } from "@/components/solve/solution-display";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProcessingState, SolutionData } from "@/lib/types";
import { ExampleSelector } from "@/components/solve/example-selector";
import { motion } from "framer-motion";

export default function SolvePage() {
  const [processingState, setProcessingState] =
    useState<ProcessingState>("idle");
  const [solution, setSolution] = useState<SolutionData | null>(null);

  const handleUploadComplete = () => {
    // Simulate processing steps with timeouts
    setProcessingState("uploading");

    setTimeout(() => {
      setProcessingState("analyzing");
      setTimeout(() => {
        setProcessingState("converting");
        setTimeout(() => {
          setProcessingState("proving");
          setTimeout(() => {
            setProcessingState("complete");
            setSolution({
              originalText:
                "Prove that if $n$ is an integer, then $n^2 - n + 2$ is even.",
              formalizedText:
                "theorem even_square_minus_n_plus_two (n : ℤ) : even (n^2 - n + 2)",
              steps: [
                { id: 1, content: "Consider the parity of $n$." },
                {
                  id: 2,
                  content:
                    "Case 1: $n$ is even, so $n = 2k$ for some integer $k$.",
                },
                {
                  id: 3,
                  content:
                    "Then $n^2 - n + 2 = 4k^2 - 2k + 2 = 2(2k^2 - k + 1)$, which is even.",
                },
                {
                  id: 4,
                  content:
                    "Case 2: $n$ is odd, so $n = 2k + 1$ for some integer $k$.",
                },
                {
                  id: 5,
                  content:
                    "Then $n^2 - n + 2 = (2k+1)^2 - (2k+1) + 2 = 4k^2 + 4k + 1 - 2k - 1 + 2 = 4k^2 + 2k + 2 = 2(2k^2 + k + 1)$, which is even.",
                },
                {
                  id: 6,
                  content:
                    "Therefore, in both cases, $n^2 - n + 2$ is even for any integer $n$.",
                },
              ],
              proofTree: {
                nodes: [
                  { id: "n1", label: "Target: even (n^2 - n + 2)" },
                  { id: "n2", label: "Case n even" },
                  { id: "n3", label: "Case n odd" },
                  { id: "n4", label: "n = 2k" },
                  { id: "n5", label: "n = 2k+1" },
                  { id: "n6", label: "n^2 - n + 2 = 2(2k^2 - k + 1)" },
                  { id: "n7", label: "n^2 - n + 2 = 2(2k^2 + k + 1)" },
                ],
                edges: [
                  { from: "n1", to: "n2" },
                  { from: "n1", to: "n3" },
                  { from: "n2", to: "n4" },
                  { from: "n3", to: "n5" },
                  { from: "n4", to: "n6" },
                  { from: "n5", to: "n7" },
                ],
              },
            });
          }, 2000);
        }, 1500);
      }, 1200);
    }, 800);
  };

  const resetState = () => {
    setProcessingState("idle");
    setSolution(null);
  };

  return (
    <div className="container max-w-6xl py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">
              Math Problem Solver
            </CardTitle>
            <CardDescription>
              Upload an image of a math problem or select from our examples
            </CardDescription>
          </CardHeader>
          <CardContent>
            {processingState === "idle" ? (
              <div className="space-y-8">
                <FileUploader onUploadComplete={handleUploadComplete} />
                <ExampleSelector onSelect={handleUploadComplete} />
              </div>
            ) : processingState === "complete" ? (
              <SolutionDisplay solution={solution!} onReset={resetState} />
            ) : (
              <ProcessingStages currentStage={processingState} />
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
