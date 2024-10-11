import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Workflow, Step } from './WorkflowDashboard';
import { Shuffle } from 'lucide-react';

interface WorkflowSimulatorProps {
  workflow: Workflow;
}

export default function WorkflowSimulator({ workflow }: WorkflowSimulatorProps) {
  const [simulationResults, setSimulationResults] = useState<string[]>([]);

  const runSimulation = () => {
    const results: string[] = [];
    simulateSteps(workflow.steps, results);
    setSimulationResults(results);
  };

  const simulateSteps = (steps: Step[], results: string[]) => {
    steps.forEach((step, index) => {
      switch (step.type) {
        case 'action':
          results.push(`Step ${index + 1}: Executed action "${step.action}"`);
          break;
        case 'condition':
          const conditionMet = Math.random() < 0.5;
          results.push(`Step ${index + 1}: Condition "${step.conditions?.join(' AND ')}" ${conditionMet ? 'met' : 'not met'}`);
          break;
        case 'loop':
          results.push(`Step ${index + 1}: Started loop`);
          // Simulate loop execution (simplified)
          simulateSteps(step.steps || [], results);
          results.push(`Step ${index + 1}: Ended loop`);
          break;
        case 'switch':
          const randomCase = step.switchCases?.[Math.floor(Math.random() * step.switchCases.length)];
          results.push(`Step ${index + 1}: Switched to case "${randomCase?.case}"`);
          simulateSteps(randomCase?.steps || [], results);
          break;
        case 'parallel':
          results.push(`Step ${index + 1}: Started parallel execution`);
          step.parallelBranches?.forEach((branch, branchIndex) => {
            results.push(`  Branch ${branchIndex + 1}:`);
            simulateSteps(branch, results);
          });
          results.push(`Step ${index + 1}: Ended parallel execution`);
          break;
      }
    });
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shuffle className="mr-2" /> Workflow Simulator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={runSimulation} className="mb-2">Run Simulation</Button>
        {simulationResults.length > 0 && (
          <div className="bg-gray-100 p-2 rounded">
            <h4 className="font-semibold mb-1">Simulation Results:</h4>
            <ul className="list-disc pl-4">
              {simulationResults.map((result, index) => (
                <li key={index} className="text-sm">{result}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}