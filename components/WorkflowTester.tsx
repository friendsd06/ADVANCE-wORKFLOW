import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlayCircle } from 'lucide-react';

interface WorkflowTesterProps {
  steps: any[]; // Replace with your Step type
}

export default function WorkflowTester({ steps }: WorkflowTesterProps) {
  const [testInput, setTestInput] = useState('');
  const [testResults, setTestResults] = useState<string[]>([]);

  const runTest = () => {
    const results: string[] = [];
    let currentInput = testInput;

    steps.forEach((step, index) => {
      if (step.type === 'action') {
        results.push(`Step ${index + 1}: Executed ${step.actionType}`);
        // Simulate action execution
        currentInput = `${currentInput}-${step.actionType}`;
      } else if (step.type === 'condition') {
        const conditionMet = Math.random() < 0.5; // Simulate condition check
        results.push(`Step ${index + 1}: Condition ${conditionMet ? 'met' : 'not met'}`);
        if (conditionMet) {
          currentInput = `${currentInput}-true`;
        } else {
          currentInput = `${currentInput}-false`;
        }
      }
    });

    results.push(`Final output: ${currentInput}`);
    setTestResults(results);
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Workflow Tester</h3>
      <div className="flex space-x-2 mb-2">
        <Input
          value={testInput}
          onChange={(e) => setTestInput(e.target.value)}
          placeholder="Enter test input"
          className="flex-grow"
        />
        <Button onClick={runTest} variant="secondary">
          <PlayCircle className="h-4 w-4 mr-1" /> Run Test
        </Button>
      </div>
      {testResults.length > 0 && (
        <div className="bg-gray-100 p-2 rounded">
          <h4 className="font-semibold mb-1">Test Results:</h4>
          <ul className="list-disc pl-4">
            {testResults.map((result, index) => (
              <li key={index} className="text-sm">{result}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}