import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Download, Upload, Copy, Search, Trash2, Edit, Eye, BarChart2, Share2, Clock, GitBranch, Zap, Layers, Shuffle } from 'lucide-react';
import WorkflowBuilder from './WorkflowBuilder';
import WorkflowTester from './WorkflowTester';
import WorkflowAnalytics from './WorkflowAnalytics';
import WorkflowSharing from './WorkflowSharing';
import WorkflowStatistics from './WorkflowStatistics';
import WorkflowVersioning from './WorkflowVersioning';
import WorkflowExport from './WorkflowExport';
import WorkflowImport from './WorkflowImport';
import WorkflowComparison from './WorkflowComparison';
import WorkflowTemplates from './WorkflowTemplates';
import WorkflowScheduler from './WorkflowScheduler';
import WorkflowBranching from './WorkflowBranching';
import WorkflowOptimizer from './WorkflowOptimizer';
import WorkflowIntegrations from './WorkflowIntegrations';
import WorkflowSimulator from './WorkflowSimulator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export type Operator = 'AND' | 'OR' | 'XOR' | 'NAND' | 'NOR' | 'XNOR' | 'IMPLIES' | 'NOT' |
  'EQUALS' | 'NOT_EQUALS' | 'GREATER_THAN' | 'LESS_THAN' | 'GREATER_THAN_OR_EQUAL' |
  'LESS_THAN_OR_EQUAL' | 'CONTAINS' | 'NOT_CONTAINS' | 'STARTS_WITH' | 'ENDS_WITH' |
  'IS_NULL' | 'IS_NOT_NULL' | 'IN' | 'NOT_IN' | 'MATCHES_REGEX' | 'NOT_MATCHES_REGEX' |
  'IS_EMPTY' | 'IS_NOT_EMPTY' | 'HAS_LENGTH' | 'TYPE_OF' | 'INSTANCE_OF' |
  'IS_TRUTHY' | 'IS_FALSY' | 'BIT_AND' | 'BIT_OR' | 'BIT_XOR';

export interface Step {
  id: string;
  type: 'action' | 'condition' | 'loop' | 'switch' | 'parallel';
  actionType?: string;
  action?: string;
  conditions?: string[];
  operator?: Operator;
  description: string;
  comment?: string;
  loopCondition?: string;
  switchCases?: { case: string; steps: Step[] }[];
  parallelBranches?: Step[][];
  steps?: Step[];
}

export interface Workflow {
  id: string;
  name: string;
  steps: Step[];
  createdAt: Date;
  updatedAt: Date;
  version: number;
  schedule?: string;
  integrations?: string[];
}

export default function WorkflowDashboard() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [activeWorkflow, setActiveWorkflow] = useState<Workflow | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    // Load workflows from localStorage or API
    const savedWorkflows = localStorage.getItem('workflows');
    if (savedWorkflows) {
      setWorkflows(JSON.parse(savedWorkflows));
    }
  }, []);

  useEffect(() => {
    // Save workflows to localStorage
    localStorage.setItem('workflows', JSON.stringify(workflows));
  }, [workflows]);

  const addNewWorkflow = () => {
    const newWorkflow: Workflow = {
      id: `workflow-${Date.now()}`,
      name: 'New Workflow',
      steps: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    };
    setWorkflows([...workflows, newWorkflow]);
    setActiveWorkflow(newWorkflow);
  };

  const updateWorkflow = (updatedWorkflow: Workflow) => {
    const updatedWorkflows = workflows.map(w =>
      w.id === updatedWorkflow.id ? { ...updatedWorkflow, updatedAt: new Date() } : w
    );
    setWorkflows(updatedWorkflows);
    setActiveWorkflow(updatedWorkflow);
  };

  const deleteWorkflow = (id: string) => {
    setWorkflows(workflows.filter(w => w.id !== id));
    if (activeWorkflow?.id === id) {
      setActiveWorkflow(null);
    }
  };

  const filteredWorkflows = workflows
    .filter(w => w.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'date') {
        return b.updatedAt.getTime() - a.updatedAt.getTime();
      }
      return 0;
    });

  return (
    <div className="space-y-4">
      <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
        <CardContent className="p-4">
          <h2 className="text-2xl font-bold mb-4">Workflow Dashboard</h2>
          <div className="flex space-x-2 mb-4">
            <Input
              placeholder="Search workflows..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="date">Sort by Date</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWorkflows.map(workflow => (
              <Card key={workflow.id} className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{workflow.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">Steps: {workflow.steps.length}</p>
                  <p className="text-sm text-gray-500 mb-4">Last updated: {workflow.updatedAt.toLocaleDateString()}</p>
                  <div className="flex space-x-2">
                    <Button onClick={() => setActiveWorkflow(workflow)} size="sm">
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button onClick={() => deleteWorkflow(workflow.id)} size="sm" variant="destructive">
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Workflows</h2>
            <div className="flex space-x-2">
              <Button onClick={addNewWorkflow}>
                <Plus className="h-4 w-4 mr-1" /> New Workflow
              </Button>
              <WorkflowImport setWorkflows={setWorkflows} />
              <WorkflowExport workflows={workflows} />
            </div>
          </div>
          {activeWorkflow && (
            <Tabs defaultValue="builder">
              <TabsList>
                <TabsTrigger value="builder">Builder</TabsTrigger>
                <TabsTrigger value="tester">Tester</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="sharing">Sharing</TabsTrigger>
                <TabsTrigger value="versioning">Versioning</TabsTrigger>
                <TabsTrigger value="comparison">Comparison</TabsTrigger>
                <TabsTrigger value="scheduler">Scheduler</TabsTrigger>
                <TabsTrigger value="branching">Branching</TabsTrigger>
                <TabsTrigger value="optimizer">Optimizer</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
                <TabsTrigger value="simulator">Simulator</TabsTrigger>
              </TabsList>
              <TabsContent value="builder">
                <WorkflowBuilder
                  workflowId={activeWorkflow.id}
                  workflowName={activeWorkflow.name}
                  steps={activeWorkflow.steps}
                  updateSteps={(newSteps) => updateWorkflow({ ...activeWorkflow, steps: newSteps })}
                />
              </TabsContent>
              <TabsContent value="tester">
                <WorkflowTester steps={activeWorkflow.steps} />
              </TabsContent>
              <TabsContent value="analytics">
                <WorkflowAnalytics steps={activeWorkflow.steps} />
              </TabsContent>
              <TabsContent value="sharing">
                <WorkflowSharing workflowId={activeWorkflow.id} />
              </TabsContent>
              <TabsContent value="versioning">
                <WorkflowVersioning workflow={activeWorkflow} setWorkflows={setWorkflows} />
              </TabsContent>
              <TabsContent value="comparison">
                <WorkflowComparison workflow={activeWorkflow} workflows={workflows} />
              </TabsContent>
              <TabsContent value="scheduler">
                <WorkflowScheduler workflow={activeWorkflow} updateWorkflow={updateWorkflow} />
              </TabsContent>
              <TabsContent value="branching">
                <WorkflowBranching workflow={activeWorkflow} updateWorkflow={updateWorkflow} />
              </TabsContent>
              <TabsContent value="optimizer">
                <WorkflowOptimizer workflow={activeWorkflow} updateWorkflow={updateWorkflow} />
              </TabsContent>
              <TabsContent value="integrations">
                <WorkflowIntegrations workflow={activeWorkflow} updateWorkflow={updateWorkflow} />
              </TabsContent>
              <TabsContent value="simulator">
                <WorkflowSimulator workflow={activeWorkflow} />
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>

      <WorkflowStatistics workflows={workflows} />
      <WorkflowTemplates addWorkflow={(workflow) => setWorkflows([...workflows, workflow])} />
    </div>
  );
}