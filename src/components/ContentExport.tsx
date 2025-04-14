import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Copy, Download, Check, Clipboard, FileText, Eye } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ContentExportProps {
  title: string;
  content: string;
  onReset: () => void;
}

export default function ContentExport({ title, content, onReset }: ContentExportProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [currentTab, setCurrentTab] = useState("preview");

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(`${title}\n\n${content}`);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "The blog post has been copied to your clipboard",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([`# ${title}\n\n${content}`], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = `${title.replace(/\s+/g, "-").toLowerCase()}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Downloaded successfully",
      description: "Your blog post has been downloaded as Markdown",
    });
  };

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>${title}</title>
</head>
<body>
  <h1>${title}</h1>
  ${content.split('\n\n').map(p => `<p>${p}</p>`).join('')}
</body>
</html>
  `.trim();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Export Blog Post</CardTitle>
          <CardDescription>
            Preview and export your SEO-optimized blog post
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="preview">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="markdown">
                <FileText className="h-4 w-4 mr-2" />
                Markdown
              </TabsTrigger>
              <TabsTrigger value="html">
                <Clipboard className="h-4 w-4 mr-2" />
                HTML
              </TabsTrigger>
            </TabsList>
            
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
            
            <TabsContent value="markdown" className="mt-4">
              <div className="relative">
                <pre className="bg-muted p-4 rounded-md overflow-x-auto whitespace-pre-wrap">
                  <code>
                    {`# ${title}\n\n${content}`}
                  </code>
                </pre>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={handleCopyToClipboard}
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="html" className="mt-4">
              <div className="relative">
                <pre className="bg-muted p-4 rounded-md overflow-x-auto whitespace-pre-wrap">
                  <code>
                    {htmlContent}
                  </code>
                </pre>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={handleCopyToClipboard}
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button onClick={handleCopyToClipboard} className="flex-1">
              <Copy className="h-4 w-4 mr-2" />
              Copy to Clipboard
            </Button>
            <Button onClick={handleDownload} variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download Markdown
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Badge variant="outline" className="text-xs">
            {content.split(/\s+/).filter(Boolean).length} words
          </Badge>
          <Button onClick={onReset} variant="secondary">
            Create New Post
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Publishing Options</CardTitle>
          <CardDescription>
            Ways to publish your new blog post
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="border rounded-md p-4 text-center">
              <div className="h-16 w-16 mx-auto mb-3 flex items-center justify-center">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/9/98/WordPress_blue_logo.svg" 
                  alt="WordPress" 
                  className="max-h-full max-w-full object-contain" 
                />
              </div>
              <h3 className="font-medium mb-2">WordPress</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Copy the HTML and paste into a new WordPress post
              </p>
              <Button variant="outline" onClick={() => setCurrentTab("html")} className="w-full">
                Copy HTML
              </Button>
            </div>
            
            <div className="border rounded-md p-4 text-center">
              <div className="h-16 w-16 mx-auto mb-3 flex items-center justify-center">
                <img 
                  src="https://cdn4.iconfinder.com/data/icons/social-media-2210/24/Medium-512.png" 
                  alt="Medium" 
                  className="max-h-full max-w-full object-contain" 
                />
              </div>
              <h3 className="font-medium mb-2">Medium</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Import as Markdown or copy and paste your content
              </p>
              <Button variant="outline" onClick={() => setCurrentTab("markdown")} className="w-full">
                Copy Markdown
              </Button>
            </div>
            
            <div className="border rounded-md p-4 text-center">
              <div className="h-16 w-16 mx-auto mb-3 flex items-center justify-center">
                <img 
                  src="https://seeklogo.com/images/H/hashnode-logo-B114767E70-seeklogo.com.png" 
                  alt="Hashnode" 
                  className="max-h-full max-w-full object-contain" 
                />
              </div>
              <h3 className="font-medium mb-2">Hashnode</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Paste your Markdown directly into Hashnode editor
              </p>
              <Button variant="outline" onClick={() => setCurrentTab("markdown")} className="w-full">
                Copy Markdown
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
