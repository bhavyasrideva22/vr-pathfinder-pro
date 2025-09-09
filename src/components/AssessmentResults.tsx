import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Code, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight,
  BookOpen,
  Users,
  Lightbulb
} from "lucide-react";

interface AssessmentResultsProps {
  responses: Record<string, string>;
  onRestart: () => void;
}

interface ScoreResult {
  score: number;
  interpretation: string;
  details: string;
}

const AssessmentResults = ({ responses, onRestart }: AssessmentResultsProps) => {
  const results = useMemo(() => {
    // Calculate scores based on responses
    const calculatePsychometricScore = (): ScoreResult => {
      const interestQuestions = ['interest_1', 'interest_2'];
      const personalityQuestions = ['personality_1', 'personality_2'];
      const motivationQuestions = ['motivation_1'];
      
      let totalScore = 0;
      let questionCount = 0;
      
      [...interestQuestions, ...personalityQuestions, ...motivationQuestions].forEach(qId => {
        if (responses[qId] !== undefined) {
          const responseValue = parseInt(responses[qId]);
          totalScore += (responseValue + 1) * 20; // Convert 0-4 to 20-100 scale
          questionCount++;
        }
      });
      
      const score = questionCount > 0 ? Math.round(totalScore / questionCount) : 0;
      
      let interpretation = "";
      let details = "";
      
      if (score >= 85) {
        interpretation = "Highly aligned personality and motivation for VR Simulation";
        details = "Your personality traits and motivation strongly align with success in VR simulation engineering. You show high interest, openness to new experiences, and strong motivation for technical challenges.";
      } else if (score >= 50) {
        interpretation = "Moderate alignment; potential with skill development";
        details = "You have a good foundation of personality traits for VR engineering. With focused skill development and experience, you could thrive in this field.";
      } else {
        interpretation = "Lower alignment; consider exploring other tech fields";
        details = "While VR simulation engineering might not be the perfect fit based on personality alignment, consider related fields like general software development or UI/UX design.";
      }
      
      return { score, interpretation, details };
    };

    const calculateTechnicalScore = (): ScoreResult => {
      const aptitudeQuestions = ['aptitude_1', 'aptitude_2'];
      const prereqQuestions = ['prereq_1', 'prereq_2', 'prereq_3'];
      const domainQuestions = ['domain_1', 'domain_2'];
      
      // Define correct answers
      const correctAnswers: Record<string, string> = {
        'aptitude_1': '1', // On the back
        'aptitude_2': '0', // (5,3,-1)
        'prereq_1': '1', // Container for storing data values
        'prereq_2': '1', // To repeat a block of code multiple times
        'prereq_3': '1', // Converting 3D scenes into 2D images
        'domain_1': '1', // To detect physical interactions between objects
        'domain_2': '1', // Simulating real-world physical behavior of objects
      };
      
      let correctCount = 0;
      let totalQuestions = 0;
      
      [...aptitudeQuestions, ...prereqQuestions, ...domainQuestions].forEach(qId => {
        if (responses[qId] !== undefined) {
          totalQuestions++;
          if (responses[qId] === correctAnswers[qId]) {
            correctCount++;
          }
        }
      });
      
      const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
      
      let interpretation = "";
      let details = "";
      
      if (score >= 85) {
        interpretation = "Strong technical foundation, ready for advanced learning";
        details = "You demonstrate excellent technical knowledge and aptitude. You're well-prepared to dive into advanced VR development concepts and tools.";
      } else if (score >= 50) {
        interpretation = "Basic foundation present, further study recommended";
        details = "You have a solid starting point for VR development. Focus on strengthening your programming fundamentals and 3D graphics concepts.";
      } else {
        interpretation = "Beginner level, needs foundational courses";
        details = "Consider starting with programming fundamentals, basic 3D graphics concepts, and introductory game development before specializing in VR.";
      }
      
      return { score, interpretation, details };
    };

    const calculateWISCARScores = () => {
      const wiscarCategories = {
        will: ['wiscar_will_1'],
        interest: ['wiscar_interest_1'], 
        skill: ['wiscar_skill_1'],
        cognitive: ['wiscar_cognitive_1'],
        ability: ['wiscar_ability_1'],
        realWorld: ['wiscar_real_world_1']
      };
      
      const wiscarScores: Record<string, number> = {};
      
      Object.entries(wiscarCategories).forEach(([category, questionIds]) => {
        let totalScore = 0;
        let questionCount = 0;
        
        questionIds.forEach(qId => {
          if (responses[qId] !== undefined) {
            const responseValue = parseInt(responses[qId]);
            totalScore += (responseValue + 1) * 20;
            questionCount++;
          }
        });
        
        wiscarScores[category] = questionCount > 0 ? Math.round(totalScore / questionCount) : 0;
      });
      
      return wiscarScores;
    };

    const psychometricResult = calculatePsychometricScore();
    const technicalResult = calculateTechnicalScore();
    const wiscarScores = calculateWISCARScores();
    
    // Overall recommendation
    const overallScore = Math.round((psychometricResult.score + technicalResult.score) / 2);
    let recommendation = "";
    let nextSteps: string[] = [];
    
    if (overallScore >= 75) {
      recommendation = "Yes - Pursue VR Simulation Engineering";
      nextSteps = [
        "Start with Unity or Unreal Engine tutorials",
        "Practice C# programming fundamentals", 
        "Join VR development communities online",
        "Build simple VR projects to create a portfolio",
        "Consider formal education or bootcamps in game development"
      ];
    } else if (overallScore >= 50) {
      recommendation = "Maybe - Develop skills first, then reassess";
      nextSteps = [
        "Strengthen programming fundamentals",
        "Learn 3D graphics and mathematics basics",
        "Explore VR experiences to build interest",
        "Take introductory courses in game development",
        "Reassess after 6 months of skill building"
      ];
    } else {
      recommendation = "No - Consider alternative paths";
      nextSteps = [
        "Explore general software development",
        "Consider UI/UX design for tech products",
        "Look into 2D game development",
        "Investigate web development or mobile apps",
        "Focus on your strongest areas of interest"
      ];
    }
    
    return {
      psychometric: psychometricResult,
      technical: technicalResult,
      wiscar: wiscarScores,
      overall: overallScore,
      recommendation,
      nextSteps
    };
  }, [responses]);

  const confidenceScore = Math.round((results.psychometric.score + results.technical.score + Object.values(results.wiscar).reduce((a, b) => a + b, 0) / 6) / 3);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-1/4 w-32 h-32 rounded-full glow-primary floating-animation opacity-15"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 rounded-full glow-secondary floating-animation opacity-10" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            Assessment Complete
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 hero-gradient bg-clip-text text-transparent">
            Your VR Engineering Assessment Results
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive analysis of your readiness and alignment for VR simulation engineering
          </p>
        </div>

        {/* Overall Recommendation */}
        <Card className="card-gradient border-border/50 shadow-elevated mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl flex items-center justify-center gap-3">
              {results.overall >= 75 ? (
                <CheckCircle className="w-8 h-8 text-green-400" />
              ) : results.overall >= 50 ? (
                <AlertCircle className="w-8 h-8 text-yellow-400" />
              ) : (
                <AlertCircle className="w-8 h-8 text-red-400" />
              )}
              {results.recommendation}
            </CardTitle>
            <CardDescription className="text-lg">
              Overall Readiness Score: {results.overall}/100 | Confidence Level: {confidenceScore}%
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Score Breakdown */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Psychological Fit */}
          <Card className="card-gradient border-border/50 shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-primary" />
                Psychological Fit
              </CardTitle>
              <CardDescription>{results.psychometric.score}/100</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={results.psychometric.score} className="mb-4" />
              <h4 className="font-semibold mb-2">{results.psychometric.interpretation}</h4>
              <p className="text-sm text-muted-foreground">{results.psychometric.details}</p>
            </CardContent>
          </Card>

          {/* Technical Readiness */}
          <Card className="card-gradient border-border/50 shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Code className="w-6 h-6 text-secondary" />
                Technical Readiness
              </CardTitle>
              <CardDescription>{results.technical.score}/100</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={results.technical.score} className="mb-4" />
              <h4 className="font-semibold mb-2">{results.technical.interpretation}</h4>
              <p className="text-sm text-muted-foreground">{results.technical.details}</p>
            </CardContent>
          </Card>
        </div>

        {/* WISCAR Analysis */}
        <Card className="card-gradient border-border/50 shadow-elevated mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Target className="w-6 h-6 text-accent" />
              WISCAR Framework Analysis
            </CardTitle>
            <CardDescription>
              Detailed breakdown of readiness factors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(results.wiscar).map(([category, score]) => (
                <div key={category} className="text-center">
                  <div className="mb-2">
                    <div className="text-2xl font-bold text-primary">{score}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">
                      {category === 'realWorld' ? 'Real-World Alignment' : category}
                    </div>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="card-gradient border-border/50 shadow-elevated mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-primary" />
              Recommended Next Steps
            </CardTitle>
            <CardDescription>
              Personalized action plan based on your results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.nextSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <ArrowRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Career Paths */}
        <Card className="card-gradient border-border/50 shadow-elevated mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Users className="w-6 h-6 text-secondary" />
              Related Career Opportunities
            </CardTitle>
            <CardDescription>
              Job roles enabled by VR simulation engineering skills
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "VR Simulation Engineer",
                "VR Software Developer", 
                "3D Environment Artist",
                "Interaction Designer for VR",
                "Game Developer (VR Focus)",
                "Training & Simulation Specialist"
              ].map((career, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted/30 text-center">
                  <p className="font-medium">{career}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Resources */}
        <Card className="card-gradient border-border/50 shadow-elevated mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-accent" />
              Learning Resources
            </CardTitle>
            <CardDescription>
              Curated resources to support your journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 rounded-lg bg-muted/30">
                <Lightbulb className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-semibold mb-2">Programming Fundamentals</h4>
                <p className="text-sm text-muted-foreground">C#, object-oriented programming, data structures</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <Code className="w-8 h-8 text-secondary mb-3" />
                <h4 className="font-semibold mb-2">Game Engines</h4>
                <p className="text-sm text-muted-foreground">Unity3D, Unreal Engine, VR SDKs</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <Target className="w-8 h-8 text-accent mb-3" />
                <h4 className="font-semibold mb-2">3D Graphics</h4>
                <p className="text-sm text-muted-foreground">Linear algebra, 3D modeling, rendering</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="text-center">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={onRestart}
            className="transition-bounce hover:scale-105"
          >
            Take Assessment Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResults;