
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { AlertCircle, ArrowUpIcon, CheckCircle2Icon, FileIcon, InfoIcon, LoaderIcon, UploadIcon, XIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const UploadResume = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "processing" | "success" | "error">("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [resumeText, setResumeText] = useState("");
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    // Check file type
    const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!validTypes.includes(selectedFile.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload PDF or Word documents only.",
        variant: "destructive"
      });
      return;
    }
    
    // Check file size (5MB max)
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB.",
        variant: "destructive"
      });
      return;
    }
    
    setFile(selectedFile);
  };

  const getFileIcon = () => {
    if (!file) return null;
    
    if (file.type === "application/pdf") {
      return <FileIcon size={40} className="text-red-400" />;
    } else {
      return <FileIcon size={40} className="text-blue-400" />;
    }
  };

  const getFileExtension = () => {
    if (!file) return "";
    
    const name = file.name;
    return name.substring(name.lastIndexOf(".") + 1).toUpperCase();
  };

  const formatFileSize = () => {
    if (!file) return "";
    
    if (file.size < 1024 * 1024) {
      return `${(file.size / 1024).toFixed(2)} KB`;
    } else {
      return `${(file.size / (1024 * 1024)).toFixed(2)} MB`;
    }
  };

  const handleUpload = () => {
    if (!file && !resumeText) {
      toast({
        title: "No content to upload",
        description: "Please upload a file or enter your resume content.",
        variant: "destructive"
      });
      return;
    }
    
    setUploadStatus("uploading");
    let progress = 0;
    
    // Simulate upload progress
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setUploadStatus("processing");
        
        // Simulate AI processing
        setTimeout(() => {
          setUploadStatus("success");
          toast({
            title: "Resume uploaded successfully",
            description: "Your resume has been analyzed and added to your profile.",
          });
        }, 2000);
      }
    }, 150);
  };

  const removeFile = () => {
    setFile(null);
    setUploadStatus("idle");
    setUploadProgress(0);
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Upload Resume"
        description="Upload your resume to find matching job opportunities."
      />

      <Tabs defaultValue="upload-file" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="upload-file">Upload File</TabsTrigger>
          <TabsTrigger value="paste-text">Paste Text</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload-file">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2 bg-jobaura-blue-light border-jobaura-blue">
              <CardHeader>
                <CardTitle>Upload Resume</CardTitle>
                <CardDescription>
                  Upload your resume in PDF or Word format
                </CardDescription>
              </CardHeader>
              <CardContent>
                {uploadStatus === "idle" && (
                  <>
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 mb-6 text-center ${
                        isDragging 
                          ? "border-primary bg-primary/5" 
                          : "border-gray-700 hover:border-primary/50 hover:bg-jobaura-blue/30 transition-colors"
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="p-3 rounded-full bg-jobaura-blue">
                          <UploadIcon size={24} className="text-primary" />
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-medium">
                            Drag and drop your resume
                          </p>
                          <p className="text-sm text-gray-400 mt-1">
                            or click to browse from your computer
                          </p>
                        </div>
                        <input
                          type="file"
                          id="resume-upload"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        <Button
                          variant="outline"
                          className="gap-2"
                          onClick={() => document.getElementById("resume-upload")?.click()}
                        >
                          <ArrowUpIcon size={16} />
                          Browse Files
                        </Button>
                        <p className="text-xs text-gray-400">
                          Supported formats: PDF, DOC, DOCX (Max 5MB)
                        </p>
                      </div>
                    </div>

                    {file && (
                      <div className="bg-jobaura-black/50 rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 rounded-lg bg-jobaura-blue/50">
                            {getFileIcon()}
                          </div>
                          <div>
                            <p className="font-medium truncate max-w-[180px] sm:max-w-xs">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-400 flex items-center mt-1">
                              <span className="bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded text-[10px] mr-2">
                                {getFileExtension()}
                              </span>
                              {formatFileSize()}
                            </p>
                          </div>
                        </div>
                        <button
                          className="text-gray-400 hover:text-white transition-colors"
                          onClick={removeFile}
                        >
                          <XIcon size={20} />
                        </button>
                      </div>
                    )}
                  </>
                )}

                {(uploadStatus === "uploading" || uploadStatus === "processing") && (
                  <div className="bg-jobaura-black/50 rounded-lg p-6 text-center">
                    {uploadStatus === "uploading" && (
                      <>
                        <div className="mx-auto w-12 h-12 rounded-full bg-jobaura-blue/50 flex items-center justify-center mb-4">
                          <ArrowUpIcon size={24} className="text-primary animate-pulse" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">Uploading your resume</h3>
                        <p className="text-gray-400 text-sm mb-4">Please wait while we upload your resume</p>
                        <div className="w-full mb-2">
                          <Progress value={uploadProgress} className="h-2" />
                        </div>
                        <p className="text-xs text-gray-500">{uploadProgress}% complete</p>
                      </>
                    )}

                    {uploadStatus === "processing" && (
                      <>
                        <div className="mx-auto w-12 h-12 rounded-full bg-jobaura-blue/50 flex items-center justify-center mb-4">
                          <LoaderIcon size={24} className="text-primary animate-spin" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">Analyzing your resume</h3>
                        <p className="text-gray-400 text-sm mb-4">Our AI is extracting skills, experience, and qualifications</p>
                        <div className="w-full mb-2">
                          <div className="h-2 w-full bg-jobaura-black/70 rounded-full overflow-hidden">
                            <div className="h-full w-full bg-gradient-to-r from-primary to-blue-400 rounded-full animate-pulse"></div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {uploadStatus === "success" && (
                  <div className="bg-jobaura-black/50 rounded-lg p-6 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                      <CheckCircle2Icon size={24} className="text-green-500" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Resume Uploaded Successfully</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Your resume has been successfully analyzed and your profile has been updated.
                    </p>
                    <div className="flex justify-center">
                      <Button variant="outline" className="mr-2" onClick={removeFile}>
                        Upload Another
                      </Button>
                      <Button>View Your Profile</Button>
                    </div>
                  </div>
                )}

                {uploadStatus === "error" && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      There was an error uploading your resume. Please try again.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
              {uploadStatus === "idle" && (
                <CardFooter>
                  <Button 
                    disabled={!file} 
                    onClick={handleUpload} 
                    className="w-full sm:w-auto"
                  >
                    <UploadIcon size={16} className="mr-2" />
                    Upload Resume
                  </Button>
                </CardFooter>
              )}
            </Card>

            <div className="space-y-6">
              <Card className="bg-jobaura-blue-light border-jobaura-blue">
                <CardHeader>
                  <CardTitle>Tips for Success</CardTitle>
                  <CardDescription>
                    Make your resume stand out
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <div className="mt-0.5">
                      <InfoIcon size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Highlight your skills</p>
                      <p className="text-xs text-gray-400">
                        Make sure to clearly list your technical and soft skills.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="mt-0.5">
                      <InfoIcon size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Use keywords</p>
                      <p className="text-xs text-gray-400">
                        Include industry-specific keywords that match job descriptions.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="mt-0.5">
                      <InfoIcon size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Quantify achievements</p>
                      <p className="text-xs text-gray-400">
                        Use numbers to demonstrate your impact and results.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="mt-0.5">
                      <InfoIcon size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Format for readability</p>
                      <p className="text-xs text-gray-400">
                        Use clear sections, bullet points, and consistent formatting.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Alert className="bg-primary/10 border-primary text-foreground">
                <InfoIcon className="h-4 w-4 text-primary" />
                <AlertTitle>Resume Visibility</AlertTitle>
                <AlertDescription className="text-xs text-gray-300">
                  Your resume will only be visible to companies that you apply to or approve. You can manage visibility settings in your profile.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="paste-text">
          <Card className="bg-jobaura-blue-light border-jobaura-blue">
            <CardHeader>
              <CardTitle>Paste Resume Content</CardTitle>
              <CardDescription>
                Copy and paste your resume text
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="resume-text">Resume Text</Label>
                  <Textarea 
                    id="resume-text"
                    placeholder="Paste your resume content here..."
                    className="min-h-[300px] bg-jobaura-blue/50"
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                  />
                </div>
                <Alert>
                  <InfoIcon className="h-4 w-4" />
                  <AlertTitle>Formatting Tip</AlertTitle>
                  <AlertDescription className="text-xs text-gray-300">
                    For best results, maintain clear section headers (e.g., Experience, Education, Skills) and use line breaks between sections.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                disabled={!resumeText.trim()} 
                onClick={handleUpload}
                className="w-full sm:w-auto"
              >
                <UploadIcon size={16} className="mr-2" />
                Submit Resume Text
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default UploadResume;
