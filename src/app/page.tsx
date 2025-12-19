'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-200px)]">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-6xl lg:text-7xl">🧠</span>
            <br />
            Context Window Simulator
          </h1>
          <p className="text-xl lg:text-2xl text-base-content/70 mb-8">
            Learn how AI models manage their "working memory" through
            interactive visualization
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tutorial" className="btn btn-primary btn-lg">
              Start Tutorial
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <Link href="/sandbox" className="btn btn-outline btn-lg">
              Open Sandbox
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-base-200 py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            What You'll Learn
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card bg-base-100 shadow-lg"
            >
              <div className="card-body items-center text-center">
                <div className="text-5xl mb-4">📊</div>
                <h3 className="card-title">Visualize Context Windows</h3>
                <p className="text-base-content/70">
                  See how AI models manage limited "working memory" with
                  real-time token counting and capacity indicators.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="card bg-base-100 shadow-lg"
            >
              <div className="card-body items-center text-center">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="card-title">Understand Tokens</h3>
                <p className="text-base-content/70">
                  Learn what tokens are, how they're counted, and why
                  they matter for AI interactions.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="card bg-base-100 shadow-lg"
            >
              <div className="card-body items-center text-center">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="card-title">Experience Overflow</h3>
                <p className="text-base-content/70">
                  See what happens when context windows fill up and
                  understand truncation behavior.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="badge badge-primary badge-lg">1</div>
              <div>
                <h3 className="font-bold text-lg mb-2">
                  Start with the Tutorial
                </h3>
                <p className="text-base-content/70">
                  A 4-step guided introduction to context windows, tokens,
                  and capacity limits.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="badge badge-primary badge-lg">2</div>
              <div>
                <h3 className="font-bold text-lg mb-2">
                  Explore Scenarios
                </h3>
                <p className="text-base-content/70">
                  Try pre-built scenarios demonstrating real-world use
                  cases like document analysis and long conversations.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="badge badge-primary badge-lg">3</div>
              <div>
                <h3 className="font-bold text-lg mb-2">
                  Experiment in Sandbox
                </h3>
                <p className="text-base-content/70">
                  Build your own conversations, compare different models,
                  and test your understanding.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/tutorial" className="btn btn-primary btn-wide">
              Get Started Now
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
