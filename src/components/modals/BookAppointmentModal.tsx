import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Video, Users, CheckCircle2, FileText, Sparkles, Building2 } from 'lucide-react';
import { Lead, Appointment, MeetingType } from '../../types';
import { useToast } from '../Toast';

interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead?: Lead | null;
  leads: Lead[];
  onBookSuccess: (newAppointment: Appointment, leadId: string) => void;
}

export const BookAppointmentModal: React.FC<BookAppointmentModalProps> = ({
  isOpen,
  onClose,
  lead,
  leads = [],
  onBookSuccess,
}) => {
  const { showToast } = useToast();
  const [selectedLeadId, setSelectedLeadId] = useState<string>(lead?.id || leads[0]?.id || '');
  const [meetingDate, setMeetingDate] = useState('Aug 30, 2026');
  const [time, setTime] = useState('11:00 AM');
  const [timezone, setTimezone] = useState('EST');
  const [duration, setDuration] = useState('30 min');
  const [meetingType, setMeetingType] = useState<MeetingType>('Discovery Call');
  const [location, setLocation] = useState('Google Meet (meet.google.com/session-link)');
  const [meetingGoals, setMeetingGoals] = useState('Evaluate prospect operations, present ICP solution brief, and qualify for executive demo.');
  const [preparationNotes, setPreparationNotes] = useState('Researched decision maker background on LinkedIn; compiled 1-page company tech stack summary.');

  const currentLead = leads.find((l) => l.id === selectedLeadId) || lead || leads[0];

  useEffect(() => {
    if (lead) {
      setSelectedLeadId(lead.id);
    }
  }, [lead]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentLead) return;

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      leadId: currentLead.id,
      prospectName: currentLead.name,
      company: currentLead.company,
      meetingDate,
      time,
      timezone,
      duration,
      meetingType,
      status: 'Confirmed',
      location,
      attendees: [`${currentLead.name} (${currentLead.jobTitle})`, 'Catherine Ngina (VA Operations)', 'Senior Account Executive'],
      meetingGoals,
      preparationNotes,
    };

    onBookSuccess(newAppointment, currentLead.id);
    showToast('success', 'Appointment Scheduled', `Meeting booked with ${currentLead.name} at ${currentLead.company} for ${meetingDate}.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        id="book-appointment-modal"
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-emerald-950 text-white rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">Schedule Discovery Call / Demo</h3>
              <p className="text-xs text-emerald-300">Executive Appointment Coordination by Catherine Ngina</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Target Prospect & Company *</label>
            <select
              value={selectedLeadId}
              onChange={(e) => setSelectedLeadId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              {leads.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name} &bull; {l.company} ({l.jobTitle})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Date</label>
              <input
                type="text"
                required
                value={meetingDate}
                onChange={(e) => setMeetingDate(e.target.value)}
                placeholder="e.g. Aug 30, 2026"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Time</label>
              <input
                type="text"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g. 11:00 AM"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Timezone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="EST">EST (Eastern)</option>
                <option value="CST">CST (Central)</option>
                <option value="PST">PST (Pacific)</option>
                <option value="GMT">GMT (London)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Meeting Type</label>
              <select
                value={meetingType}
                onChange={(e) => setMeetingType(e.target.value as MeetingType)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="Discovery Call">Discovery Call (30 min)</option>
                <option value="Product Demo">Product Demo (45 min)</option>
                <option value="Follow-Up Call">Follow-Up Call (30 min)</option>
                <option value="Technical Q&A">Technical Q&A (45 min)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="15 min">15 min (Brief Intro)</option>
                <option value="30 min">30 min (Standard Discovery)</option>
                <option value="45 min">45 min (Solution Demo)</option>
                <option value="60 min">60 min (Full Presentation)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Meeting Platform / Link</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Google Meet (meet.google.com/xyz)"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Meeting Agenda & Target Objectives</label>
            <textarea
              rows={2}
              value={meetingGoals}
              onChange={(e) => setMeetingGoals(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">VA Pre-Call Dossier & Research Brief</label>
            <textarea
              rows={2}
              value={preparationNotes}
              onChange={(e) => setPreparationNotes(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
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
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Confirm & Lock Appointment</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
