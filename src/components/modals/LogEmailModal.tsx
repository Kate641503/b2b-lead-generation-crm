import React, { useState, useEffect } from 'react';
import { X, Send, Mail, CheckCircle2, Sparkles, Clock, FileText, User } from 'lucide-react';
import { Lead, EmailTemplate, VASettings, PipelineStage } from '../../types';
import { useToast } from '../Toast';

interface LogEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  leads: Lead[];
  templates: EmailTemplate[];
  settings: VASettings;
  initialTemplate?: EmailTemplate | null;
  onLogEmailSuccess: (leadId: string, activityDescription: string, updatedStage?: PipelineStage) => void;
}

export const LogEmailModal: React.FC<LogEmailModalProps> = ({
  isOpen,
  onClose,
  lead,
  leads = [],
  templates = [],
  settings,
  initialTemplate,
  onLogEmailSuccess,
}) => {
  const { showToast } = useToast();
  const [selectedLeadId, setSelectedLeadId] = useState<string>(lead?.id || leads[0]?.id || '');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(initialTemplate?.id || templates[0]?.id || '');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [notes, setNotes] = useState('');
  const [stageAfterSend, setStageAfterSend] = useState<PipelineStage>('Follow-Up');

  const currentLead = leads.find((l) => l.id === selectedLeadId) || lead || leads[0];
  const currentTemplate = templates.find((t) => t.id === selectedTemplateId) || templates[0];

  useEffect(() => {
    if (lead) {
      setSelectedLeadId(lead.id);
    }
  }, [lead]);

  useEffect(() => {
    if (initialTemplate) {
      setSelectedTemplateId(initialTemplate.id);
    }
  }, [initialTemplate]);

  useEffect(() => {
    if (currentLead && currentTemplate) {
      const firstName = currentLead.name ? currentLead.name.split(' ')[0] : 'Prospect';
      const company = currentLead.company || 'Company';
      const industry = currentLead.industry || 'Industry';
      const sig = settings?.emailSignature || 'Best regards,\nCatherine Ngina';

      const populatedSubject = (currentTemplate.subject || '')
        .replace(/{{Company}}/g, company)
        .replace(/{{FirstName}}/g, firstName)
        .replace(/{{MeetingDate}}/g, 'Aug 28, 2026');

      const populatedBody = (currentTemplate.body || '')
        .replace(/{{FirstName}}/g, firstName)
        .replace(/{{Company}}/g, company)
        .replace(/{{Industry}}/g, industry)
        .replace(/{{MeetingDate}}/g, 'Aug 28, 2026')
        .replace(/{{MeetingTime}}/g, '11:00 AM')
        .replace(/{{Timezone}}/g, 'EST')
        .replace(/{{MeetingLink}}/g, 'meet.google.com/demo-call')
        .replace(/{{Signature}}/g, sig);

      setSubject(populatedSubject);
      setBody(populatedBody);

      if (currentLead.status === 'New Research' || currentLead.status === 'Qualified') {
        setStageAfterSend('Contacted');
      } else if (currentLead.status === 'Contacted') {
        setStageAfterSend('Follow-Up');
      } else {
        setStageAfterSend(currentLead.status);
      }
    }
  }, [selectedLeadId, selectedTemplateId, currentLead, currentTemplate, settings.emailSignature]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentLead) return;

    const activityDesc = `Sent "${currentTemplate.name}" to ${currentLead.email}. Notes: ${notes || 'Standard touchpoint executed on schedule.'}`;
    onLogEmailSuccess(currentLead.id, activityDesc, stageAfterSend);
    showToast('success', 'Email Logged Successfully', `Outreach touch recorded for ${currentLead.name} at ${currentLead.company}.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        id="log-email-modal"
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-slate-900 text-white rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">Log Outreach Email Touch</h3>
              <p className="text-xs text-slate-400">Record outreach activity & auto-update cadence SLA</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Target Lead */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">Target Prospect</label>
              <select
                value={selectedLeadId}
                onChange={(e) => setSelectedLeadId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                {leads.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name} &bull; {l.company}
                  </option>
                ))}
              </select>
            </div>

            {/* Email Template */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">Choose Template Playbook</label>
              <select
                value={selectedTemplateId}
                onChange={(e) => setSelectedTemplateId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.category})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Subject Line */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">Subject</label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Body */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">Email Body Content</label>
            <textarea
              rows={6}
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px] leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Resulting Stage & Next Step */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Update Pipeline Stage To:</label>
              <select
                value={stageAfterSend}
                onChange={(e) => setStageAfterSend(e.target.value as PipelineStage)}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-slate-900 focus:outline-none"
              >
                <option value="Contacted">Contacted</option>
                <option value="Follow-Up">Follow-Up (In Cadence)</option>
                <option value="Interested">Interested</option>
                <option value="Appointment Booked">Appointment Booked</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Next Automated Touchpoint:</label>
              <div className="flex items-center gap-1.5 text-xs text-indigo-900 font-bold bg-indigo-50 px-2.5 py-1.5 rounded-lg border border-indigo-100">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                <span>+3 Business Days (Aug 30, 2026)</span>
              </div>
            </div>
          </div>

          {/* Quick Notes */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">Internal VA Notes (Optional)</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Sent via HubSpot sequences, prospect opened previous mail."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Record & Log Email</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
