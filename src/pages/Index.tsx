import { useState } from "react";
import AssessmentIntro from "@/components/AssessmentIntro";
import AssessmentQuestions from "@/components/AssessmentQuestions";
import AssessmentResults from "@/components/AssessmentResults";

type AssessmentStep = 'intro' | 'questions' | 'results';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AssessmentStep>('intro');
  const [responses, setResponses] = useState<Record<string, string>>({});

  const handleStartAssessment = () => {
    setCurrentStep('questions');
  };

  const handleBackToIntro = () => {
    setCurrentStep('intro');
  };

  const handleCompleteAssessment = (assessmentResponses: Record<string, string>) => {
    setResponses(assessmentResponses);
    setCurrentStep('results');
  };

  const handleRestart = () => {
    setResponses({});
    setCurrentStep('intro');
  };

  return (
    <>
      {currentStep === 'intro' && (
        <AssessmentIntro onStartAssessment={handleStartAssessment} />
      )}
      {currentStep === 'questions' && (
        <AssessmentQuestions 
          onComplete={handleCompleteAssessment}
          onBack={handleBackToIntro}
        />
      )}
      {currentStep === 'results' && (
        <AssessmentResults 
          responses={responses}
          onRestart={handleRestart}
        />
      )}
    </>
  );
};

export default Index;
