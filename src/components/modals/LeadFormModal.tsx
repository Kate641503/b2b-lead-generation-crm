import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Building2, User, Mail, Phone, MapPin, Tag, DollarSign, Sparkles } from 'lucide-react';
import { Lead, PipelineStage, PriorityLevel, FollowUpStatus } from '../../types';
import { useToast } from '../Toast';

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (lead: Lead) => void;
  initialLead?: Lead | null;
}

export const LeadFormModal: React.FC<LeadFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialLead,
}) => {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [industry, setIndustry] = useState('B2B SaaS & Tech');
  const [location, setLocation] = useState('');
  const [leadSource, setLeadSource] = useState<'LinkedIn Sales Nav' | 'Apollo.io' | 'Industry Conference' | 'Trade Directory' | 'Referral' | 'Crunchbase / BuiltIn'>('LinkedIn Sales Nav');
  const [status, setStatus] = useState<PipelineStage>('New Research');
  const [priority, setPriority] = useState<PriorityLevel>('High');
  const [estimatedAnnualValue, setEstimatedAnnualValue] = useState(25000);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (initialLead) {
      setName(initialLead.name);
      setCompany(initialLead.company);
      setJobTitle(initialLead.jobTitle);
      setIndustry(initialLead.industry);
      setLocation(initialLead.location);
      setLeadSource(initialLead.leadSource);
      setStatus(initialLead.status);
      setPriority(initialLead.priority);
      setEstimatedAnnualValue(initialLead.estimatedAnnualValue);
      setEmail(initialLead.email);
      setPhone(initialLead.phone);
      setNotes(initialLead.notes);
    } else {
      setName('');
      setCompany('');
      setJobTitle('');
      setIndustry('B2B SaaS & Tech');
      setLocation('');
      setLeadSource('LinkedIn Sales Nav');
      setStatus('New Research');
      setPriority('High');
      setEstimatedAnnualValue(25000);
      setEmail('');
      setPhone('');
      setNotes('');
    }
  }, [initialLead, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !company.trim()) {
      showToast('error', 'Required Fields Missing', 'Please provide a contact name and company name.');
      return;
    }

    const newLead: Lead = {
      id: initialLead ? initialLead.id : `lead-${Date.now()}`,
      name,
      company,
      jobTitle: jobTitle || 'Decision Maker',
      industry: industry || 'Enterprise Software',
      location: location || 'Remote / US',
      leadSource,
      status,
      priority,
      dateAdded: initialLead ? initialLead.dateAdded : '2026-08-27',
      nextFollowUp: initialLead ? initialLead.nextFollowUp : '2026-08-30',
      followUpStatus: initialLead ? initialLead.followUpStatus : 'Upcoming',
      followUpNumber: initialLead ? initialLead.followUpNumber : 0,
      lastContact: initialLead ? initialLead.lastContact : '2026-08-27',
      estimatedAnnualValue: Number(estimatedAnnualValue) || 20000,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@${company.toLowerCase().replace(/[^a-z0-9]/g, '')}.demo`,
      phone: phone || '+1 (555) 019-2834',
      linkedInUrl: initialLead?.linkedInUrl || 'https://linkedin.com/in/prospect-demo',
      companySize: initialLead?.companySize || '100 - 250 employees',
      website: initialLead?.website || `https://${company.toLowerCase().replace(/[^a-z0-9]/g, '')}.demo`,
      campaignId: 'camp-01',
      qualificationScore: initialLead?.qualificationScore || 85,
      notes: notes || 'Enriched and added to active pipeline cadence by Catherine Ngina.',
      activities: initialLead?.activities || [
        {
          id: `act-${Date.now()}`,
          type: 'note',
          title: 'Prospect Profile Created',
          description: 'New lead added to Q3 outreach database.',
          timestamp: '2026-08-27 09:00 AM',
          author: 'Catherine Ngina',
        }
      ]
    };

    onSave(newLead);
    showToast('success', initialLead ? 'Lead Updated' : 'Lead Added', `${name} at ${company} has been saved.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        id="lead-form-modal"
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-slate-900 text-white rounded-t-2xl flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold font-display text-white">
              {initialLead ? 'Edit Lead Record' : 'Add New B2B Prospect'}
            </h3>
            <p className="text-xs text-slate-400">
              ICP Verification & Pipeline Entry &bull; Managed by Catherine Ngina
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Lead Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tariq Al-Mansoor"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Company Name *</label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. CyberShield Defenses"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Job Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Head of Information Security"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Industry</label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Cybersecurity, FinTech, HealthTech"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Location / HQ</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Austin, TX"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Lead Source</label>
              <select
                value={leadSource}
                onChange={(e) => setLeadSource(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="LinkedIn Sales Nav">LinkedIn Sales Nav</option>
                <option value="Apollo.io">Apollo.io</option>
                <option value="Industry Conference">Industry Conference</option>
                <option value="Trade Directory">Trade Directory</option>
                <option value="Referral">Referral</option>
                <option value="Crunchbase / BuiltIn">Crunchbase / BuiltIn</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Pipeline Stage</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as PipelineStage)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="New Research">New Research</option>
                <option value="Qualified">Qualified</option>
                <option value="Contacted">Contacted</option>
                <option value="Follow-Up">Follow-Up</option>
                <option value="Interested">Interested</option>
                <option value="Appointment Booked">Appointment Booked</option>
                <option value="Closed Won">Closed Won</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Priority Level</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Estimated Annual Value ($)</label>
              <input
                type="number"
                value={estimatedAnnualValue}
                onChange={(e) => setEstimatedAnnualValue(Number(e.target.value))}
                placeholder="25000"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Contact Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="prospect@company.demo"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Qualification & Account Notes</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="ICP fit details, pain points, recent company expansions..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

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
              <Save className="w-3.5 h-3.5" />
              <span>Save Lead Record</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
