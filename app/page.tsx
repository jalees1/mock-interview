import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Briefcase, Clock, Target } from "lucide-react";
import Link from "next/link";
import FeaturedJobs from "@/components/featured-jobs";

export default function Home() {
  const features = [
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "AI-Powered Practice",
      description: "Get realistic interview practice with our advanced AI system"
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Role-Specific Training",
      description: "Customize your practice sessions for specific job roles"
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Real-time Feedback",
      description: "Receive instant feedback on your performance"
    },
    {
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      title: "Job Matching",
      description: "Find and practice for real job openings"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Master Your Interview Skills
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Practice with AI-powered mock interviews tailored to your target roles
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/interview-generator">
            <Button size="lg" className="text-lg">
              Start Practicing
            </Button>
          </Link>
          <Link href="/jobs">
            <Button size="lg" variant="outline" className="text-lg">
              Browse Jobs
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {features.map((feature, index) => (
          <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="mb-2">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Job Openings</h2>
          <Link href="/jobs">
            <Button variant="ghost">View All Jobs →</Button>
          </Link>
        </div>
        <FeaturedJobs />
      </section>
    </div>
  );
}