'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SCENARIOS } from '@/lib/scenarioData';

export default function ScenariosPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Pre-Built Scenarios</h1>
        <p className="text-base-content/70 text-lg">
          Explore realistic examples of how context windows work in practice
        </p>
      </div>

      {/* Scenarios Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SCENARIOS.map((scenario, index) => {
          const difficultyColors = {
            beginner: 'success',
            intermediate: 'warning',
            advanced: 'error',
          };

          return (
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/scenarios/${scenario.id}`}>
                <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow cursor-pointer h-full">
                  <div className="card-body">
                    <div className="text-5xl mb-3">{scenario.icon}</div>
                    <h2 className="card-title">{scenario.title}</h2>
                    <p className="text-sm text-base-content/70 flex-grow">
                      {scenario.description}
                    </p>

                    <div className="card-actions justify-between items-center mt-4">
                      <div
                        className={`badge badge-${difficultyColors[scenario.difficulty]}`}
                      >
                        {scenario.difficulty}
                      </div>
                      <span className="text-xs text-base-content/50">
                        ~{scenario.estimatedMinutes} min
                      </span>
                    </div>

                    <div className="mt-4">
                      <p className="text-xs font-semibold mb-2">
                        You'll learn:
                      </p>
                      <ul className="text-xs space-y-1">
                        {scenario.learningObjectives
                          .slice(0, 2)
                          .map((obj, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-success">✓</span>
                              <span>{obj}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <p className="text-base-content/70 mb-4">
          Ready to experiment on your own?
        </p>
        <Link href="/sandbox" className="btn btn-primary btn-wide">
          Open Sandbox Mode
        </Link>
      </div>
    </div>
  );
}
