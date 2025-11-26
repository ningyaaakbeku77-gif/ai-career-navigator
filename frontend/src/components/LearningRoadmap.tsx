
import { useState } from 'react'

interface Module {
  id: number
  title: string
  description: string
  duration: string
  status: 'completed' | 'in-progress' | 'pending'
  skills: string[]
  progress: number
}

export default function LearningRoadmap() {
  const [modules] = useState<Module[]>([
    {
      id: 1,
      title: 'Python Fundamentals',
      description: 'Master Python basics, data structures, and OOP concepts',
      duration: '4 weeks',
      status: 'completed',
      skills: ['Python', 'Data Structures', 'OOP'],
      progress: 100
    },
    {
      id: 2,
      title: 'Machine Learning Basics',
      description: 'Introduction to ML algorithms and scikit-learn',
      duration: '6 weeks',
      status: 'in-progress',
      skills: ['Machine Learning', 'scikit-learn', 'Statistics'],
      progress: 65
    },
    {
      id: 3,
      title: 'Deep Learning with PyTorch',
      description: 'Neural networks, CNNs, and RNNs',
      duration: '8 weeks',
      status: 'pending',
      skills: ['PyTorch', 'Deep Learning', 'Neural Networks'],
      progress: 0
    },
    {
      id: 4,
      title: 'MLOps & Deployment',
      description: 'Deploy ML models to production',
      duration: '4 weeks',
      status: 'pending',
      skills: ['Docker', 'Kubernetes', 'MLOps'],
      progress: 0
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'from-green-500 to-emerald-600'
      case 'in-progress': return 'from-yellow-500 to-orange-600'
      case 'pending': return 'from-gray-500 to-slate-600'
      default: return 'from-gray-500 to-slate-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✅'
      case 'in-progress': return '⚡'
      case 'pending': return '⏳'
      default: return '📘'
    }
  }

  const handleModuleClick = (id: number) => {
    alert("Opening module details...");
  }

  const completedCount = modules.filter(m => m.status === 'completed').length
  const progressPercentage = (completedCount / modules.length) * 100

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          📚 Your Learning Roadmap
        </h2>
        <p className="text-purple-300 text-lg">
          Personalized path to becoming a Machine Learning Engineer
        </p>

        <div className="mt-8 p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl border border-purple-400">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-semibold">Overall Progress</span>
            <span className="text-cyan-400 font-bold text-xl">{progressPercentage.toFixed(0)}%</span>
          </div>

          <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-1000 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="mt-3 text-purple-300 text-sm">
            {completedCount} of {modules.length} modules completed
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {modules.map((module, index) => (
          <div
            key={module.id}
            onClick={() => handleModuleClick(module.id)}
            className="group relative bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-purple-400 hover:bg-opacity-20 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
          >
            {index < modules.length - 1 && (
              <div className="absolute left-12 top-full w-0.5 h-6 bg-purple-500"></div>
            )}

            <div className="flex items-start gap-6">
              <div className={`flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br ${getStatusColor(module.status)} flex items-center justify-center text-4xl shadow-lg`}>
                {getStatusIcon(module.status)}
              </div>

              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-white">{module.title}</h3>
                  <span className="text-purple-300 text-sm">⏱ {module.duration}</span>
                </div>

                <p className="text-purple-200 mb-4">{module.description}</p>

                {module.status === 'in-progress' && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-purple-300 mb-1">
                      <span>Progress</span>
                      <span>{module.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full transition-all"
                        style={{ width: `${module.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {module.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-500 bg-opacity-30 rounded-full text-purple-200 text-sm border border-purple-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Starting module: ${module.title}`);
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  {module.status === 'completed'
                    ? 'Review'
                    : module.status === 'in-progress'
                    ? 'Continue'
                    : 'Start Learning'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
