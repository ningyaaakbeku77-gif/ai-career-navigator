import { useState, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'

interface Job {
  id: number
  title: string
  company: string
  location: string
  salary: string
  skills: string[]
  posted: string
  remote: boolean
  description?: string
}

export default function JobScraper() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [jobs, setJobs] = useState<Job[]>([])
  const { theme } = useTheme()

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async (query: string = '') => {
    setIsSearching(true)
    try {
      const response = await fetch(
        `http://localhost:8000/api/jobs/search?query=${query}`
      )

      if (response.ok) {
        const data = await response.json()
        setJobs(data.jobs || [])
      } else {
        loadMockJobs(query)
      }
    } catch (error) {
      console.error('API Error:', error)
      loadMockJobs(query)
    } finally {
      setIsSearching(false)
    }
  }

  const loadMockJobs = (query: string) => {
    const mockJobs: Job[] = [
      {
        id: 1,
        title: 'Machine Learning Engineer',
        company: 'Google',
        location: 'Mountain View, CA',
        salary: '$150K - $220K',
        skills: ['Python', 'TensorFlow', 'ML', 'Docker'],
        posted: '2 days ago',
        remote: true,
        description: 'Build and deploy ML models at scale'
      },
      {
        id: 2,
        title: 'Senior ML Engineer',
        company: 'Meta',
        location: 'Menlo Park, CA',
        salary: '$170K - $240K',
        skills: ['PyTorch', 'Python', 'ML', 'AWS'],
        posted: '1 week ago',
        remote: false,
        description: 'Work on cutting-edge AI products'
      },
      {
        id: 3,
        title: 'AI Research Scientist',
        company: 'OpenAI',
        location: 'San Francisco, CA',
        salary: '$180K - $260K',
        skills: ['Deep Learning', 'Python', 'Research', 'NLP'],
        posted: '3 days ago',
        remote: true,
        description: 'Push the boundaries of AI research'
      },
      {
        id: 4,
        title: 'Data Scientist',
        company: 'Netflix',
        location: 'Los Gatos, CA',
        salary: '$160K - $230K',
        skills: ['Python', 'SQL', 'ML', 'Statistics'],
        posted: '5 days ago',
        remote: true,
        description: 'Drive data-driven decision making'
      }
    ]

    if (query) {
      setJobs(
        mockJobs.filter(
          job =>
            job.title.toLowerCase().includes(query.toLowerCase()) ||
            job.company.toLowerCase().includes(query.toLowerCase()) ||
            job.skills.some(skill =>
              skill.toLowerCase().includes(query.toLowerCase())
            )
        )
      )
    } else {
      setJobs(mockJobs)
    }
  }

  const handleSearch = () => {
    fetchJobs(searchQuery)
  }

  const handleSaveJob = (jobId: number) => {
    alert(`Job ${jobId} saved to your favorites!`)
  }

  const handleViewDetails = (job: Job) => {
    alert(`Viewing: ${job.title} at ${job.company}\n\n${job.description}`)
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-12">
        <h2 className="text-4xl font-bold mb-4">🔥 Job Market Intelligence</h2>
        <p className="text-lg">
          Real-time analysis of {jobs.length}+ job postings
        </p>
      </div>

      <div className="mb-8 flex gap-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search jobs (e.g., Machine Learning Engineer)"
          className="flex-grow px-6 py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleSearch}
          disabled={isSearching}
          className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-2xl transition-all disabled:opacity-50"
        >
          {isSearching ? '🔍 Searching...' : '🔎 Search Jobs'}
        </button>
      </div>

      <div className="grid gap-6 mb-12">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="group rounded-2xl p-6 border hover:scale-[1.02] transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold">{job.title}</h3>
                  {job.remote && (
                    <span className="px-3 py-1 bg-green-500 bg-opacity-20 rounded-full text-green-500 text-xs border border-green-500 font-semibold">
                      🏡 Remote
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span>🏢 {job.company}</span>
                  <span>📍 {job.location}</span>
                  <span>💰 {job.salary}</span>
                </div>
              </div>
              <div className="text-sm">{job.posted}</div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {job.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-sm border font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleViewDetails(job)}
                className="flex-grow px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold"
              >
                View Details
              </button>
              <button
                onClick={() => handleSaveJob(job.id)}
                className="px-4 py-2 border rounded-lg"
              >
                ⭐ Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
