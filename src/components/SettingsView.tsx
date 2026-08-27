import React, { useState } from 'react';
import { 
  Save, 
  RotateCcw, 
  Check, 
  User, 
  Mail, 
  Clock, 
  Bell, 
  ShieldCheck, 
  Sparkles,
  Info,
  CheckCircle2
} from 'lucide-react';
import { VASettings } from '../types';
import { useToast } from './Toast';

interface SettingsViewProps {
  settings: VASettings;
  onSaveSettings: (newSettings: VASettings) => void;
  onResetData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onSaveSettings,
  onResetData,
}) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<VASettings>(settings);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setSaved(true);
    showToast('success', 'Settings Saved', 'VA configurations and email signature have been updated.');
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      {/* Settings Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campaign & VA Profile */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold font-display text-slate-900">
                Campaign & Virtual Assistant Profile
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Core portfolio identity and administrative ownership
              </p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Active Operator
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Campaign Name
              </label>
              <input
                type="text"
                value={formData.campaignName}
                onChange={(e) => setFormData({ ...formData, campaignName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Assigned Virtual Assistant
              </label>
              <input
                type="text"
                value={formData.assignedVA}
                onChange={(e) => setFormData({ ...formData, assignedVA: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Professional Role / Specialization
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Default Follow-Up Cadence SLA
              </label>
              <input
                type="text"
                value={formData.defaultCadence}
                onChange={(e) => setFormData({ ...formData, defaultCadence: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>
        </div>

        {/* Email Signature */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold font-display text-slate-900">
              Professional Email Signature
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Appended automatically to all cold outreach emails and follow-up templates
            </p>
          </div>

          <div>
            <textarea
              rows={5}
              value={formData.emailSignature}
              onChange={(e) => setFormData({ ...formData, emailSignature: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 leading-relaxed"
            />
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold font-display text-slate-900">
              Workflow Notification Preferences
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Automated reminders and priority queue alerts
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/60 cursor-pointer">
              <div>
                <span className="font-bold text-slate-900 block">Overdue Follow-Up Alerts</span>
                <span className="text-slate-500 text-[11px]">Notify when an outreach touch exceeds 3 business days.</span>
              </div>
              <input
                type="checkbox"
                checked={formData.notificationPreferences.overdueAlerts}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    notificationPreferences: {
                      ...formData.notificationPreferences,
                      overdueAlerts: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/60 cursor-pointer">
              <div>
                <span className="font-bold text-slate-900 block">Appointment Reminders</span>
                <span className="text-slate-500 text-[11px]">Send pre-call reminder and research briefing 24h prior.</span>
              </div>
              <input
                type="checkbox"
                checked={formData.notificationPreferences.appointmentReminders}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    notificationPreferences: {
                      ...formData.notificationPreferences,
                      appointmentReminders: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/60 cursor-pointer">
              <div>
                <span className="font-bold text-slate-900 block">Daily Morning Operational Digest</span>
                <span className="text-slate-500 text-[11px]">Summary of today&apos;s calls, priority follow-ups, and new leads.</span>
              </div>
              <input
                type="checkbox"
                checked={formData.notificationPreferences.dailyDigest}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    notificationPreferences: {
                      ...formData.notificationPreferences,
                      dailyDigest: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
            </label>
          </div>
        </div>

        {/* Save & Reset Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={onResetData}
            id="reset-demo-data-btn"
            className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 border border-slate-200"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data to Initial State</span>
          </button>

          <button
            type="submit"
            id="save-settings-btn"
            className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Saved Successfully</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
