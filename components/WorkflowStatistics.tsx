import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WorkflowStatisticsProps {
  workflows: any[]; // Replace with your Workflow type
}

export default function WorkflowStatistics({ workflows }: WorkflowStatisticsProps) {
  const totalWorkflows = workflows.length;
  const totalSteps = workflows.reduce((sum, workflow) => sum + workflow.steps.length, 0);
  const averageSteps = totalWorkflows > 0 ? (totalSteps / totalWorkflows).toFixed(1) : 0;
  const mostComplexWorkflow = workflows.reduce((max, workflow) => 
    workflow.steps.length > max.steps.length ? workflow : max
  , { name: 'None', steps: [] });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Workflows</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalWorkflows}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalSteps}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Steps per Workflow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageSteps}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Most Complex Workflow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mostComplexWorkflow.name}</div>
          <p className="text-xs text-muted-foreground">
            {mostComplexWorkflow.steps.length} steps
          </p>
        </CardContent>
      </Card>
    </div>
  );
}