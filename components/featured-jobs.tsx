"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "Remote",
    salary: "$120k - $160k",
    tags: ["React", "TypeScript", "Next.js"],
    experience: "Senior",
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "StartupX",
    location: "San Francisco, CA",
    salary: "$140k - $180k",
    tags: ["Node.js", "React", "PostgreSQL"],
    experience: "Mid-Senior",
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "InnovateLabs",
    location: "New York, NY",
    salary: "$90k - $120k",
    tags: ["JavaScript", "Vue.js", "CSS"],
    experience: "Mid-Level",
  }
];

export default function FeaturedJobs() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockJobs.map((job) => (
        <Card key={job.id} className="flex flex-col">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                <CardDescription className="text-lg font-medium">
                  {job.company}
                </CardDescription>
              </div>
              <Badge variant="secondary">{job.experience}</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>{job.location}</span>
                <span className="font-medium">{job.salary}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <Link href={`/interview-generator?jobId=${job.id}`} className="flex-1">
                  <Button className="w-full">Practice Interview</Button>
                </Link>
                <Link href={`/jobs/${job.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">View Details</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}