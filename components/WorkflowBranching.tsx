import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Workflow, Step } from './WorkflowDashboard';
import { GitBranch } from 'lucide-react';

interface WorkflowBranchingProps {
  workflow: Workflow;
  updateWorkflow: (updatedWorkflow: Workflow) => void;
}

export default function WorkflowBranching({ workflow, updateWorkflow }: WorkflowBranchingProps) {
  const addBranch = () => {
    const newStep: Step = {
      id: `step-${Date.now()}`,
      type: 'switch',
      switchCases: [
        { case: 'Default', steps: [] }
      ],
      description: 'New branch',
    };
    updateWorkflow({
      ...workflow,
      steps: [...workflow.steps, newStep]
    });
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center">
          <GitBranch className="mr-2" /> Workflow Branching
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={addBranch}>Add Branch</Button>
      </CardContent>
    </Card>
  );
}