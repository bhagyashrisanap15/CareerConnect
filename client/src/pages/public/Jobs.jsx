import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, Filter, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import JobCard from '../../components/common/JobCard';
import { CATEGORIES, WORK_MODES, JOB_TYPES, EXPERIENCE_LEVELS } from '../../utils/constants';

export default function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters State initialized from URL query params or defaults
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [locationQuery, setLocationQuery] = useState(searchParams.get('location') || '');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || '');
  const [selectedWorkMode, setSelectedWorkMode] = useState(searchParams.get('workMode') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedExp, setSelectedExp] = useState(searchParams.get('exp') || '');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Mock Master Jobs Data
  const masterJobs = [
    {
      id: 'job-1',
      title: 'Senior React Developer',
      company: 'Vercel',
      location: 'San Francisco, CA',
      salary: '₹15 - ₹22 LPA',
      type: 'Full Time',
      workMode: 'Remote',
      category: 'Software Development',
      experience: '3-5 yrs',
      posted: '1 day ago',
      description: 'Build serverless frontend infrastructure and high performance web apps.',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind']
    },
    {
      id: 'job-2',
      title: 'Full Stack Engineer',
      company: 'Stripe',
      location: 'Remote',
      salary: '₹18 - ₹25 LPA',
      type: 'Full Time',
      workMode: 'Remote',
      category: 'Software Development',
      experience: '3-5 yrs',
      posted: '2 days ago',
      description: 'Scale financial backend engines and frontend billing dashboards.',
      skills: ['Node.js', 'React', 'MongoDB', 'PostgreSQL']
    },
    {
      id: 'job-3',
      title: 'UI/UX Design Lead',
      company: 'Linear',
      location: 'New York, NY',
      salary: '₹12 - ₹18 LPA',
      type: 'Full Time',
      workMode: 'Hybrid',
      category: 'UI/UX Design',
      experience: '5+ yrs',
      posted: '3 days ago',
      description: 'Design intuitive interfaces and construct component design tokens.',
      skills: ['Figma', 'Prototyping', 'CSS Grid', 'Tailwind']
    },
    {
      id: 'job-4',
      title: 'Frontend Web Intern',
      company: 'ABC Technologies',
      location: 'Pune',
      salary: '₹3 - ₹5 LPA',
      type: 'Internship',
      workMode: 'On-site',
      category: 'Software Development',
      experience: 'Fresher / 0-1 yr',
      posted: '4 days ago',
      description: 'Assist in building candidate dashboard screens and bug fixing.',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'React']
    },
    {
      id: 'job-5',
      title: 'Data Science Engineer',
      company: 'DataCorp',
      location: 'Bangalore',
      salary: '₹14 - ₹20 LPA',
      type: 'Full Time',
      workMode: 'Hybrid',
      category: 'Data Science',
      experience: '1-3 yrs',
      posted: '5 days ago',
      description: 'Develop predictive ML pipelines and analytics telemetry dashboards.',
      skills: ['Python', 'Pandas', 'PyTorch', 'SQL']
    },
    {
      id: 'job-6',
      title: 'Backend Node.js Developer',
      company: 'CloudWorks',
      location: 'Remote',
      salary: '₹10 - ₹16 LPA',
      type: 'Full Time',
      workMode: 'Remote',
      category: 'Software Development',
      experience: '1-3 yrs',
      posted: '6 days ago',
      description: 'Architect REST API web sockets and database indexing operations.',
      skills: ['Node.js', 'Express', 'MongoDB', 'Redis']
    },
    {
      id: 'job-7',
      title: 'Growth Marketing Specialist',
      company: 'MarketGrowth',
      location: 'Mumbai',
      salary: '₹6 - ₹10 LPA',
      type: 'Full Time',
      workMode: 'On-site',
      category: 'Marketing',
      experience: '1-3 yrs',
      posted: '1 week ago',
      description: 'Execute targeted search campaigns and candidate acquisition channels.',
      skills: ['SEO', 'Google Analytics', 'Content Strategy']
    }
  ];

  // Filtering Logic
  const filteredJobs = useMemo(() => {
    return masterJobs.filter((job) => {
      const matchQuery =
        !searchQuery ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchLocation =
        !locationQuery || job.location.toLowerCase().includes(locationQuery.toLowerCase());

      const matchType = !selectedType || job.type === selectedType;
      const matchWorkMode = !selectedWorkMode || job.workMode === selectedWorkMode;
      const matchCategory = !selectedCategory || job.category === selectedCategory;
      const matchExp = !selectedExp || job.experience === selectedExp;

      return (
        matchQuery &&
        matchLocation &&
        matchType &&
        matchWorkMode &&
        matchCategory &&
        matchExp
      );
    });
  }, [searchQuery, locationQuery, selectedType, selectedWorkMode, selectedCategory, selectedExp]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage) || 1;
  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredJobs.slice(start, start + itemsPerPage);
  }, [filteredJobs, currentPage]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setLocationQuery('');
    setSelectedType('');
    setSelectedWorkMode('');
    setSelectedCategory('');
    setSelectedExp('');
    setSearchParams({});
    setCurrentPage(1);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white">Find Your Next Job or Internship</h1>
        <p className="text-sm text-slate-400 mt-1">
          Explore {filteredJobs.length} verified tech and corporate job openings matching your credentials.
        </p>
      </div>

      {/* Top Search Bar (JobSearch Component) */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-950/80 rounded-xl border border-slate-800">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            type="text"
            placeholder="Search job title, skills, or keywords..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-transparent text-white text-sm focus:outline-none placeholder-slate-500"
          />
        </div>

        <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-950/80 rounded-xl border border-slate-800">
          <MapPin className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            type="text"
            placeholder="Location (e.g. Pune, Remote)..."
            value={locationQuery}
            onChange={(e) => {
              setLocationQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-transparent text-white text-sm focus:outline-none placeholder-slate-500"
          />
        </div>

        <button
          onClick={handleResetFilters}
          className="px-4 py-3 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Filters</span>
        </button>
      </div>

      {/* Main Grid: JobFilters + JobList */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar JobFilters */}
        <aside className="lg:col-span-1 space-y-6 bg-slate-900/60 border border-slate-800 p-5 rounded-2xl h-fit">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <Filter className="w-4 h-4 text-indigo-400" />
              <span>Job Filters</span>
            </div>
            <span className="text-xs text-indigo-400 font-semibold">{filteredJobs.length} roles</span>
          </div>

          {/* Filter: Job / Internship */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Job Type</label>
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="">All Job Types</option>
              {JOB_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Filter: Work Mode (Remote, Hybrid, On-site) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Work Mode</label>
            <select
              value={selectedWorkMode}
              onChange={(e) => {
                setSelectedWorkMode(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="">All Work Modes</option>
              {WORK_MODES.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Filter: Category */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Filter: Experience */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Experience</label>
            <select
              value={selectedExp}
              onChange={(e) => {
                setSelectedExp(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="">All Experience Levels</option>
              {EXPERIENCE_LEVELS.map((exp) => (
                <option key={exp} value={exp}>{exp}</option>
              ))}
            </select>
          </div>
        </aside>

        {/* JobList Section */}
        <main className="lg:col-span-3 space-y-6">
          {paginatedJobs.length === 0 ? (
            <div className="text-center py-16 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-4">
              <p className="text-lg font-bold text-white">No jobs match your search parameters</p>
              <p className="text-xs text-slate-400">Try broadening your filters or location search query.</p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-6 border-t border-slate-800">
              <span className="text-xs text-slate-400">
                Page {currentPage} of {totalPages} ({filteredJobs.length} total jobs)
              </span>
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 disabled:opacity-40 hover:bg-slate-800 text-xs flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 disabled:opacity-40 hover:bg-slate-800 text-xs flex items-center gap-1"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
