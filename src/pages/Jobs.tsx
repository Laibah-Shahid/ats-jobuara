
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  ArrowUpDown, 
  BriefcaseIcon, 
  CheckIcon, 
  Clock, 
  FilterIcon, 
  MapPinIcon, 
  SearchIcon, 
  StarIcon, 
  XIcon 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Define job type
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  locationType: "Remote" | "Onsite" | "Hybrid";
  salary: string;
  salaryRange: [number, number];
  posted: string;
  postedDays: number;
  description: string;
  skills: string[];
  matchScore: number;
  isFavorite: boolean;
  isApplied: boolean;
  employmentType: "Full-time" | "Part-time" | "Contract" | "Internship";
  experienceLevel: "Entry" | "Mid" | "Senior" | "Lead";
}

const Jobs = () => {
  // Mock jobs data
  const initialJobs: Job[] = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      locationType: "Remote",
      salary: "$120K - $150K",
      salaryRange: [120000, 150000],
      posted: "2 days ago",
      postedDays: 2,
      description: "We're looking for a Senior Frontend Developer to join our team. You'll be responsible for building and maintaining our web applications using React, TypeScript, and Next.js.",
      skills: ["React", "TypeScript", "NextJS", "TailwindCSS"],
      matchScore: 92,
      isFavorite: false,
      isApplied: false,
      employmentType: "Full-time",
      experienceLevel: "Senior"
    },
    {
      id: 2,
      title: "UI Developer",
      company: "InnovateTech",
      location: "San Francisco, CA",
      locationType: "Hybrid",
      salary: "$110K - $140K",
      salaryRange: [110000, 140000],
      posted: "5 days ago",
      postedDays: 5,
      description: "Join our creative team as a UI Developer. You'll collaborate with designers to implement beautiful user interfaces for web applications.",
      skills: ["React", "JavaScript", "CSS", "UI/UX"],
      matchScore: 85,
      isFavorite: true,
      isApplied: false,
      employmentType: "Full-time",
      experienceLevel: "Mid"
    },
    {
      id: 3,
      title: "Frontend Engineer",
      company: "WebSolutions",
      location: "New York, NY",
      locationType: "Onsite",
      salary: "$100K - $130K",
      salaryRange: [100000, 130000],
      posted: "1 week ago",
      postedDays: 7,
      description: "WebSolutions is seeking a talented Frontend Engineer to develop web applications using modern JavaScript frameworks.",
      skills: ["JavaScript", "React", "Redux", "HTML/CSS"],
      matchScore: 78,
      isFavorite: false,
      isApplied: true,
      employmentType: "Full-time",
      experienceLevel: "Mid"
    },
    {
      id: 4,
      title: "React Developer",
      company: "SoftwareCo",
      location: "Boston, MA",
      locationType: "Remote",
      salary: "$90K - $120K",
      salaryRange: [90000, 120000],
      posted: "3 days ago",
      postedDays: 3,
      description: "SoftwareCo is looking for a React Developer to join our growing team. You'll work on exciting projects for clients across various industries.",
      skills: ["React", "JavaScript", "HTML", "CSS"],
      matchScore: 95,
      isFavorite: false,
      isApplied: false,
      employmentType: "Contract",
      experienceLevel: "Mid"
    },
    {
      id: 5,
      title: "Junior Frontend Developer",
      company: "StartupX",
      location: "Austin, TX",
      locationType: "Hybrid",
      salary: "$70K - $90K",
      salaryRange: [70000, 90000],
      posted: "2 weeks ago",
      postedDays: 14,
      description: "StartupX is hiring a Junior Frontend Developer to help build our innovative product. This is a great opportunity for someone looking to grow their skills.",
      skills: ["HTML", "CSS", "JavaScript", "React"],
      matchScore: 88,
      isFavorite: false,
      isApplied: false,
      employmentType: "Full-time",
      experienceLevel: "Entry"
    },
    {
      id: 6,
      title: "Lead Frontend Engineer",
      company: "Enterprise Solutions",
      location: "Chicago, IL",
      locationType: "Onsite",
      salary: "$130K - $170K",
      salaryRange: [130000, 170000],
      posted: "1 day ago",
      postedDays: 1,
      description: "We're seeking a Lead Frontend Engineer to drive our frontend architecture and mentor junior developers. Ideal candidates should have extensive experience with modern JavaScript frameworks.",
      skills: ["React", "TypeScript", "Architecture", "Team Leadership"],
      matchScore: 82,
      isFavorite: true,
      isApplied: false,
      employmentType: "Full-time",
      experienceLevel: "Lead"
    },
    {
      id: 7,
      title: "Frontend Intern",
      company: "TechStart",
      location: "Remote",
      locationType: "Remote",
      salary: "$25 - $35/hr",
      salaryRange: [52000, 72800],
      posted: "4 days ago",
      postedDays: 4,
      description: "Great opportunity for students or recent graduates to gain real-world experience in frontend development.",
      skills: ["HTML", "CSS", "JavaScript"],
      matchScore: 90,
      isFavorite: false,
      isApplied: false,
      employmentType: "Internship",
      experienceLevel: "Entry"
    },
    {
      id: 8,
      title: "Senior React Developer",
      company: "FinTech Solutions",
      location: "Seattle, WA",
      locationType: "Hybrid",
      salary: "$125K - $155K",
      salaryRange: [125000, 155000],
      posted: "3 days ago",
      postedDays: 3,
      description: "Join our fintech company to build cutting-edge financial applications using React and related technologies.",
      skills: ["React", "Redux", "TypeScript", "Financial Domain"],
      matchScore: 75,
      isFavorite: false,
      isApplied: false,
      employmentType: "Full-time",
      experienceLevel: "Senior"
    }
  ];

  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Filter states
  const [salaryRange, setSalaryRange] = useState<[number, number]>([50000, 200000]);
  const [locationTypes, setLocationTypes] = useState<Record<string, boolean>>({
    Remote: false,
    Hybrid: false,
    Onsite: false
  });
  const [experienceLevels, setExperienceLevels] = useState<Record<string, boolean>>({
    Entry: false,
    Mid: false,
    Senior: false,
    Lead: false
  });
  const [employmentTypes, setEmploymentTypes] = useState<Record<string, boolean>>({
    "Full-time": false,
    "Part-time": false,
    Contract: false,
    Internship: false
  });
  const [datePosted, setDatePosted] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("matchScore");

  // Filter functions
  const applyFilters = () => {
    let filteredJobs = [...initialJobs];
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(term) || 
        job.company.toLowerCase().includes(term) ||
        job.skills.some(skill => skill.toLowerCase().includes(term))
      );
    }
    
    // Apply salary range filter
    filteredJobs = filteredJobs.filter(job => 
      job.salaryRange[0] <= salaryRange[1] && job.salaryRange[1] >= salaryRange[0]
    );
    
    // Apply location type filter
    const selectedLocationTypes = Object.entries(locationTypes)
      .filter(([_, isSelected]) => isSelected)
      .map(([type]) => type);
      
    if (selectedLocationTypes.length > 0) {
      filteredJobs = filteredJobs.filter(job => selectedLocationTypes.includes(job.locationType));
    }
    
    // Apply experience level filter
    const selectedExperienceLevels = Object.entries(experienceLevels)
      .filter(([_, isSelected]) => isSelected)
      .map(([level]) => level);
      
    if (selectedExperienceLevels.length > 0) {
      filteredJobs = filteredJobs.filter(job => selectedExperienceLevels.includes(job.experienceLevel));
    }
    
    // Apply employment type filter
    const selectedEmploymentTypes = Object.entries(employmentTypes)
      .filter(([_, isSelected]) => isSelected)
      .map(([type]) => type);
      
    if (selectedEmploymentTypes.length > 0) {
      filteredJobs = filteredJobs.filter(job => selectedEmploymentTypes.includes(job.employmentType));
    }
    
    // Apply date posted filter
    if (datePosted) {
      let daysAgo = 0;
      switch (datePosted) {
        case "today":
          daysAgo = 1;
          break;
        case "week":
          daysAgo = 7;
          break;
        case "month":
          daysAgo = 30;
          break;
      }
      
      if (daysAgo > 0) {
        filteredJobs = filteredJobs.filter(job => job.postedDays <= daysAgo);
      }
    }
    
    // Apply sorting
    filteredJobs.sort((a, b) => {
      switch (sortBy) {
        case "matchScore":
          return b.matchScore - a.matchScore;
        case "datePosted":
          return a.postedDays - b.postedDays;
        case "salary":
          return b.salaryRange[1] - a.salaryRange[1];
        default:
          return b.matchScore - a.matchScore;
      }
    });
    
    setJobs(filteredJobs);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setSalaryRange([50000, 200000]);
    setLocationTypes({
      Remote: false,
      Hybrid: false,
      Onsite: false
    });
    setExperienceLevels({
      Entry: false,
      Mid: false,
      Senior: false,
      Lead: false
    });
    setEmploymentTypes({
      "Full-time": false,
      "Part-time": false,
      Contract: false,
      Internship: false
    });
    setDatePosted(null);
    setSortBy("matchScore");
    setJobs(initialJobs);
  };

  // Toggle job favorite status
  const toggleFavorite = (id: number) => {
    setJobs(jobs.map(job => 
      job.id === id ? { ...job, isFavorite: !job.isFavorite } : job
    ));
    
    if (selectedJob && selectedJob.id === id) {
      setSelectedJob({ ...selectedJob, isFavorite: !selectedJob.isFavorite });
    }
  };

  // Apply to job
  const applyToJob = (id: number) => {
    setJobs(jobs.map(job => 
      job.id === id ? { ...job, isApplied: true } : job
    ));
    
    if (selectedJob && selectedJob.id === id) {
      setSelectedJob({ ...selectedJob, isApplied: true });
    }
  };

  // Handle job click to view details
  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
  };

  // Format salary for display
  const formatSalary = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${(value / 1000).toFixed(0)}K`;
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Job Listings"
        description="Find your next career opportunity"
      >
        <Button 
          size="sm" 
          variant="outline" 
          className="gap-1"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FilterIcon size={16} />
          <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
        </Button>
      </PageHeader>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search jobs by title, company, or skills..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto gap-1">
                <ArrowUpDown size={16} />
                Sort: {sortBy === "matchScore" ? "Best Match" : sortBy === "datePosted" ? "Most Recent" : "Highest Salary"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => {setSortBy("matchScore"); applyFilters();}}>
                Best Match
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {setSortBy("datePosted"); applyFilters();}}>
                Most Recent
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {setSortBy("salary"); applyFilters();}}>
                Highest Salary
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button onClick={applyFilters}>Search</Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <Card className="bg-jobaura-blue-light border-jobaura-blue mb-4">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Filters</CardTitle>
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  Reset All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Salary Range */}
                <div>
                  <Label className="mb-2 block">Salary Range</Label>
                  <div className="mb-2">
                    <Slider 
                      value={[salaryRange[0], salaryRange[1]]} 
                      min={50000} 
                      max={200000}
                      step={5000}
                      onValueChange={(value) => setSalaryRange([value[0], value[1]])}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>{formatSalary(salaryRange[0])}</span>
                    <span>{formatSalary(salaryRange[1])}</span>
                  </div>
                </div>
                
                {/* Location Type */}
                <div>
                  <Label className="mb-2 block">Location Type</Label>
                  <div className="space-y-2">
                    {["Remote", "Hybrid", "Onsite"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`location-${type}`} 
                          checked={locationTypes[type]}
                          onCheckedChange={(checked) => 
                            setLocationTypes({
                              ...locationTypes,
                              [type]: !!checked
                            })
                          }
                        />
                        <label 
                          htmlFor={`location-${type}`}
                          className="text-sm cursor-pointer"
                        >
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Experience Level */}
                <div>
                  <Label className="mb-2 block">Experience Level</Label>
                  <div className="space-y-2">
                    {["Entry", "Mid", "Senior", "Lead"].map((level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`exp-${level}`} 
                          checked={experienceLevels[level]}
                          onCheckedChange={(checked) => 
                            setExperienceLevels({
                              ...experienceLevels,
                              [level]: !!checked
                            })
                          }
                        />
                        <label 
                          htmlFor={`exp-${level}`}
                          className="text-sm cursor-pointer"
                        >
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Employment Type & Date Posted */}
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Employment Type</Label>
                    <div className="space-y-2">
                      {["Full-time", "Part-time", "Contract", "Internship"].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`emp-${type}`} 
                            checked={employmentTypes[type]}
                            onCheckedChange={(checked) => 
                              setEmploymentTypes({
                                ...employmentTypes,
                                [type]: !!checked
                              })
                            }
                          />
                          <label 
                            htmlFor={`emp-${type}`}
                            className="text-sm cursor-pointer"
                          >
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Date Posted</Label>
                    <Select 
                      value={datePosted || ""} 
                      onValueChange={setDatePosted}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any time</SelectItem>
                        <SelectItem value="today">Past 24 hours</SelectItem>
                        <SelectItem value="week">Past week</SelectItem>
                        <SelectItem value="month">Past month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={applyFilters} className="w-full sm:w-auto">
                Apply Filters
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Active Filters */}
        {(Object.values(locationTypes).some(Boolean) || 
         Object.values(experienceLevels).some(Boolean) ||
         Object.values(employmentTypes).some(Boolean) ||
         datePosted ||
         salaryRange[0] > 50000 ||
         salaryRange[1] < 200000) && (
          <div className="mb-4 flex flex-wrap gap-2">
            {Object.entries(locationTypes)
              .filter(([_, isSelected]) => isSelected)
              .map(([type]) => (
                <Badge key={`loc-${type}`} variant="outline" className="gap-1">
                  {type}
                  <button 
                    onClick={() => {
                      setLocationTypes({...locationTypes, [type]: false});
                      applyFilters();
                    }}
                    className="ml-1"
                  >
                    <XIcon size={12} />
                  </button>
                </Badge>
              ))}
              
            {Object.entries(experienceLevels)
              .filter(([_, isSelected]) => isSelected)
              .map(([level]) => (
                <Badge key={`exp-${level}`} variant="outline" className="gap-1">
                  {level} Level
                  <button 
                    onClick={() => {
                      setExperienceLevels({...experienceLevels, [level]: false});
                      applyFilters();
                    }}
                    className="ml-1"
                  >
                    <XIcon size={12} />
                  </button>
                </Badge>
              ))}
              
            {Object.entries(employmentTypes)
              .filter(([_, isSelected]) => isSelected)
              .map(([type]) => (
                <Badge key={`emp-${type}`} variant="outline" className="gap-1">
                  {type}
                  <button 
                    onClick={() => {
                      setEmploymentTypes({...employmentTypes, [type]: false});
                      applyFilters();
                    }}
                    className="ml-1"
                  >
                    <XIcon size={12} />
                  </button>
                </Badge>
              ))}
              
            {datePosted && (
              <Badge variant="outline" className="gap-1">
                {datePosted === "today" ? "Past 24 hours" : 
                 datePosted === "week" ? "Past week" : "Past month"}
                <button 
                  onClick={() => {
                    setDatePosted(null);
                    applyFilters();
                  }}
                  className="ml-1"
                >
                  <XIcon size={12} />
                </button>
              </Badge>
            )}
            
            {(salaryRange[0] > 50000 || salaryRange[1] < 200000) && (
              <Badge variant="outline" className="gap-1">
                {formatSalary(salaryRange[0])} - {formatSalary(salaryRange[1])}
                <button 
                  onClick={() => {
                    setSalaryRange([50000, 200000]);
                    applyFilters();
                  }}
                  className="ml-1"
                >
                  <XIcon size={12} />
                </button>
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Jobs List and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6 w-full max-w-sm">
              <TabsTrigger value="all">All Jobs</TabsTrigger>
              <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
              <TabsTrigger value="applied">Applied Jobs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {jobs.length === 0 ? (
                <Card className="bg-jobaura-blue-light border-jobaura-blue p-6 text-center">
                  <div className="mb-4">
                    <div className="mx-auto w-12 h-12 rounded-full bg-jobaura-blue/50 flex items-center justify-center">
                      <SearchIcon size={24} className="text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                  <p className="text-gray-400 mb-4">Try adjusting your search or filters</p>
                  <Button onClick={resetFilters}>Reset Filters</Button>
                </Card>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <Card 
                      key={job.id} 
                      className={`bg-jobaura-blue-light border-jobaura-blue hover:border-primary/40 transition-colors cursor-pointer ${
                        selectedJob?.id === job.id ? 'border-primary' : ''
                      }`}
                      onClick={() => handleJobClick(job)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between">
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-lg mb-1">{job.title}</h3>
                                <p className="text-gray-400 mb-2">{job.company}</p>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  className={`text-gray-400 hover:text-yellow-400 ${job.isFavorite ? 'text-yellow-400' : ''}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(job.id);
                                  }}
                                >
                                  <StarIcon size={18} fill={job.isFavorite ? "currentColor" : "none"} />
                                </button>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              <div className="flex items-center text-sm text-gray-400">
                                <MapPinIcon size={14} className="mr-1" />
                                <span>{job.location}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-400">
                                <BriefcaseIcon size={14} className="mr-1" />
                                <span>{job.employmentType}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-400">
                                <Clock size={14} className="mr-1" />
                                <span>{job.posted}</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {job.skills.map((skill, index) => (
                                <span 
                                  key={`${job.id}-${index}`} 
                                  className="text-xs px-2 py-0.5 bg-jobaura-blue/70 rounded-full"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div className="text-sm">
                                <span className="text-gray-400">Salary: </span>
                                <span>{job.salary}</span>
                              </div>
                              
                              <div className="flex items-center">
                                <div className="pr-2">
                                  <span className="text-xs font-medium mr-1">Match:</span>
                                  <span 
                                    className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${
                                      job.matchScore >= 90 
                                        ? "bg-green-500/20 text-green-400" 
                                        : job.matchScore >= 80 
                                        ? "bg-primary/20 text-primary" 
                                        : "bg-yellow-500/20 text-yellow-400"
                                    }`}
                                  >
                                    {job.matchScore}%
                                  </span>
                                </div>
                                
                                {job.isApplied ? (
                                  <span className="text-xs bg-green-500/20 text-green-400 flex items-center px-2 py-1 rounded-full">
                                    <CheckIcon size={12} className="mr-1" />
                                    Applied
                                  </span>
                                ) : (
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="text-xs h-7"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      applyToJob(job.id);
                                    }}
                                  >
                                    Apply
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="saved">
              {jobs.filter(job => job.isFavorite).length === 0 ? (
                <Card className="bg-jobaura-blue-light border-jobaura-blue p-6 text-center">
                  <div className="mb-4">
                    <div className="mx-auto w-12 h-12 rounded-full bg-jobaura-blue/50 flex items-center justify-center">
                      <StarIcon size={24} className="text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">No saved jobs</h3>
                  <p className="text-gray-400 mb-4">You haven't saved any jobs yet</p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {jobs.filter(job => job.isFavorite).map((job) => (
                    <Card 
                      key={job.id} 
                      className={`bg-jobaura-blue-light border-jobaura-blue hover:border-primary/40 transition-colors cursor-pointer ${
                        selectedJob?.id === job.id ? 'border-primary' : ''
                      }`}
                      onClick={() => handleJobClick(job)}
                    >
                      <CardContent className="p-4">
                        {/* Same job card content as above */}
                        <div className="flex justify-between">
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-lg mb-1">{job.title}</h3>
                                <p className="text-gray-400 mb-2">{job.company}</p>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  className="text-yellow-400"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(job.id);
                                  }}
                                >
                                  <StarIcon size={18} fill="currentColor" />
                                </button>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              <div className="flex items-center text-sm text-gray-400">
                                <MapPinIcon size={14} className="mr-1" />
                                <span>{job.location}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-400">
                                <BriefcaseIcon size={14} className="mr-1" />
                                <span>{job.employmentType}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-400">
                                <Clock size={14} className="mr-1" />
                                <span>{job.posted}</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {job.skills.map((skill, index) => (
                                <span 
                                  key={`${job.id}-${index}`} 
                                  className="text-xs px-2 py-0.5 bg-jobaura-blue/70 rounded-full"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div className="text-sm">
                                <span className="text-gray-400">Salary: </span>
                                <span>{job.salary}</span>
                              </div>
                              
                              <div className="flex items-center">
                                <div className="pr-2">
                                  <span className="text-xs font-medium mr-1">Match:</span>
                                  <span 
                                    className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${
                                      job.matchScore >= 90 
                                        ? "bg-green-500/20 text-green-400" 
                                        : job.matchScore >= 80 
                                        ? "bg-primary/20 text-primary" 
                                        : "bg-yellow-500/20 text-yellow-400"
                                    }`}
                                  >
                                    {job.matchScore}%
                                  </span>
                                </div>
                                
                                {job.isApplied ? (
                                  <span className="text-xs bg-green-500/20 text-green-400 flex items-center px-2 py-1 rounded-full">
                                    <CheckIcon size={12} className="mr-1" />
                                    Applied
                                  </span>
                                ) : (
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="text-xs h-7"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      applyToJob(job.id);
                                    }}
                                  >
                                    Apply
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="applied">
              {jobs.filter(job => job.isApplied).length === 0 ? (
                <Card className="bg-jobaura-blue-light border-jobaura-blue p-6 text-center">
                  <div className="mb-4">
                    <div className="mx-auto w-12 h-12 rounded-full bg-jobaura-blue/50 flex items-center justify-center">
                      <BriefcaseIcon size={24} className="text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">No applications</h3>
                  <p className="text-gray-400 mb-4">You haven't applied to any jobs yet</p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {jobs.filter(job => job.isApplied).map((job) => (
                    <Card 
                      key={job.id} 
                      className={`bg-jobaura-blue-light border-jobaura-blue hover:border-primary/40 transition-colors cursor-pointer ${
                        selectedJob?.id === job.id ? 'border-primary' : ''
                      }`}
                      onClick={() => handleJobClick(job)}
                    >
                      <CardContent className="p-4">
                        {/* Same job card content as above */}
                        <div className="flex justify-between">
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-lg mb-1">{job.title}</h3>
                                <p className="text-gray-400 mb-2">{job.company}</p>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  className={`text-gray-400 hover:text-yellow-400 ${job.isFavorite ? 'text-yellow-400' : ''}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(job.id);
                                  }}
                                >
                                  <StarIcon size={18} fill={job.isFavorite ? "currentColor" : "none"} />
                                </button>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              <div className="flex items-center text-sm text-gray-400">
                                <MapPinIcon size={14} className="mr-1" />
                                <span>{job.location}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-400">
                                <BriefcaseIcon size={14} className="mr-1" />
                                <span>{job.employmentType}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-400">
                                <Clock size={14} className="mr-1" />
                                <span>{job.posted}</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {job.skills.map((skill, index) => (
                                <span 
                                  key={`${job.id}-${index}`} 
                                  className="text-xs px-2 py-0.5 bg-jobaura-blue/70 rounded-full"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div className="text-sm">
                                <span className="text-gray-400">Salary: </span>
                                <span>{job.salary}</span>
                              </div>
                              
                              <div className="flex items-center">
                                <div className="pr-2">
                                  <span className="text-xs font-medium mr-1">Match:</span>
                                  <span 
                                    className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${
                                      job.matchScore >= 90 
                                        ? "bg-green-500/20 text-green-400" 
                                        : job.matchScore >= 80 
                                        ? "bg-primary/20 text-primary" 
                                        : "bg-yellow-500/20 text-yellow-400"
                                    }`}
                                  >
                                    {job.matchScore}%
                                  </span>
                                </div>
                                
                                <span className="text-xs bg-green-500/20 text-green-400 flex items-center px-2 py-1 rounded-full">
                                  <CheckIcon size={12} className="mr-1" />
                                  Applied
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Job Details */}
        <div className="hidden lg:block sticky top-6">
          {selectedJob ? (
            <Card className="bg-jobaura-blue-light border-jobaura-blue">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{selectedJob.title}</CardTitle>
                    <p className="text-gray-400 mt-1">{selectedJob.company}</p>
                  </div>
                  <button
                    className={`text-gray-400 hover:text-yellow-400 ${selectedJob.isFavorite ? 'text-yellow-400' : ''}`}
                    onClick={() => toggleFavorite(selectedJob.id)}
                  >
                    <StarIcon size={20} fill={selectedJob.isFavorite ? "currentColor" : "none"} />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                  <div className="flex items-center">
                    <MapPinIcon size={16} className="mr-1.5" />
                    <span>{selectedJob.location}</span>
                  </div>
                  <div className="flex items-center">
                    <BriefcaseIcon size={16} className="mr-1.5" />
                    <span>{selectedJob.employmentType}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1.5" />
                    <span>Posted {selectedJob.posted}</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-medium mr-2">Match Score:</span>
                    <span 
                      className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                        selectedJob.matchScore >= 90 
                          ? "bg-green-500/20 text-green-400" 
                          : selectedJob.matchScore >= 80 
                          ? "bg-primary/20 text-primary" 
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {selectedJob.matchScore}%
                    </span>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-sm font-medium">Salary: </span>
                    <span className="text-sm">{selectedJob.salary}</span>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-sm font-medium">Experience Level: </span>
                    <span className="text-sm">{selectedJob.experienceLevel}</span>
                  </div>
                </div>

                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Job Description</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    {selectedJob.description}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Required Skills</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedJob.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-2 py-1 bg-jobaura-blue/70 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {selectedJob.isApplied ? (
                  <div className="w-full">
                    <div className="bg-green-500/20 text-green-400 flex items-center justify-center py-2 px-4 rounded-md mb-2">
                      <CheckIcon size={16} className="mr-2" />
                      <span>You've already applied</span>
                    </div>
                    <Button variant="outline" className="w-full">
                      View Application Status
                    </Button>
                  </div>
                ) : (
                  <Button className="w-full" onClick={() => applyToJob(selectedJob.id)}>
                    Apply Now
                  </Button>
                )}
              </CardFooter>
            </Card>
          ) : (
            <Card className="bg-jobaura-blue-light border-jobaura-blue p-6 text-center">
              <div className="mb-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-jobaura-blue/50 flex items-center justify-center">
                  <BriefcaseIcon size={24} className="text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-medium mb-2">Job Details</h3>
              <p className="text-gray-400">Select a job to view details</p>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Jobs;
