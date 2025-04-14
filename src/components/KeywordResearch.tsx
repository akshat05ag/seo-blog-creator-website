
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Search, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export interface Keyword {
  id: string;
  text: string;
  searchVolume: number;
  difficulty: number;
  cpc: number;
  selected?: boolean;
}

interface KeywordResearchProps {
  onKeywordsSelected: (keywords: Keyword[]) => void;
}

export default function KeywordResearch({ onKeywordsSelected }: KeywordResearchProps) {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [keywords, setKeywords] = useState<Keyword[]>([]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      toast({
        variant: "destructive",
        title: "Search field empty",
        description: "Please enter a product category or topic to research",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Mock data
      const mockKeywords = [
        {
          id: "1",
          text: `best ${searchTerm}`,
          searchVolume: 8400,
          difficulty: 67,
          cpc: 1.24,
        },
        {
          id: "2",
          text: `${searchTerm} review`,
          searchVolume: 6200,
          difficulty: 42,
          cpc: 0.95,
        },
        {
          id: "3",
          text: `affordable ${searchTerm}`,
          searchVolume: 4100,
          difficulty: 38,
          cpc: 0.76,
        },
        {
          id: "4",
          text: `${searchTerm} for beginners`,
          searchVolume: 3800,
          difficulty: 28,
          cpc: 0.82,
        },
        {
          id: "5",
          text: `${searchTerm} vs competitor`,
          searchVolume: 2900,
          difficulty: 45,
          cpc: 1.35,
        },
        {
          id: "6",
          text: `how to choose ${searchTerm}`,
          searchVolume: 2700,
          difficulty: 32,
          cpc: 0.91,
        },
        {
          id: "7",
          text: `top rated ${searchTerm}`,
          searchVolume: 5500,
          difficulty: 58,
          cpc: 1.12,
        },
        {
          id: "8",
          text: `${searchTerm} buying guide`,
          searchVolume: 3400,
          difficulty: 36,
          cpc: 0.88,
        },
      ];

      setKeywords(mockKeywords);
      setIsLoading(false);
      
      toast({
        title: "Keyword research complete",
        description: `Found ${mockKeywords.length} keywords for "${searchTerm}"`,
      });
    }, 1500);
  };

  const handleKeywordToggle = (id: string) => {
    setKeywords(
      keywords.map((keyword) =>
        keyword.id === id
          ? { ...keyword, selected: !keyword.selected }
          : keyword
      )
    );
  };

  const handleSubmit = () => {
    const selectedKeywords = keywords.filter((keyword) => keyword.selected);
    
    if (selectedKeywords.length === 0) {
      toast({
        variant: "destructive",
        title: "No keywords selected",
        description: "Please select at least one keyword to continue",
      });
      return;
    }
    
    if (selectedKeywords.length > 4) {
      toast({
        variant: "destructive",
        title: "Too many keywords selected",
        description: "Please select no more than 4 keywords for best results",
      });
      return;
    }
    
    onKeywordsSelected(selectedKeywords);
    
    toast({
      title: "Keywords selected",
      description: `${selectedKeywords.length} keywords selected for content generation`,
    });
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 30) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    if (difficulty < 60) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Keyword Research</CardTitle>
          <CardDescription>
            Find relevant keywords for your product category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                placeholder="Enter product category (e.g., wireless headphones)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Search className="h-4 w-4 mr-2" />
              )}
              Research
            </Button>
          </div>
        </CardContent>
      </Card>

      {keywords.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Suggested Keywords</CardTitle>
            <CardDescription>
              Select up to 4 keywords to include in your blog post
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {keywords.map((keyword) => (
                <div
                  key={keyword.id}
                  className="flex items-center justify-between p-3 border rounded-md"
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={`keyword-${keyword.id}`}
                      checked={keyword.selected}
                      onCheckedChange={() => handleKeywordToggle(keyword.id)}
                    />
                    <Label htmlFor={`keyword-${keyword.id}`} className="cursor-pointer">
                      {keyword.text}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline">
                      {keyword.searchVolume.toLocaleString()} searches/month
                    </Badge>
                    <Badge
                      className={getDifficultyColor(keyword.difficulty)}
                      variant="secondary"
                    >
                      Difficulty: {keyword.difficulty}
                    </Badge>
                    <Badge variant="outline">${keyword.cpc.toFixed(2)} CPC</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit} className="ml-auto">
              Continue with Selected Keywords
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
