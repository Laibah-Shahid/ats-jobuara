
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  BriefcaseIcon, 
  GraduationCapIcon, 
  LinkIcon, 
  MapPinIcon, 
  PencilIcon, 
  PhoneIcon, 
  PlusIcon, 
  SaveIcon, 
  ShieldIcon, 
  Trash2Icon, 
  UserIcon, 
  XIcon 
} from "lucide-react";

const Profile = () => {
  const { toast } = useToast();
  
  // Profile state
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    title: "Senior Frontend Developer",
    about: "Experienced frontend developer with 5 years of experience building responsive web applications with React, TypeScript, and modern web technologies.",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    portfolio: "johndoe.dev"
  });
  
  // Skills state
  const [skills, setSkills] = useState([
    { name: "React", level: "Expert", category: "Technical" },
    { name: "TypeScript", level: "Advanced", category: "Technical" },
    { name: "Node.js", level: "Intermediate", category: "Technical" },
    { name: "Tailwind CSS", level: "Advanced", category: "Technical" },
    { name: "Next.js", level: "Intermediate", category: "Technical" },
    { name: "Communication", level: "Advanced", category: "Soft" },
    { name: "Problem Solving", level: "Expert", category: "Soft" },
    { name: "Teamwork", level: "Expert", category: "Soft" }
  ]);
  
  // Experience state
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      startDate: "Jan 2020",
      endDate: "Present",
      description: "Led the development of the company's customer-facing web application using React, TypeScript, and Redux. Implemented CI/CD pipelines and improved page load times by 40%.",
      isEditing: false
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "WebSolutions",
      location: "New York, NY",
      startDate: "Jun 2018",
      endDate: "Dec 2019",
      description: "Developed responsive user interfaces for various client projects using React and JavaScript. Collaborated with designers to implement pixel-perfect designs.",
      isEditing: false
    }
  ]);
  
  // Education state
  const [education, setEducation] = useState([
    {
      id: 1,
      degree: "Bachelor of Science in Computer Science",
      school: "University of Technology",
      location: "Boston, MA",
      startDate: "Sep 2014",
      endDate: "May 2018",
      description: "Graduated with honors. Specialized in web development and data structures.",
      isEditing: false
    }
  ]);
  
  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    resumeVisibility: "approved",
    showContactInfo: true,
    allowMessages: true,
    jobAlerts: true,
    dataSharing: false
  });
  
  // New form states
  const [newSkill, setNewSkill] = useState({ name: "", level: "Intermediate", category: "Technical" });
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    description: ""
  });
  const [newEducation, setNewEducation] = useState({
    degree: "",
    school: "",
    location: "",
    startDate: "",
    endDate: "",
    description: ""
  });
  
  // Form submission handlers
  const handlePersonalInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your personal information has been updated successfully."
    });
  };
  
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.name.trim()) {
      toast({
        title: "Error",
        description: "Skill name cannot be empty.",
        variant: "destructive"
      });
      return;
    }
    
    setSkills([...skills, { ...newSkill }]);
    setNewSkill({ name: "", level: "Intermediate", category: "Technical" });
    toast({
      title: "Skill added",
      description: `${newSkill.name} has been added to your skills.`
    });
  };
  
  const handleRemoveSkill = (skillName: string) => {
    setSkills(skills.filter(skill => skill.name !== skillName));
    toast({
      title: "Skill removed",
      description: `${skillName} has been removed from your skills.`
    });
  };
  
  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    const { title, company } = newExperience;
    
    if (!title.trim() || !company.trim()) {
      toast({
        title: "Error",
        description: "Job title and company name are required.",
        variant: "destructive"
      });
      return;
    }
    
    setExperiences([
      {
        id: Date.now(),
        ...newExperience,
        isEditing: false
      },
      ...experiences
    ]);
    
    setNewExperience({
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: ""
    });
    
    toast({
      title: "Experience added",
      description: `${title} at ${company} has been added to your profile.`
    });
  };
  
  const handleRemoveExperience = (id: number) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
    toast({
      title: "Experience removed",
      description: "The experience entry has been removed from your profile."
    });
  };
  
  const handleToggleEditExperience = (id: number) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, isEditing: !exp.isEditing } : exp
    ));
  };
  
  const handleUpdateExperience = (id: number, updatedExp: any) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, ...updatedExp, isEditing: false } : exp
    ));
    
    toast({
      title: "Experience updated",
      description: "The experience entry has been updated successfully."
    });
  };
  
  const handleAddEducation = (e: React.FormEvent) => {
    e.preventDefault();
    const { degree, school } = newEducation;
    
    if (!degree.trim() || !school.trim()) {
      toast({
        title: "Error",
        description: "Degree and school name are required.",
        variant: "destructive"
      });
      return;
    }
    
    setEducation([
      {
        id: Date.now(),
        ...newEducation,
        isEditing: false
      },
      ...education
    ]);
    
    setNewEducation({
      degree: "",
      school: "",
      location: "",
      startDate: "",
      endDate: "",
      description: ""
    });
    
    toast({
      title: "Education added",
      description: `${degree} from ${school} has been added to your profile.`
    });
  };
  
  const handleRemoveEducation = (id: number) => {
    setEducation(education.filter(edu => edu.id !== id));
    toast({
      title: "Education removed",
      description: "The education entry has been removed from your profile."
    });
  };
  
  const handleToggleEditEducation = (id: number) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, isEditing: !edu.isEditing } : edu
    ));
  };
  
  const handleUpdateEducation = (id: number, updatedEdu: any) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, ...updatedEdu, isEditing: false } : edu
    ));
    
    toast({
      title: "Education updated",
      description: "The education entry has been updated successfully."
    });
  };
  
  const handleUpdatePrivacySettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Privacy settings updated",
      description: "Your privacy settings have been updated successfully."
    });
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Your Profile"
        description="Manage your personal information and resume details"
      />

      <Tabs defaultValue="personal-info" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6 w-full md:w-auto">
          <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>
        
        {/* Personal Info Tab */}
        <TabsContent value="personal-info">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1">
              <Card className="bg-jobaura-blue-light border-jobaura-blue">
                <CardHeader>
                  <CardTitle>Profile Overview</CardTitle>
                  <CardDescription>How others see your profile</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="mb-4 relative group">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=200&h=200&auto=format&fit=crop" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <PencilIcon size={14} />
                      </Button>
                    </div>
                  </div>
                  <h3 className="text-xl font-medium">{personalInfo.firstName} {personalInfo.lastName}</h3>
                  <p className="text-sm text-gray-400 mb-4">{personalInfo.title}</p>
                  
                  <div className="flex flex-col space-y-3 w-full">
                    <div className="flex items-center text-sm">
                      <MapPinIcon size={16} className="mr-2 text-gray-400" />
                      <span>{personalInfo.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <PhoneIcon size={16} className="mr-2 text-gray-400" />
                      <span>{personalInfo.phone}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <LinkIcon size={16} className="mr-2 text-gray-400" />
                      <a href={`https://${personalInfo.linkedin}`} target="_blank" className="text-primary hover:underline">{personalInfo.linkedin}</a>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Badge variant="outline" className="bg-jobaura-blue/50">React</Badge>
                      <Badge variant="outline" className="bg-jobaura-blue/50">TypeScript</Badge>
                      <Badge variant="outline" className="bg-jobaura-blue/50">Frontend</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Public Profile</Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <Card className="bg-jobaura-blue-light border-jobaura-blue">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePersonalInfoSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          value={personalInfo.firstName}
                          onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                          className="bg-jobaura-blue/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          value={personalInfo.lastName}
                          onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                          className="bg-jobaura-blue/50"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email"
                          value={personalInfo.email}
                          onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                          className="bg-jobaura-blue/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          value={personalInfo.phone}
                          onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                          className="bg-jobaura-blue/50"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input 
                          id="location" 
                          value={personalInfo.location}
                          onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
                          className="bg-jobaura-blue/50"
                          placeholder="City, State"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="title">Professional Title</Label>
                        <Input 
                          id="title" 
                          value={personalInfo.title}
                          onChange={(e) => setPersonalInfo({...personalInfo, title: e.target.value})}
                          className="bg-jobaura-blue/50"
                          placeholder="e.g. Senior Frontend Developer"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <Label htmlFor="about">About</Label>
                      <Textarea 
                        id="about" 
                        value={personalInfo.about}
                        onChange={(e) => setPersonalInfo({...personalInfo, about: e.target.value})}
                        className="bg-jobaura-blue/50 min-h-[100px]"
                        placeholder="Write a short bio about yourself"
                      />
                    </div>
                    
                    <h3 className="text-lg font-medium mb-4">Social Links</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 bg-jobaura-blue border border-r-0 border-input rounded-l-md text-sm text-gray-400">
                            linkedin.com/in/
                          </span>
                          <Input 
                            id="linkedin" 
                            value={personalInfo.linkedin.replace("linkedin.com/in/", "")}
                            onChange={(e) => setPersonalInfo({...personalInfo, linkedin: `linkedin.com/in/${e.target.value}`})}
                            className="bg-jobaura-blue/50 rounded-l-none"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="github">GitHub</Label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 bg-jobaura-blue border border-r-0 border-input rounded-l-md text-sm text-gray-400">
                            github.com/
                          </span>
                          <Input 
                            id="github" 
                            value={personalInfo.github.replace("github.com/", "")}
                            onChange={(e) => setPersonalInfo({...personalInfo, github: `github.com/${e.target.value}`})}
                            className="bg-jobaura-blue/50 rounded-l-none"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <Label htmlFor="portfolio">Portfolio Website</Label>
                      <Input 
                        id="portfolio" 
                        value={personalInfo.portfolio}
                        onChange={(e) => setPersonalInfo({...personalInfo, portfolio: e.target.value})}
                        className="bg-jobaura-blue/50"
                        placeholder="e.g. yourname.dev"
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit">
                        <SaveIcon size={16} className="mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Skills Tab */}
        <TabsContent value="skills">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2">
              <Card className="bg-jobaura-blue-light border-jobaura-blue">
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                  <CardDescription>Manage your skills and proficiency levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Technical Skills</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {skills
                        .filter(skill => skill.category === "Technical")
                        .map(skill => (
                          <div 
                            key={skill.name} 
                            className="flex items-center justify-between p-3 bg-jobaura-blue/50 rounded-lg"
                          >
                            <div>
                              <p className="font-medium">{skill.name}</p>
                              <p className="text-xs text-gray-400">{skill.level}</p>
                            </div>
                            <button 
                              onClick={() => handleRemoveSkill(skill.name)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <XIcon size={18} />
                            </button>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Soft Skills</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {skills
                        .filter(skill => skill.category === "Soft")
                        .map(skill => (
                          <div 
                            key={skill.name} 
                            className="flex items-center justify-between p-3 bg-jobaura-blue/50 rounded-lg"
                          >
                            <div>
                              <p className="font-medium">{skill.name}</p>
                              <p className="text-xs text-gray-400">{skill.level}</p>
                            </div>
                            <button 
                              onClick={() => handleRemoveSkill(skill.name)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <XIcon size={18} />
                            </button>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="col-span-1">
              <Card className="bg-jobaura-blue-light border-jobaura-blue">
                <CardHeader>
                  <CardTitle>Add New Skill</CardTitle>
                  <CardDescription>Add a new skill to your profile</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddSkill} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="skillName">Skill Name</Label>
                      <Input 
                        id="skillName" 
                        value={newSkill.name}
                        onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                        className="bg-jobaura-blue/50"
                        placeholder="e.g. React, Communication"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="skillCategory">Category</Label>
                      <Select 
                        value={newSkill.category} 
                        onValueChange={(value) => setNewSkill({...newSkill, category: value})}
                      >
                        <SelectTrigger id="skillCategory" className="bg-jobaura-blue/50">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Technical">Technical</SelectItem>
                          <SelectItem value="Soft">Soft</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="skillLevel">Proficiency Level</Label>
                      <Select 
                        value={newSkill.level} 
                        onValueChange={(value) => setNewSkill({...newSkill, level: value})}
                      >
                        <SelectTrigger id="skillLevel" className="bg-jobaura-blue/50">
                          <SelectValue placeholder="Select a level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                          <SelectItem value="Expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button type="submit" className="w-full">
                      <PlusIcon size={16} className="mr-2" />
                      Add Skill
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="bg-jobaura-blue-light border-jobaura-blue mt-6">
                <CardHeader>
                  <CardTitle>AI Skill Suggestions</CardTitle>
                  <CardDescription>Based on your profile and market trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-jobaura-blue/50 rounded-lg flex items-center justify-between">
                      <div>
                        <p className="font-medium">GraphQL</p>
                        <p className="text-xs text-gray-400">High demand in your field</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <PlusIcon size={16} />
                      </Button>
                    </div>
                    <div className="p-3 bg-jobaura-blue/50 rounded-lg flex items-center justify-between">
                      <div>
                        <p className="font-medium">Docker</p>
                        <p className="text-xs text-gray-400">Trending in job listings</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <PlusIcon size={16} />
                      </Button>
                    </div>
                    <div className="p-3 bg-jobaura-blue/50 rounded-lg flex items-center justify-between">
                      <div>
                        <p className="font-medium">Leadership</p>
                        <p className="text-xs text-gray-400">Requested for senior roles</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <PlusIcon size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Experience Tab */}
        <TabsContent value="experience">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2">
              <Card className="bg-jobaura-blue-light border-jobaura-blue">
                <CardHeader>
                  <CardTitle>Work Experience</CardTitle>
                  <CardDescription>Your professional history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="relative">
                        {exp.isEditing ? (
                          <div className="p-4 bg-jobaura-blue/50 rounded-lg border border-jobaura-blue">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                              <div className="space-y-2">
                                <Label htmlFor={`exp-title-${exp.id}`}>Job Title</Label>
                                <Input 
                                  id={`exp-title-${exp.id}`} 
                                  defaultValue={exp.title}
                                  className="bg-jobaura-blue/70"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`exp-company-${exp.id}`}>Company</Label>
                                <Input 
                                  id={`exp-company-${exp.id}`} 
                                  defaultValue={exp.company}
                                  className="bg-jobaura-blue/70"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                              <div className="space-y-2">
                                <Label htmlFor={`exp-location-${exp.id}`}>Location</Label>
                                <Input 
                                  id={`exp-location-${exp.id}`} 
                                  defaultValue={exp.location}
                                  className="bg-jobaura-blue/70"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-2">
                                  <Label htmlFor={`exp-start-${exp.id}`}>Start Date</Label>
                                  <Input 
                                    id={`exp-start-${exp.id}`} 
                                    defaultValue={exp.startDate}
                                    className="bg-jobaura-blue/70"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor={`exp-end-${exp.id}`}>End Date</Label>
                                  <Input 
                                    id={`exp-end-${exp.id}`} 
                                    defaultValue={exp.endDate}
                                    className="bg-jobaura-blue/70"
                                    placeholder="Present"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="space-y-2 mb-4">
                              <Label htmlFor={`exp-desc-${exp.id}`}>Description</Label>
                              <Textarea 
                                id={`exp-desc-${exp.id}`} 
                                defaultValue={exp.description}
                                className="bg-jobaura-blue/70 min-h-[100px]"
                              />
                            </div>
                            <div className="flex gap-2 justify-end">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleToggleEditExperience(exp.id)}
                              >
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleUpdateExperience(exp.id, {
                                  title: (document.getElementById(`exp-title-${exp.id}`) as HTMLInputElement).value,
                                  company: (document.getElementById(`exp-company-${exp.id}`) as HTMLInputElement).value,
                                  location: (document.getElementById(`exp-location-${exp.id}`) as HTMLInputElement).value,
                                  startDate: (document.getElementById(`exp-start-${exp.id}`) as HTMLInputElement).value,
                                  endDate: (document.getElementById(`exp-end-${exp.id}`) as HTMLInputElement).value,
                                  description: (document.getElementById(`exp-desc-${exp.id}`) as HTMLTextAreaElement).value
                                })}
                              >
                                Save
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="p-4 bg-jobaura-blue/50 rounded-lg border border-jobaura-blue">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                              <h3 className="text-lg font-medium">{exp.title}</h3>
                              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleToggleEditExperience(exp.id)}
                                >
                                  <PencilIcon size={16} />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-red-500"
                                  onClick={() => handleRemoveExperience(exp.id)}
                                >
                                  <Trash2Icon size={16} />
                                </Button>
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-400 mb-2">
                              <div className="flex items-center">
                                <BriefcaseIcon size={14} className="mr-1" />
                                <span>{exp.company}</span>
                              </div>
                              <span className="hidden sm:inline mx-2">•</span>
                              <div className="flex items-center mt-1 sm:mt-0">
                                <MapPinIcon size={14} className="mr-1" />
                                <span>{exp.location}</span>
                              </div>
                            </div>
                            <div className="text-sm text-gray-400 mb-3">
                              {exp.startDate} - {exp.endDate}
                            </div>
                            <p className="text-sm">{exp.description}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Education</h3>
                    {education.map((edu) => (
                      <div key={edu.id} className="relative">
                        {edu.isEditing ? (
                          <div className="p-4 bg-jobaura-blue/50 rounded-lg border border-jobaura-blue">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                              <div className="space-y-2">
                                <Label htmlFor={`edu-degree-${edu.id}`}>Degree</Label>
                                <Input 
                                  id={`edu-degree-${edu.id}`} 
                                  defaultValue={edu.degree}
                                  className="bg-jobaura-blue/70"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`edu-school-${edu.id}`}>School</Label>
                                <Input 
                                  id={`edu-school-${edu.id}`} 
                                  defaultValue={edu.school}
                                  className="bg-jobaura-blue/70"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                              <div className="space-y-2">
                                <Label htmlFor={`edu-location-${edu.id}`}>Location</Label>
                                <Input 
                                  id={`edu-location-${edu.id}`} 
                                  defaultValue={edu.location}
                                  className="bg-jobaura-blue/70"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-2">
                                  <Label htmlFor={`edu-start-${edu.id}`}>Start Date</Label>
                                  <Input 
                                    id={`edu-start-${edu.id}`} 
                                    defaultValue={edu.startDate}
                                    className="bg-jobaura-blue/70"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor={`edu-end-${edu.id}`}>End Date</Label>
                                  <Input 
                                    id={`edu-end-${edu.id}`} 
                                    defaultValue={edu.endDate}
                                    className="bg-jobaura-blue/70"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="space-y-2 mb-4">
                              <Label htmlFor={`edu-desc-${edu.id}`}>Description</Label>
                              <Textarea 
                                id={`edu-desc-${edu.id}`} 
                                defaultValue={edu.description}
                                className="bg-jobaura-blue/70 min-h-[100px]"
                              />
                            </div>
                            <div className="flex gap-2 justify-end">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleToggleEditEducation(edu.id)}
                              >
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleUpdateEducation(edu.id, {
                                  degree: (document.getElementById(`edu-degree-${edu.id}`) as HTMLInputElement).value,
                                  school: (document.getElementById(`edu-school-${edu.id}`) as HTMLInputElement).value,
                                  location: (document.getElementById(`edu-location-${edu.id}`) as HTMLInputElement).value,
                                  startDate: (document.getElementById(`edu-start-${edu.id}`) as HTMLInputElement).value,
                                  endDate: (document.getElementById(`edu-end-${edu.id}`) as HTMLInputElement).value,
                                  description: (document.getElementById(`edu-desc-${edu.id}`) as HTMLTextAreaElement).value
                                })}
                              >
                                Save
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="p-4 bg-jobaura-blue/50 rounded-lg border border-jobaura-blue">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                              <h3 className="text-lg font-medium">{edu.degree}</h3>
                              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleToggleEditEducation(edu.id)}
                                >
                                  <PencilIcon size={16} />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-red-500"
                                  onClick={() => handleRemoveEducation(edu.id)}
                                >
                                  <Trash2Icon size={16} />
                                </Button>
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-400 mb-2">
                              <div className="flex items-center">
                                <GraduationCapIcon size={14} className="mr-1" />
                                <span>{edu.school}</span>
                              </div>
                              <span className="hidden sm:inline mx-2">•</span>
                              <div className="flex items-center mt-1 sm:mt-0">
                                <MapPinIcon size={14} className="mr-1" />
                                <span>{edu.location}</span>
                              </div>
                            </div>
                            <div className="text-sm text-gray-400 mb-3">
                              {edu.startDate} - {edu.endDate}
                            </div>
                            <p className="text-sm">{edu.description}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="col-span-1">
              <Card className="bg-jobaura-blue-light border-jobaura-blue">
                <CardHeader>
                  <CardTitle>Add Work Experience</CardTitle>
                  <CardDescription>Add your work history</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddExperience} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="exp-title">Job Title</Label>
                      <Input 
                        id="exp-title" 
                        value={newExperience.title}
                        onChange={(e) => setNewExperience({...newExperience, title: e.target.value})}
                        className="bg-jobaura-blue/50"
                        placeholder="e.g. Frontend Developer"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="exp-company">Company</Label>
                      <Input 
                        id="exp-company" 
                        value={newExperience.company}
                        onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                        className="bg-jobaura-blue/50"
                        placeholder="e.g. TechCorp Inc."
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="exp-location">Location</Label>
                      <Input 
                        id="exp-location" 
                        value={newExperience.location}
                        onChange={(e) => setNewExperience({...newExperience, location: e.target.value})}
                        className="bg-jobaura-blue/50"
                        placeholder="e.g. New York, NY"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="exp-start">Start Date</Label>
                        <Input 
                          id="exp-start" 
                          value={newExperience.startDate}
                          onChange={(e) => setNewExperience({...newExperience, startDate: e.target.value})}
                          className="bg-jobaura-blue/50"
                          placeholder="e.g. Jan 2020"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="exp-end">End Date</Label>
                        <Input 
                          id="exp-end" 
                          value={newExperience.endDate}
                          onChange={(e) => setNewExperience({...newExperience, endDate: e.target.value})}
                          className="bg-jobaura-blue/50"
                          placeholder="Present"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="exp-desc">Description</Label>
                      <Textarea 
                        id="exp-desc" 
                        value={newExperience.description}
                        onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                        className="bg-jobaura-blue/50 min-h-[100px]"
                        placeholder="Describe your responsibilities and achievements"
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      <PlusIcon size={16} className="mr-2" />
                      Add Experience
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="bg-jobaura-blue-light border-jobaura-blue mt-6">
                <CardHeader>
                  <CardTitle>Add Education</CardTitle>
                  <CardDescription>Add your educational background</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddEducation} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="edu-degree">Degree</Label>
                      <Input 
                        id="edu-degree" 
                        value={newEducation.degree}
                        onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
                        className="bg-jobaura-blue/50"
                        placeholder="e.g. Bachelor of Science in Computer Science"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="edu-school">School</Label>
                      <Input 
                        id="edu-school" 
                        value={newEducation.school}
                        onChange={(e) => setNewEducation({...newEducation, school: e.target.value})}
                        className="bg-jobaura-blue/50"
                        placeholder="e.g. University of Technology"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="edu-location">Location</Label>
                      <Input 
                        id="edu-location" 
                        value={newEducation.location}
                        onChange={(e) => setNewEducation({...newEducation, location: e.target.value})}
                        className="bg-jobaura-blue/50"
                        placeholder="e.g. Boston, MA"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="edu-start">Start Date</Label>
                        <Input 
                          id="edu-start" 
                          value={newEducation.startDate}
                          onChange={(e) => setNewEducation({...newEducation, startDate: e.target.value})}
                          className="bg-jobaura-blue/50"
                          placeholder="e.g. Sep 2016"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edu-end">End Date</Label>
                        <Input 
                          id="edu-end" 
                          value={newEducation.endDate}
                          onChange={(e) => setNewEducation({...newEducation, endDate: e.target.value})}
                          className="bg-jobaura-blue/50"
                          placeholder="e.g. May 2020"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="edu-desc">Description</Label>
                      <Textarea 
                        id="edu-desc" 
                        value={newEducation.description}
                        onChange={(e) => setNewEducation({...newEducation, description: e.target.value})}
                        className="bg-jobaura-blue/50 min-h-[80px]"
                        placeholder="Additional information about your studies"
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      <PlusIcon size={16} className="mr-2" />
                      Add Education
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Privacy Tab */}
        <TabsContent value="privacy">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-jobaura-blue-light border-jobaura-blue">
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Control who can see your information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdatePrivacySettings} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="profileVisibility">Profile Visibility</Label>
                      <Select 
                        value={privacySettings.profileVisibility} 
                        onValueChange={(value) => setPrivacySettings({...privacySettings, profileVisibility: value})}
                      >
                        <SelectTrigger id="profileVisibility" className="bg-jobaura-blue/50 mt-2">
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public - Visible to everyone</SelectItem>
                          <SelectItem value="limited">Limited - Visible to registered users</SelectItem>
                          <SelectItem value="private">Private - Only visible to you</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-400 mt-1">
                        Controls who can view your profile information
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="resumeVisibility">Resume Visibility</Label>
                      <Select 
                        value={privacySettings.resumeVisibility} 
                        onValueChange={(value) => setPrivacySettings({...privacySettings, resumeVisibility: value})}
                      >
                        <SelectTrigger id="resumeVisibility" className="bg-jobaura-blue/50 mt-2">
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public - Visible to all employers</SelectItem>
                          <SelectItem value="approved">Approved - Only visible to employers you apply to</SelectItem>
                          <SelectItem value="private">Private - Not visible to employers</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-400 mt-1">
                        Controls who can view your resume and detailed job history
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="showContactInfo">Show Contact Information</Label>
                        <p className="text-xs text-gray-400">
                          Allow employers to see your phone and email
                        </p>
                      </div>
                      <Switch 
                        id="showContactInfo" 
                        checked={privacySettings.showContactInfo}
                        onCheckedChange={(checked) => setPrivacySettings({...privacySettings, showContactInfo: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="allowMessages">Allow Messages</Label>
                        <p className="text-xs text-gray-400">
                          Receive messages from recruiters and employers
                        </p>
                      </div>
                      <Switch 
                        id="allowMessages" 
                        checked={privacySettings.allowMessages}
                        onCheckedChange={(checked) => setPrivacySettings({...privacySettings, allowMessages: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="jobAlerts">Job Alerts</Label>
                        <p className="text-xs text-gray-400">
                          Receive notifications about matching job opportunities
                        </p>
                      </div>
                      <Switch 
                        id="jobAlerts" 
                        checked={privacySettings.jobAlerts}
                        onCheckedChange={(checked) => setPrivacySettings({...privacySettings, jobAlerts: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="dataSharing">Data Sharing for Analytics</Label>
                        <p className="text-xs text-gray-400">
                          Allow anonymized data to be used for market insights
                        </p>
                      </div>
                      <Switch 
                        id="dataSharing" 
                        checked={privacySettings.dataSharing}
                        onCheckedChange={(checked) => setPrivacySettings({...privacySettings, dataSharing: checked})}
                      />
                    </div>
                  </div>
                  
                  <Button type="submit">
                    <ShieldIcon size={16} className="mr-2" />
                    Save Privacy Settings
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <Card className="bg-jobaura-blue-light border-jobaura-blue">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Change Password</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input 
                        id="currentPassword" 
                        type="password"
                        className="bg-jobaura-blue/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input 
                        id="newPassword" 
                        type="password"
                        className="bg-jobaura-blue/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input 
                        id="confirmPassword" 
                        type="password"
                        className="bg-jobaura-blue/50"
                      />
                    </div>
                    <Button variant="outline" className="w-full">Change Password</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="jobMatchNotifications">Job Match Notifications</Label>
                      <Switch id="jobMatchNotifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="applicationUpdates">Application Updates</Label>
                      <Switch id="applicationUpdates" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="messageNotifications">Message Notifications</Label>
                      <Switch id="messageNotifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="marketingEmails">Marketing Emails</Label>
                      <Switch id="marketingEmails" />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-3 text-red-500">Danger Zone</h3>
                  <div className="space-y-4">
                    <div className="p-4 border border-red-500/30 rounded-lg bg-red-500/10">
                      <h4 className="font-medium mb-1">Deactivate Account</h4>
                      <p className="text-sm text-gray-400 mb-3">
                        Temporarily disable your account. You can reactivate at any time.
                      </p>
                      <Button variant="outline" className="text-red-400 border-red-500/50 hover:bg-red-500/10 hover:text-red-300">
                        Deactivate Account
                      </Button>
                    </div>
                    
                    <div className="p-4 border border-red-500/30 rounded-lg bg-red-500/10">
                      <h4 className="font-medium mb-1">Delete Account</h4>
                      <p className="text-sm text-gray-400 mb-3">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                      <Button variant="destructive">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Profile;
