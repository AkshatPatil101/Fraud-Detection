import React, { useState } from 'react';
import Icon from '@/components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const InvestigationPanel = ({ alert, onClose, onAddNote, onUpdateStatus }) => {
  const [noteText, setNoteText] = useState('');

  const handleAddNote = () => {
    if (noteText?.trim()) {
      onAddNote(alert?.id, noteText);
      setNoteText('');
    }
  };

  const investigationSteps = [
    { id: 1, title: 'Initial Review', completed: true, timestamp: '2025-12-20 09:15 AM' },
    { id: 2, title: 'User Verification', completed: true, timestamp: '2025-12-20 09:30 AM' },
    { id: 3, title: 'Transaction Analysis', completed: false, timestamp: null },
    { id: 4, title: 'Risk Assessment', completed: false, timestamp: null },
    { id: 5, title: 'Final Decision', completed: false, timestamp: null }
  ];

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Icon name="Search" size={20} color="var(--color-accent)" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-foreground">Investigation Panel</h2>
              <p className="text-sm text-muted-foreground">Alert ID: {alert?.id}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" iconName="X" onClick={onClose} />
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">Alert Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Severity:</span>
                  <span className="text-sm font-medium text-foreground">{alert?.severity?.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <span className="text-sm font-medium text-foreground">{alert?.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Risk Score:</span>
                  <span className="text-sm font-medium text-foreground">{alert?.riskScore}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Amount:</span>
                  <span className="text-sm font-medium text-foreground">${alert?.amount?.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">User Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">User ID:</span>
                  <span className="text-sm font-medium text-foreground">{alert?.userId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Location:</span>
                  <span className="text-sm font-medium text-foreground">{alert?.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Device:</span>
                  <span className="text-sm font-medium text-foreground">iPhone 14 Pro</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">IP Address:</span>
                  <span className="text-sm font-medium text-foreground">192.168.1.105</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">Investigation Timeline</h3>
            <div className="space-y-3">
              {investigationSteps?.map((step) => (
                <div key={step?.id} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step?.completed ? 'bg-success/20' : 'bg-muted'
                  }`}>
                    {step?.completed ? (
                      <Icon name="Check" size={16} color="var(--color-success)" />
                    ) : (
                      <span className="text-xs font-medium text-muted-foreground">{step?.id}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      step?.completed ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step?.title}
                    </p>
                    {step?.timestamp && (
                      <p className="text-xs text-muted-foreground">{step?.timestamp}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">Investigation Notes</h3>
            <div className="space-y-3 mb-4">
              {alert?.notes && alert?.notes?.map((note, index) => (
                <div key={index} className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-start gap-3">
                    <Image 
                      src={note?.author?.avatar} 
                      alt={note?.author?.avatarAlt}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-foreground">{note?.author?.name}</p>
                        <span className="text-xs text-muted-foreground">{note?.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{note?.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Add investigation note..."
                value={noteText}
                onChange={(e) => setNoteText(e?.target?.value)}
                className="flex-1"
              />
              <Button 
                variant="default" 
                iconName="Plus" 
                onClick={handleAddNote}
              >
                Add Note
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 p-4 md:p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button 
            variant="warning" 
            iconName="TrendingUp"
            onClick={() => onUpdateStatus(alert?.id, 'escalated')}
          >
            Escalate
          </Button>
          <Button 
            variant="success" 
            iconName="CheckCircle"
            onClick={() => onUpdateStatus(alert?.id, 'resolved')}
          >
            Resolve Alert
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvestigationPanel;