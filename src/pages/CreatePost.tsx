
import { useState } from "react";
import { Steps, Step } from "@/components/ui/steps";
import KeywordResearch, { Keyword } from "@/components/KeywordResearch";
import ContentGenerator from "@/components/ContentGenerator";
import ContentExport from "@/components/ContentExport";

export default function CreatePost() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedKeywords, setSelectedKeywords] = useState<Keyword[]>([]);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");

  const handleKeywordsSelected = (keywords: Keyword[]) => {
    setSelectedKeywords(keywords);
    setCurrentStep(1);
  };

  const handleContentGenerated = (title: string, content: string) => {
    setBlogTitle(title);
    setBlogContent(content);
    setCurrentStep(2);
  };

  const handleReset = () => {
    setSelectedKeywords([]);
    setBlogTitle("");
    setBlogContent("");
    setCurrentStep(0);
  };

  return (
    <div className="container py-8">
      <Steps 
        currentStep={currentStep} 
        className="mb-8"
      >
        <Step 
          title="Research Keywords" 
          description="Find relevant SEO keywords"
        />
        <Step 
          title="Generate Content" 
          description="Create your blog post"
        />
        <Step 
          title="Export & Publish" 
          description="Save and share your post"
        />
      </Steps>

      <div className="mt-10">
        {currentStep === 0 && (
          <KeywordResearch onKeywordsSelected={handleKeywordsSelected} />
        )}
        
        {currentStep === 1 && (
          <ContentGenerator 
            keywords={selectedKeywords} 
            onComplete={handleContentGenerated} 
          />
        )}
        
        {currentStep === 2 && (
          <ContentExport 
            title={blogTitle} 
            content={blogContent} 
            onReset={handleReset} 
          />
        )}
      </div>
    </div>
  );
}
