import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Share2 } from 'lucide-react';

interface WorkflowSharingProps {
  workflowId: string;
}

export default function WorkflowSharing({ workflowId }: WorkflowSharingProps) {
  const [shareLink, setShareLink] = useState('');

  const generateShareLink = () => {
    // In a real application, you would generate a unique link or token
    const link = `https://yourapp.com/shared-workflow/${workflowId}`;
    setShareLink(link);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    // You might want to show a toast notification here
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Share Workflow</h3>
      <div className="flex space-x-2">
        <Button onClick={generateShareLink} variant="outline">
          <Share2 className="h-4 w-4 mr-1" /> Generate Share Link
        </Button>
        {shareLink && (
          <>
            <Input value={shareLink} readOnly className="flex-grow" />
            <Button onClick={copyToClipboard}>Copy</Button>
          </>
        )}
      </div>
    </div>
  );
}