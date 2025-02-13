import React from 'react'

const Skills = () => {
  return (
    <div
    className={`min-h-screen w-full items-center py-24 opacity-100 animate-slideInRight`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-8">Технологии</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[
          'React',
          'Next.js',
          'TypeScript',
          'Node.js',
          'Tailwind',
          'GraphQL',
          'PostgreSQL',
          'AWS',
        ].map((skill, index) => (
          <div
            key={skill}
            className={`p-4 bg-white/60 dark:bg-black/60 backdrop-blur-md text-black dark:text-white rounded-lg text-center shadow-sm opacity-100 hover:animate-wiggle animate-scaleUp`}
            style={{ animationDelay: `${index * 0.15}s` }}>
            {skill}
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default Skills