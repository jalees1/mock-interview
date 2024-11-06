"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const experienceLevels = ["Entry Level", "Mid Level", "Senior", "Lead"];
const commonTags = ["Frontend", "Backend", "Full Stack", "DevOps", "Mobile"];
const commonSkills = ["JavaScript", "React", "Node.js", "Python", "Java", "TypeScript"];

export default function InterviewGenerator() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState("");
  const [duration, setDuration] = useState([30]);

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSkillClick = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleAddCustomSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && customSkill.trim()) {
      setSelectedSkills(prev => [...prev, customSkill.trim()]);
      setCustomSkill("");
    }
  };

  const startInterview = () => {
    router.push("/interview-room");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl">Generate Your Interview</CardTitle>
          <CardDescription>
            Customize your interview settings to match your target role
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <Label>Experience Level</Label>
            <Select defaultValue="Mid Level">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {experienceLevels.map(level => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Role Tags</Label>
            <div className="flex flex-wrap gap-2">
              {commonTags.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label>Required Skills</Label>
            <div className="flex flex-wrap gap-2 mb-4">
              {commonSkills.map(skill => (
                <Badge
                  key={skill}
                  variant={selectedSkills.includes(skill) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleSkillClick(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
            <Input
              placeholder="Add custom skill (press Enter)"
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              onKeyPress={handleAddCustomSkill}
            />
          </div>

          <div className="space-y-4">
            <Label>Interview Duration (minutes)</Label>
            <Slider
              value={duration}
              onValueChange={setDuration}
              max={60}
              min={15}
              step={5}
              className="w-full"
            />
            <div className="text-center font-medium">{duration} minutes</div>
          </div>

          <Button 
            size="lg" 
            className="w-full"
            onClick={startInterview}
          >
            Start Interview
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}