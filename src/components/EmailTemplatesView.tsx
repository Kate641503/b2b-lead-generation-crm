import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  FileText, 
  Send, 
  Sparkles, 
  Eye, 
  Clock, 
  Tag, 
  CheckCircle2, 
  User, 
  ChevronRight,
  Lightbulb
} from 'lucide-react';
import { EmailTemplate, Lead, VASettings } from '../types';
import { useToast } from './Toast';

interface EmailTemplatesViewProps {
  templates: EmailTemplate[];
  leads: Lead[];
  settings: VASettings;
  onOpenLogEmailWithTemplate: (template: EmailTemplate, lead?: Lead) => void;
}

export const EmailTemplatesView: React.FC<EmailTemplatesViewProps> = ({
  templates = [],
  leads = [],
  settings,
  onOpenLogEmailWithTemplate,
}) => {
  const { showToast } = useToast();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(templates[0]?.id || '');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewLeadId, setPreviewLeadId] = useState<string>(leads[0]?.id || '');

  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId) || templates[0] || ({} as EmailTemplate);
  const previewLead = leads.find((l) => l.id === previewLeadId) || leads[0] || ({} as Lead);

  const handleCopy = (template: EmailTemplate) => {
    if (!template || !template.body) return;
    const leadFirstName = previewLead?.name ? previewLead.name.split(' ')[0] : 'Prospect';
    const leadCompany = previewLead?.company || 'Your Company';
    const leadIndustry = previewLead?.industry || 'B2B SaaS';
    const signature = settings?.emailSignature || 'Best regards,\nCatherine Ngina';

    // Fill dynamic variables for clipboard copy
    const filledBody = template.body
      .replace(/{{FirstName}}/g, leadFirstName)
      .replace(/{{Company}}/g, leadCompany)
      .replace(/{{Industry}}/g, leadIndustry)
      .replace(/{{MeetingDate}}/g, 'Aug 28, 2026')
      .replace(/{{MeetingTime}}/g, '11:00 AM')
      .replace(/{{Timezone}}/g, 'EST')
      .replace(/{{MeetingLink}}/g, 'meet.google.com/demo-call')
      .replace(/{{Signature}}/g, signature);

    const fullText = `Subject: ${(template.subject || '').replace(/{{Company}}/g, leadCompany).replace(/{{MeetingDate}}/g, 'Aug 28, 2026')}\n\n${filledBody}`;

    navigator.clipboard.writeText(fullText);
    setCopiedId(template.id);
    showToast('success', 'Template Copied to Clipboard', `Copied "${template.name}" populated with ${leadCompany} variables.`);

    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  const renderFilledText = (text: string) => {
    const parts = text
      .replace(/{{FirstName}}/g, `[[${previewLead.name.split(' ')[0]}]]`)
      .replace(/{{Company}}/g, `[[${previewLead.company}]]`)
      .replace(/{{Industry}}/g, `[[${previewLead.industry}]]`)
      .replace(/{{MeetingDate}}/g, `[[Aug 28, 2026]]`)
      .replace(/{{MeetingTime}}/g, `[[11:00 AM]]`)
      .replace(/{{Timezone}}/g, `[[EST]]`)
      .replace(/{{MeetingLink}}/g, `[[meet.google.com/apx-cld-vnc]]`)
      .replace(/{{Signature}}/g, settings.emailSignature);

    return parts.split('\n').map((line, i) => {
      if (line.includes('[[')) {
        const segments = line.split(/(\[\[.*?\]\])/g);
        return (
          <p key={i} className="min-h-[1.25rem] leading-relaxed">
            {segments.map((seg, idx) => {
              if (seg.startsWith('[[') && seg.endsWith(']]')) {
                return (
                  <span key={idx} className="bg-indigo-100 text-indigo-900 font-semibold px-1 py-0.5 rounded text-xs">
                    {seg.slice(2, -2)}
                  </span>
                );
              }
              return seg;
            })}
          </p>
        );
      }
      return (
        <p key={i} className="min-h-[1.25rem] leading-relaxed">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Controls: Lead Preview Switcher */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold font-display text-slate-900">
            Standard Operating Outreach Playbook
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            5 multi-touch templates written and managed by <strong>Catherine Ngina</strong>
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium">Preview with Lead:</span>
          <select
            value={previewLeadId}
            onChange={(e) => setPreviewLeadId(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            {leads.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name} &mdash; {l.company}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Template List + Interactive Preview Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Template Cards List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Outreach Cadence Sequence
          </div>

          {templates.map((tmpl, idx) => {
            const isSelected = tmpl.id === selectedTemplateId;
            return (
              <div
                key={tmpl.id}
                id={`template-item-${tmpl.id}`}
                onClick={() => setSelectedTemplateId(tmpl.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer shadow-2xs ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                    : 'bg-white text-slate-800 border-slate-200/80 hover:border-indigo-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Touch #{idx + 1} &bull; {tmpl.category}
                  </span>
                  <span
                    className={`text-[11px] font-semibold ${
                      isSelected ? 'text-indigo-200' : 'text-slate-400'
                    }`}
                  >
                    {tmpl.openRateEstimate} Open Rate
                  </span>
                </div>

                <h4 className="text-sm font-bold mt-2">
                  {tmpl.name}
                </h4>

                <p
                  className={`text-xs mt-1 line-clamp-2 leading-relaxed ${
                    isSelected ? 'text-indigo-100' : 'text-slate-500'
                  }`}
                >
                  {tmpl.purpose}
                </p>

                <div
                  className={`mt-3 pt-2.5 border-t flex items-center justify-between text-[11px] font-medium ${
                    isSelected ? 'border-indigo-500/50 text-indigo-200' : 'border-slate-100 text-slate-400'
                  }`}
                >
                  <span>CTA: {tmpl.callToAction}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Template Detail & Copy Area (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            {/* Header & Copy Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {selectedTemplate.category}
                  </span>
                  <h3 className="text-lg font-bold font-display text-slate-900">
                    {selectedTemplate.name}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Benchmark: <strong>{selectedTemplate.openRateEstimate}</strong> Open Rate &bull; <strong>{selectedTemplate.replyRateEstimate}</strong> Reply Rate
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(selectedTemplate)}
                  id="copy-template-btn"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shadow-xs"
                >
                  {copiedId === selectedTemplate.id ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Template</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Structured Info Card (Purpose & CTA) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
              <div>
                <span className="font-bold text-slate-700 block mb-1">
                  Purpose / Psychological Angle:
                </span>
                <p className="text-slate-600 leading-relaxed">
                  {selectedTemplate.purpose}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-700 block mb-1">
                  Target Call To Action (CTA):
                </span>
                <p className="text-indigo-900 font-semibold bg-indigo-50/80 p-2 rounded-lg border border-indigo-100">
                  🎯 {selectedTemplate.callToAction}
                </p>
              </div>
            </div>

            {/* Email Subject Line */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Subject Line
              </label>
              <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200 font-medium text-xs text-slate-900 flex items-center justify-between">
                <span>
                  {selectedTemplate.subject
                    .replace(/{{Company}}/g, previewLead.company)
                    .replace(/{{MeetingDate}}/g, 'Aug 28, 2026')}
                </span>
                <span className="text-[10px] text-slate-400 font-normal">
                  Tokens dynamically populated
                </span>
              </div>
            </div>

            {/* Email Body */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Email Body (Populated with {previewLead.name})
                </label>
                <span className="text-[11px] text-indigo-600 font-medium">
                  Highlighted tokens represent live data fields
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/50 border border-slate-200/80 font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
                {renderFilledText(selectedTemplate.body)}
              </div>
            </div>
          </div>

          {/* Quick Action Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Recommended Wait Cadence: <strong>{selectedTemplate.recommendedWaitDays} business days</strong></span>
            </div>

            <button
              onClick={() => onOpenLogEmailWithTemplate(selectedTemplate, previewLead)}
              className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Log this email for {previewLead.name}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
