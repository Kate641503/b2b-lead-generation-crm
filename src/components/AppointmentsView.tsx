import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Video, 
  Users, 
  Building2, 
  Plus, 
  CheckCircle2, 
  FileText, 
  ChevronRight, 
  ExternalLink,
  MapPin,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { Appointment, Lead } from '../types';

interface AppointmentsViewProps {
  appointments: Appointment[];
  leads: Lead[];
  onOpenBookAppointment: (lead?: Lead) => void;
  onSelectLeadById: (leadId: string) => void;
}

export const AppointmentsView: React.FC<AppointmentsViewProps> = ({
  appointments = [],
  leads = [],
  onOpenBookAppointment,
  onSelectLeadById,
}) => {
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string>(appointments[0]?.id || '');
  const activeAppointment = appointments.find((a) => a.id === selectedAppointmentId) || appointments[0] || ({} as Appointment);

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold font-display text-slate-900">
              Executive Calendar & Appointment Setting
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {appointments.length} Confirmed Discovery Sessions
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Booked & coordinated by <strong>Catherine Ngina</strong> &bull; Complete with pre-meeting research briefs
          </p>
        </div>

        <button
          onClick={() => onOpenBookAppointment()}
          id="book-appointment-btn"
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Book New Discovery Call</span>
        </button>
      </div>

      {/* Main Grid: Appointment Cards + Selected Meeting Dossier Brief */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Scheduled Meetings List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Confirmed Appointment Schedule
          </div>

          {appointments.map((apt) => {
            const isSelected = apt.id === activeAppointment?.id;
            return (
              <div
                key={apt.id}
                id={`appointment-card-${apt.id}`}
                onClick={() => setSelectedAppointmentId(apt.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer shadow-2xs ${
                  isSelected
                    ? 'bg-white border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                    : 'bg-white border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {apt.meetingType}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{apt.duration}</span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 mt-2">
                  {apt.prospectName}
                </h4>

                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium mt-0.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{apt.company}</span>
                </div>

                <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-indigo-950">
                    <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{apt.meetingDate} &bull; {apt.time} {apt.timezone}</span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-semibold">
                    {apt.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Pre-Meeting Dossier & Agenda (7 cols) */}
        {activeAppointment && (
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Pre-Meeting Briefing Sheet
                </span>
                <h3 className="text-lg font-bold font-display text-slate-900 mt-1">
                  {activeAppointment.prospectName} &mdash; {activeAppointment.company}
                </h3>
                <p className="text-xs text-slate-500">
                  {activeAppointment.meetingType} ({activeAppointment.duration})
                </p>
              </div>

              <div className="text-right">
                <div className="text-xs font-bold text-indigo-950">
                  {activeAppointment.meetingDate}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  {activeAppointment.time} {activeAppointment.timezone}
                </div>
              </div>
            </div>

            {/* Quick Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Virtual Room / Location
                </span>
                <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <Video className="w-4 h-4 text-indigo-600" />
                  <span className="truncate">{activeAppointment.location}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Status & Preparation
                </span>
                <div className="flex items-center gap-1.5 font-semibold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Calendar Invite Sent & Accepted</span>
                </div>
              </div>
            </div>

            {/* Attendees */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Confirmed Attendees
              </label>
              <div className="flex flex-wrap gap-2">
                {activeAppointment.attendees.map((att, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200/80 flex items-center gap-1.5"
                  >
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    {att}
                  </span>
                ))}
              </div>
            </div>

            {/* Meeting Goals */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Meeting Objectives & Target Discovery Scope
              </label>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-800 leading-relaxed font-medium">
                {activeAppointment.meetingGoals}
              </div>
            </div>

            {/* VA Preparation Notes */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                VA Research Brief (Prepared by Catherine Ngina)
              </label>
              <div className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-100 text-xs text-indigo-950 leading-relaxed font-medium">
                {activeAppointment.preparationNotes}
              </div>
            </div>

            {/* Footer Action */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => onSelectLeadById(activeAppointment.leadId)}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>Inspect Full Lead CRM Profile</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <span className="text-[11px] text-slate-400">
                Auto-reminder sent 24h prior to call
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
