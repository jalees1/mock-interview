"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Camera, CameraOff, Timer } from "lucide-react";
import InterviewSummary from "@/components/interview-summary";

const mockQuestions = [
  "Can you explain the concept of closures in JavaScript?",
  "What's your experience with state management in React?",
  "How do you handle cross-browser compatibility issues?",
  "Describe a challenging project you've worked on and how you overcame obstacles.",
  "How do you approach testing in your frontend applications?"
];

export default function InterviewRoom() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes per question
  const [isRecording, setIsRecording] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [transcription, setTranscription] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Request camera access
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => console.error("Error accessing camera:", err));

    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (currentQuestion < mockQuestions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            return 300;
          } else {
            clearInterval(timer);
            setIsFinished(true);
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion]);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate speech-to-text
      const mockResponses = [
        "In my experience, closures are...",
        "I typically use Redux for large applications...",
        "I use feature detection and progressive enhancement...",
      ];
      let transcriptIndex = 0;
      const interval = setInterval(() => {
        if (transcriptIndex < mockResponses.length) {
          setTranscription(prev => prev + " " + mockResponses[transcriptIndex]);
          transcriptIndex++;
        } else {
          clearInterval(interval);
        }
      }, 2000);
    }
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.enabled = !isCameraOn);
    }
  };

  if (isFinished) {
    return <InterviewSummary />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <Button
                    size="icon"
                    variant={isCameraOn ? "default" : "destructive"}
                    onClick={toggleCamera}
                  >
                    {isCameraOn ? <Camera /> : <CameraOff />}
                  </Button>
                  <Button
                    size="icon"
                    variant={isRecording ? "default" : "destructive"}
                    onClick={toggleRecording}
                  >
                    {isRecording ? <Mic /> : <MicOff />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Timer className="h-5 w-5" />
                <Progress value={(timeLeft / 300) * 100} />
                <span className="font-mono">
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
                </span>
              </div>
              <div className="space-y-2">
                <Badge>Question {currentQuestion + 1}/{mockQuestions.length}</Badge>
                <h2 className="text-2xl font-semibold">{mockQuestions[currentQuestion]}</h2>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Live Transcription</h3>
            <div className="h-[600px] overflow-y-auto bg-muted/10 rounded-lg p-4">
              {transcription || "Start speaking to see your response..."}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}