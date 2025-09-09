import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Question {
  id: string;
  category: 'psychometric' | 'technical' | 'wiscar';
  subcategory: string;
  question: string;
  options: string[];
  type: 'likert' | 'multiple-choice' | 'aptitude';
}

interface AssessmentQuestionsProps {
  onComplete: (responses: Record<string, string>) => void;
  onBack: () => void;
}

const AssessmentQuestions = ({ onComplete, onBack }: AssessmentQuestionsProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});

  const questions: Question[] = [
    // Psychometric - Interest Scale
    {
      id: "interest_1",
      category: "psychometric",
      subcategory: "Interest Scale",
      question: "How excited do you feel when you hear about new VR technologies or applications?",
      options: ["Not at all excited", "Slightly excited", "Moderately excited", "Very excited", "Extremely excited"],
      type: "likert"
    },
    {
      id: "interest_2", 
      category: "psychometric",
      subcategory: "Interest Scale",
      question: "How often do you find yourself thinking about 3D design or immersive experiences?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Very often"],
      type: "likert"
    },
    {
      id: "interest_3",
      category: "psychometric", 
      subcategory: "Interest Scale",
      question: "When you see a well-designed VR simulation, what is your first reaction?",
      options: ["I wonder how it was built", "I think about how to improve it", "I want to try creating something similar", "I analyze the user experience", "I imagine new applications"],
      type: "multiple-choice"
    },

    // Psychometric - Personality Compatibility
    {
      id: "personality_1",
      category: "psychometric",
      subcategory: "Personality Compatibility", 
      question: "I enjoy exploring new ideas and unconventional approaches to problems.",
      options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"],
      type: "likert"
    },
    {
      id: "personality_2",
      category: "psychometric",
      subcategory: "Personality Compatibility",
      question: "I prefer working on projects that have clear structure and defined requirements.",
      options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"], 
      type: "likert"
    },
    {
      id: "personality_3",
      category: "psychometric",
      subcategory: "Personality Compatibility",
      question: "When facing a complex technical challenge, I tend to:",
      options: ["Break it down into smaller, manageable parts", "Research similar problems and solutions", "Experiment with different approaches", "Seek advice from experienced people", "Take time to visualize the problem"],
      type: "multiple-choice"
    },

    // Psychometric - Motivation Assessment
    {
      id: "motivation_1",
      category: "psychometric", 
      subcategory: "Motivation Assessment",
      question: "When working on a long-term project, I maintain my effort even when progress is slow.",
      options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"],
      type: "likert"
    },
    {
      id: "motivation_2",
      category: "psychometric",
      subcategory: "Motivation Assessment", 
      question: "What motivates you most about the idea of VR development?",
      options: ["Creating immersive experiences", "Solving complex technical challenges", "Career growth opportunities", "Working with cutting-edge technology", "Making an impact in training/education"],
      type: "multiple-choice"
    },

    // Technical - General Aptitude
    {
      id: "aptitude_1",
      category: "technical",
      subcategory: "General Aptitude",
      question: "If you rotate a cube 90 degrees clockwise around its vertical axis, which face that was originally on the right will now be:",
      options: ["On the front", "On the back", "On the left", "On the top", "On the bottom"],
      type: "aptitude"
    },
    {
      id: "aptitude_2", 
      category: "technical",
      subcategory: "General Aptitude",
      question: "In a 3D coordinate system, if you move from point (2,3,1) by +3 units on the X-axis and -2 units on the Z-axis, your new position is:",
      options: ["(5,3,-1)", "(5,3,3)", "(2,6,1)", "(-1,3,1)", "(5,1,1)"],
      type: "aptitude"
    },

    // Technical - Prerequisite Knowledge
    {
      id: "prereq_1",
      category: "technical", 
      subcategory: "Prerequisite Knowledge",
      question: "In programming, what is a 'variable'?",
      options: ["A fixed value that never changes", "A container for storing data values", "A type of function", "A debugging tool", "A graphics rendering method"],
      type: "multiple-choice"
    },
    {
      id: "prereq_2",
      category: "technical",
      subcategory: "Prerequisite Knowledge", 
      question: "What is the primary purpose of a 'for loop' in programming?",
      options: ["To create graphics", "To repeat a block of code multiple times", "To store data", "To handle user input", "To connect to databases"],
      type: "multiple-choice"
    },
    {
      id: "prereq_3",
      category: "technical",
      subcategory: "Prerequisite Knowledge",
      question: "In 3D graphics, what does 'rendering' refer to?",
      options: ["Creating 3D models", "Converting 3D scenes into 2D images", "Programming game logic", "Designing user interfaces", "Recording audio"],
      type: "multiple-choice"
    },

    // Technical - Domain-Specific
    {
      id: "domain_1",
      category: "technical",
      subcategory: "Domain-Specific Knowledge",
      question: "In Unity, what is the primary purpose of a 'Collider' component?",
      options: ["To make objects visible", "To detect physical interactions between objects", "To apply materials to objects", "To animate objects", "To play sound effects"],
      type: "multiple-choice"
    },
    {
      id: "domain_2",
      category: "technical", 
      subcategory: "Domain-Specific Knowledge",
      question: "What is 'physics simulation' in the context of VR development?",
      options: ["Creating realistic lighting", "Simulating real-world physical behavior of objects", "Optimizing graphics performance", "Designing user interfaces", "Recording motion capture data"],
      type: "multiple-choice"
    },

    // WISCAR Framework
    {
      id: "wiscar_will_1",
      category: "wiscar",
      subcategory: "Will", 
      question: "How likely are you to complete a challenging 6-month VR development project?",
      options: ["Very unlikely", "Unlikely", "Somewhat likely", "Likely", "Very likely"],
      type: "likert"
    },
    {
      id: "wiscar_interest_1",
      category: "wiscar",
      subcategory: "Interest",
      question: "How much do you enjoy learning about new technologies and tools?", 
      options: ["Not at all", "A little", "Moderately", "Quite a bit", "Extremely"],
      type: "likert"
    },
    {
      id: "wiscar_skill_1",
      category: "wiscar",
      subcategory: "Skill",
      question: "How would you rate your current programming abilities?",
      options: ["No experience", "Beginner", "Intermediate", "Advanced", "Expert"],
      type: "likert"
    },
    {
      id: "wiscar_cognitive_1", 
      category: "wiscar",
      subcategory: "Cognitive Readiness",
      question: "When learning something new, I prefer to:",
      options: ["Follow step-by-step tutorials", "Experiment and figure things out", "Study theory first, then practice", "Learn from others' mistakes", "Combine multiple learning approaches"],
      type: "multiple-choice"
    },
    {
      id: "wiscar_ability_1",
      category: "wiscar",
      subcategory: "Ability to Learn",
      question: "How quickly do you typically pick up new software tools?",
      options: ["Very slowly", "Slowly", "At average pace", "Quickly", "Very quickly"],
      type: "likert"
    },
    {
      id: "wiscar_real_world_1",
      category: "wiscar", 
      subcategory: "Real-World Alignment",
      question: "Which aspect of VR engineering appeals to you most?",
      options: ["Creating immersive experiences", "Solving technical challenges", "Working with teams", "Continuous learning", "Impacting various industries"],
      type: "multiple-choice"
    }
  ];

  const handleOptionSelect = (value: string) => {
    setResponses({
      ...responses,
      [questions[currentQuestion].id]: value
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(responses);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const isAnswered = responses[currentQ.id] !== undefined;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-10 w-20 h-20 rounded-full glow-primary floating-animation opacity-10"></div>
        <div className="absolute bottom-1/3 left-10 w-24 h-24 rounded-full glow-secondary floating-animation opacity-10" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Intro
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {currentQ.subcategory}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="card-gradient border-border/50 shadow-elevated max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl leading-relaxed">
              {currentQ.question}
            </CardTitle>
            <CardDescription>
              Select the option that best describes you or your knowledge
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup
              value={responses[currentQ.id] || ""}
              onValueChange={handleOptionSelect}
              className="space-y-3"
            >
              {currentQ.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/30 transition-smooth">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label 
                    htmlFor={`option-${index}`} 
                    className="flex-1 cursor-pointer text-sm md:text-base leading-relaxed"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center max-w-4xl mx-auto mt-8">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          <Button 
            variant="hero"
            onClick={handleNext}
            disabled={!isAnswered}
            className="flex items-center gap-2 transition-bounce hover:scale-105"
          >
            {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentQuestions;