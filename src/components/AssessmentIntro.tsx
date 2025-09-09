import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Code, Zap, Target, Users, Lightbulb } from "lucide-react";

interface AssessmentIntroProps {
  onStartAssessment: () => void;
}

const AssessmentIntro = ({ onStartAssessment }: AssessmentIntroProps) => {
  const skills = [
    { icon: Code, label: "3D Programming", desc: "Unity, Unreal Engine, C#" },
    { icon: Brain, label: "Spatial Reasoning", desc: "3D visualization & design" },
    { icon: Zap, label: "Problem Solving", desc: "Systems thinking & debugging" },
    { icon: Target, label: "Attention to Detail", desc: "Precision in VR interactions" },
    { icon: Users, label: "Collaboration", desc: "Team-based development" },
    { icon: Lightbulb, label: "Innovation", desc: "Creative solution design" }
  ];

  const careers = [
    "VR Simulation Engineer",
    "VR Software Developer", 
    "3D Environment Artist",
    "Interaction Designer for VR",
    "Game Developer (VR Focus)",
    "Training & Simulation Specialist"
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full glow-primary floating-animation opacity-20"></div>
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full glow-secondary floating-animation opacity-15" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full bg-accent/10 floating-animation" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
            Career Assessment Platform
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 hero-gradient bg-clip-text text-transparent leading-tight">
            VR Simulation Engineer
            <br />
            <span className="text-3xl md:text-5xl">Assessment</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Discover if pursuing a career as a VR Simulation Engineer aligns with your 
            personality, skills, and motivation through our comprehensive assessment.
          </p>
          
          <Button 
            variant="hero" 
            size="lg" 
            onClick={onStartAssessment}
            className="text-lg px-8 py-4 transition-bounce hover:scale-105 pulse-glow"
          >
            Start Your Assessment
          </Button>
        </div>

        {/* What is VR Simulation Engineering */}
        <Card className="card-gradient border-border/50 mb-12 shadow-elevated">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl text-center">What is VR Simulation Engineering?</CardTitle>
            <CardDescription className="text-center text-lg text-muted-foreground">
              The art and science of creating immersive virtual worlds
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed text-center max-w-4xl mx-auto">
              VR Simulation Engineering involves designing, developing, and testing immersive virtual 
              environments for training, entertainment, education, and industrial applications. 
              Engineers in this field combine technical programming skills with creative design 
              to build experiences that feel real and engaging.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              <Badge variant="outline">Unity3D</Badge>
              <Badge variant="outline">Unreal Engine</Badge>
              <Badge variant="outline">C# Programming</Badge>
              <Badge variant="outline">3D Modeling</Badge>
              <Badge variant="outline">Physics Simulation</Badge>
              <Badge variant="outline">VR Hardware</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Key Skills Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Key Skills & Traits for Success</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <Card key={index} className="card-gradient border-border/50 transition-smooth hover:scale-105 hover:glow-primary/50">
                <CardContent className="p-6 text-center">
                  <skill.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">{skill.label}</h3>
                  <p className="text-muted-foreground text-sm">{skill.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Career Paths */}
        <Card className="card-gradient border-border/50 shadow-elevated">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Typical Career Paths</CardTitle>
            <CardDescription className="text-center">
              Opportunities enabled by VR simulation engineering skills
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {careers.map((career, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted/30 text-center transition-smooth hover:bg-muted/50">
                  <p className="font-medium">{career}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assessment Info */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">What You'll Discover</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Psychological Fit</h3>
              <p className="text-sm text-muted-foreground">Personality traits and motivational alignment</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">Technical Readiness</h3>
              <p className="text-sm text-muted-foreground">Current skill level and learning potential</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Career Guidance</h3>
              <p className="text-sm text-muted-foreground">Personalized next steps and recommendations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentIntro;