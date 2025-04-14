
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, FileText, Search, Settings, Share } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <Search className="h-8 w-8 text-primary" />,
    title: "Keyword Research",
    description: "Find high-performing SEO keywords for your target products",
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: "Content Generation",
    description: "Create optimized blog content using AI technology",
  },
  {
    icon: <Settings className="h-8 w-8 text-primary" />,
    title: "Content Editing",
    description: "Fine-tune your blog posts with our built-in editor",
  },
  {
    icon: <Share className="h-8 w-8 text-primary" />,
    title: "Publishing",
    description: "Export your posts for WordPress, Medium, and more",
  },
];

export default function Dashboard() {
  return (
    <div className="container py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">SEO Blog Post Creation Tool</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Generate SEO-optimized blog posts for trending e-commerce products in minutes
        </p>
        <div className="mt-8">
          <Link to="/create">
            <Button size="lg" className="px-8">
              Create Your First Post
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {features.map((feature, index) => (
          <Card key={index} className="transition-all hover:shadow-md">
            <CardHeader>
              <div className="mb-2">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="mt-20">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-primary/10 p-3 mb-3">
                  <span className="text-primary font-bold text-xl">1</span>
                </div>
                <h3 className="font-medium text-lg mb-2">Research Keywords</h3>
                <p className="text-muted-foreground">
                  Enter a product category to find trending products and relevant keywords
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-primary/10 p-3 mb-3">
                  <span className="text-primary font-bold text-xl">2</span>
                </div>
                <h3 className="font-medium text-lg mb-2">Generate Content</h3>
                <p className="text-muted-foreground">
                  Our AI creates optimized blog content using your selected keywords
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-primary/10 p-3 mb-3">
                  <span className="text-primary font-bold text-xl">3</span>
                </div>
                <h3 className="font-medium text-lg mb-2">Export & Publish</h3>
                <p className="text-muted-foreground">
                  Edit as needed and export your blog post for publishing
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link to="/create">
              <Button size="lg">Get Started</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
