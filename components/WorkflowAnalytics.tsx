import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface WorkflowAnalyticsProps {
  steps: any[]; // Replace with your Step type
}

export default function WorkflowAnalytics({ steps }: WorkflowAnalyticsProps) {
  const actionCount = steps.filter(step => step.type === 'action').length;
  const conditionCount = steps.filter(step => step.type === 'condition').length;

  const data = [
    { name: 'Actions', count: actionCount },
    { name: 'Conditions', count: conditionCount },
  ];

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Workflow Analytics</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-2 text-sm">
        <p>Total Steps: {steps.length}</p>
        <p>Actions: {actionCount}</p>
        <p>Conditions: {conditionCount}</p>
      </div>
    </div>
  );
}