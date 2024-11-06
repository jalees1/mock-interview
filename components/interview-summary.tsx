"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Download, Home } from "lucide-react";

export default function InterviewSummary() {
  const mockFeedback = {
    overallScore: 85,
    categories: [
      { name: "Technical Knowledge", score: 90 },
      { name: "Communication", score: 85 },
      { name: "Problem Solving", score: 80 },
      { name: "Experience", score: 85 }
    ],
    strengths: [
      "Strong technical understanding of JavaScript concepts",
      "Clear and concise communication style",
      "Good problem-solving approach with real-world examples"
    ],
    improvements: [
      "Could provide more detailed examples in some responses",
      "Consider adding more context about project impact",
      "Expand on testing methodologies discussed"
    ]
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Interview Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="text-center">
            <div className="text-6xl font-bold mb-2">{mockFeedback.overallScore}%</div>
            <p className="text-muted-foreground">Overall Performance</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Performance by Category</h3>
            {mockFeedback.categories.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex justify-between">
                  <span>{category.name}</span>
                  <span>{category.score}%</span>
                </div>
                <Progress value={category.score} />
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-4">Key Strengths</h3>
              <ul className="space-y-2">
                {mockFeedback.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Areas for Improvement</h3>
              <ul className="space-y-2">
                {mockFeedback.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-500">→</span>
                    {improvement}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Link href="/">
              <Button variant="outline">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}