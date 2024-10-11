import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Workflow } from './WorkflowDashboard';

interface WorkflowComparisonProps {
  workflow: Workflow;
  workflows: Workflow[];
}

export default function WorkflowComparison({ workflow, workflows }: WorkflowComparisonProps) {
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string | null>(null);

  const compareWorkflows = () => {
    if (!selectedWorkflowId) return;

    const selectedWorkflow = workflows.find(w => w.id === selectedWorkflowId);
    if (!selectedWorkflow) return;

    // Implement comparison logic here
    const differences = {
      stepCount: Math.abs(workflow.steps.length - selectedWorkflow.steps.length),
      // Add more comparison metrics as needed
    };

    // You can display the differences in a more user-friendly way
    alert(`Differences:\nStep Count: ${differences.stepCount}`);
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Workflow Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <Select onValueChange={setSelectedWorkflowId}>
          <SelectTrigger>
            <SelectValue placeholder="Select a workflow to compare" />
          </SelectTrigger>
          <SelectContent>
            {workflows.filter(w => w.id !== workflow.id).map(w => (
              <SelectItem key={w.id} value={w.id}>{w.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={compareWorkflows} className="mt-2" disabled={!selectedWorkflowId}>
          Compare Workflows
        </Button>
      </CardContent>
    </Card>
  );
}