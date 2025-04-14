
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileText, Edit, Eye } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import type { Keyword } from "./KeywordResearch";

interface ContentGeneratorProps {
  keywords: Keyword[];
  onComplete: (title: string, content: string) => void;
}

export default function ContentGenerator({ keywords, onComplete }: ContentGeneratorProps) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [activeTab, setActiveTab] = useState("write");

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const keywordTexts = keywords.map(k => k.text);
      const productType = extractProductType(keywordTexts[0]);
      
      // Generate a sample title
      const generatedTitle = generateTitle(keywordTexts, productType);
      setTitle(generatedTitle);
      
      // Generate sample content
      const generatedContent = generateContent(keywordTexts, productType);
      setContent(generatedContent);
      
      setIsGenerating(false);
      setActiveTab("edit");
      
      toast({
        title: "Content generated",
        description: "Your blog post has been created. You can now edit it.",
      });
    }, 3000);
  };

  const handleComplete = () => {
    if (!title.trim()) {
      toast({
        variant: "destructive",
        title: "Title required",
        description: "Please add a title for your blog post",
      });
      return;
    }

    if (content.length < 150) {
      toast({
        variant: "destructive",
        title: "Content too short",
        description: "Your blog post should be at least 150 words",
      });
      return;
    }

    onComplete(title, content);
  };

  const extractProductType = (keyword: string) => {
    // Extract product type from the first keyword
    return keyword.replace(/best |affordable |top rated |review|for beginners|vs competitor|buying guide|how to choose /g, '');
  };

  const generateTitle = (keywords: string[], productType: string) => {
    // Simple title generator
    const titleTemplates = [
      `Top 5 ${productType} You Need to Check Out in 2025`,
      `The Ultimate Guide to Choosing the Best ${productType}`,
      `Why These ${productType} Are Trending in 2025`,
      `${productType} Review: Finding the Perfect Option for You`,
      `How to Choose the Right ${productType} - Expert Guide`
    ];
    
    return titleTemplates[Math.floor(Math.random() * titleTemplates.length)];
  };

  const generateContent = (keywords: string[], productType: string) => {
    // Simple content generator that includes all keywords
    const intro = `In today's market, finding the right ${productType} can be overwhelming with so many options available. Whether you're looking for the ${keywords[0]} or interested in a ${keywords[1]}, this guide will help you make an informed decision.`;
    
    const body = `When searching for ${keywords[0]}, it's important to consider factors like quality, price, and durability. Many consumers are specifically looking for ${keywords[2]} without compromising on features. 

If you're new to this category, you might want to check out ${keywords[3] || `options specifically designed for beginners`}. These products offer the perfect balance of functionality and ease of use.

The market for ${productType} has seen significant growth recently, with more manufacturers focusing on innovative features and competitive pricing. This is great news for consumers who now have more options to choose from.`;

    const conclusion = `Before making your final decision, we recommend reading detailed reviews and comparing different models. This will ensure you find the perfect ${productType} that meets all your requirements without exceeding your budget. Remember that investing in quality often saves money in the long run.`;
    
    return `${intro}\n\n${body}\n\n${conclusion}`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Content Generation</CardTitle>
          <CardDescription>
            Create a blog post using the selected keywords
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-5">
            <div className="text-sm font-medium mb-2">Selected Keywords:</div>
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword) => (
                <Badge key={keyword.id} variant="secondary">
                  {keyword.text}
                </Badge>
              ))}
            </div>
          </div>

          {!content ? (
            <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Generating content...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Blog Post
                </>
              )}
            </Button>
          ) : (
            <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="edit">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </TabsTrigger>
                <TabsTrigger value="preview">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </TabsTrigger>
              </TabsList>
              <TabsContent value="edit" className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Blog Title</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter your blog title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Blog Content</label>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter your blog content"
                    className="min-h-[300px]"
                  />
                  <div className="text-xs text-muted-foreground mt-2">
                    Word count: {content.split(/\s+/).filter(Boolean).length} words
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="preview" className="mt-4">
                <div className="border rounded-md p-6">
                  <h1 className="text-2xl font-bold mb-4">{title}</h1>
                  <div className="prose prose-sm max-w-none">
                    {content.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
        {content && (
          <CardFooter>
            <Button onClick={handleComplete} className="ml-auto">
              Continue to Export
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
