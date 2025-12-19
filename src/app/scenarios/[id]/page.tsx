'use client';

import { useParams } from 'next/navigation';
import { getScenarioById } from '@/lib/scenarioData';
import { ScenarioRunner } from '@/components/scenarios/ScenarioRunner';
import Link from 'next/link';

export default function ScenarioPage() {
  const params = useParams();
  const id = params.id as string;
  const scenario = getScenarioById(id);

  if (!scenario) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-3xl font-bold mb-2">Scenario Not Found</h1>
          <p className="text-base-content/70 mb-6">
            The scenario you're looking for doesn't exist.
          </p>
          <Link href="/scenarios" className="btn btn-primary">
            Back to Scenarios
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-6">
        <Link
          href="/scenarios"
          className="btn btn-ghost btn-sm gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Scenarios
        </Link>
      </div>

      <ScenarioRunner scenario={scenario} />
    </div>
  );
}
