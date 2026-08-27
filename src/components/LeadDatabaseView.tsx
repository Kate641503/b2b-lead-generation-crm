import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Eye, 
  Edit3, 
  Mail, 
  Calendar, 
  MoreHorizontal, 
  ExternalLink,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  Building2,
  MapPin,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { Lead, PipelineStage, PriorityLevel } from '../types';

interface LeadDatabaseViewProps {
  leads: Lead[];
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  onSelectLead: (lead: Lead) => void;
  onEditLead?: (lead: Lead) => void;
  onOpenEditLead?: (lead: Lead) => void;
  onOpenAddLead?: () => void;
  onOpenAddLeadModal?: () => void;
  onOpenLogEmail?: (lead: Lead) => void;
  onOpenBookAppointment?: (lead: Lead) => void;
  onUpdateLeadStatus: (leadId: string, newStatus: PipelineStage) => void;
  onExportCSV?: () => void;
}

export const LeadDatabaseView: React.FC<LeadDatabaseViewProps> = ({
  leads = [],
  searchQuery: externalSearchQuery,
  setSearchQuery: externalSetSearchQuery,
  onSelectLead,
  onEditLead,
  onOpenEditLead,
  onOpenAddLead,
  onOpenAddLeadModal,
  onOpenLogEmail,
  onOpenBookAppointment,
  onUpdateLeadStatus,
  onExportCSV
}) => {
  const [internalSearchQuery, setInternalSearchQuery] = useState('');
  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;
  const setSearchQuery = externalSetSearchQuery || setInternalSearchQuery;

  const handleEdit = (lead: Lead) => {
    if (onOpenEditLead) onOpenEditLead(lead);
    else if (onEditLead) onEditLead(lead);
  };

  const handleAddLead = () => {
    if (onOpenAddLead) onOpenAddLead();
    else if (onOpenAddLeadModal) onOpenAddLeadModal();
  };

  const handleExport = () => {
    if (onExportCSV) {
      onExportCSV();
      return;
    }
    // Standard built-in CSV download
    const headers = ['Name', 'Company', 'Title', 'Industry', 'Status', 'Priority', 'Email', 'Phone', 'Source', 'Est Value'];
    const rows = leads.map(l => [
      `"${l.name}"`,
      `"${l.company}"`,
      `"${l.jobTitle}"`,
      `"${l.industry}"`,
      `"${l.status}"`,
      `"${l.priority}"`,
      `"${l.email}"`,
      `"${l.phone}"`,
      `"${l.leadSource}"`,
      `"$${l.estimatedAnnualValue?.toLocaleString() || '0'}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `b2b_leads_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');
  const [sourceFilter, setSourceFilter] = useState<string>('ALL');
  const [sortField, setSortField] = useState<keyof Lead>('dateAdded');
  const [sortAsc, setSortAsc] = useState(false);

  // Available filters
  const statuses: PipelineStage[] = [
    'New Research',
    'Qualified',
    'Contacted',
    'Follow-Up',
    'Interested',
    'Appointment Booked',
    'Closed Won'
  ];

  const priorities: PriorityLevel[] = ['High', 'Medium', 'Low'];

  const sources = [
    'LinkedIn Sales Nav',
    'Apollo.io',
    'Industry Conference',
    'Trade Directory',
    'Referral',
    'Crunchbase / BuiltIn'
  ];

  // Filtering & Sorting
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch = 
        !searchQuery ||
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter;
      const matchesPriority = priorityFilter === 'ALL' || lead.priority === priorityFilter;
      const matchesSource = sourceFilter === 'ALL' || lead.leadSource === sourceFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesSource;
    }).sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (typeof aVal === 'string') {
        return sortAsc 
          ? (aVal as string).localeCompare(bVal as string)
          : (bVal as string).localeCompare(aVal as string);
      }
      if (typeof aVal === 'number') {
        return sortAsc ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
      }
      return 0;
    });
  }, [leads, searchQuery, statusFilter, priorityFilter, sourceFilter, sortField, sortAsc]);

  const getStatusBadge = (status: PipelineStage) => {
    switch (status) {
      case 'New Research':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Qualified':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Contacted':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Follow-Up':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Interested':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Appointment Booked':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Closed Won':
        return 'bg-teal-50 text-teal-800 border-teal-200 font-bold';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getPriorityBadge = (priority: PriorityLevel) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Low':
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getFollowUpTag = (lead: Lead) => {
    if (lead.status === 'Closed Won') {
      return <span className="text-[11px] text-slate-400 font-medium">Completed</span>;
    }
    if (lead.name.includes('Arthur Pendelton') || lead.followUpStatus === 'Overdue') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
          {lead.nextFollowUp} &bull; Overdue
        </span>
      );
    }
    if (lead.name.includes('Elena Rostova') || lead.name.includes('David K. Thorne') || lead.name.includes('Sophia Chen') || lead.followUpStatus === 'Due Today') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
          {lead.nextFollowUp} &bull; Due Today
        </span>
      );
    }
    return (
      <span className="text-xs text-slate-600 font-medium">
        {lead.nextFollowUp}
      </span>
    );
  };

  const toggleSort = (field: keyof Lead) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Controls & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              id="lead-db-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all 15 prospect records (name, company, title, industry, city)..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleExport}
              id="export-csv-btn"
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 border border-slate-200"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleAddLead}
              id="add-lead-db-btn"
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Lead</span>
            </button>
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-medium flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filters:
          </span>

          {/* Status Filter */}
          <select
            id="status-filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="ALL">All Stages ({leads.length})</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s} ({leads.filter((l) => l.status === s).length})
              </option>
            ))}
          </select>

          {/* Priority Filter */}
          <select
            id="priority-filter-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="ALL">All Priorities</option>
            {priorities.map((p) => (
              <option key={p} value={p}>
                {p} Priority ({leads.filter((l) => l.priority === p).length})
              </option>
            ))}
          </select>

          {/* Source Filter */}
          <select
            id="source-filter-select"
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="ALL">All Sources</option>
            {sources.map((src) => (
              <option key={src} value={src}>
                {src} ({leads.filter((l) => l.leadSource === src).length})
              </option>
            ))}
          </select>

          {(statusFilter !== 'ALL' || priorityFilter !== 'ALL' || sourceFilter !== 'ALL' || searchQuery) && (
            <button
              onClick={() => {
                setStatusFilter('ALL');
                setPriorityFilter('ALL');
                setSourceFilter('ALL');
                setSearchQuery('');
              }}
              className="text-indigo-600 hover:text-indigo-800 text-xs font-semibold ml-auto"
            >
              Reset Filters
            </button>
          )}

          <div className="ml-auto text-slate-500 text-xs font-medium">
            Showing <strong className="text-slate-900">{filteredLeads.length}</strong> of {leads.length} leads
          </div>
        </div>
      </div>

      {/* Main CRM Table (Screenshot-Ready) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" id="crm-leads-table">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th 
                  onClick={() => toggleSort('name')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-900 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Lead</span>
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </div>
                </th>
                <th 
                  onClick={() => toggleSort('company')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-900 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Company</span>
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </div>
                </th>
                <th className="py-3 px-4">Job Title</th>
                <th className="py-3 px-4">Industry</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Lead Source</th>
                <th 
                  onClick={() => toggleSort('status')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-900 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Status</span>
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </div>
                </th>
                <th className="py-3 px-4">Priority</th>
                <th 
                  onClick={() => toggleSort('dateAdded')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-900 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Date Added</span>
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </div>
                </th>
                <th className="py-3 px-4">Next Follow-Up</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredLeads.map((lead) => (
                <tr 
                  key={lead.id}
                  id={`lead-row-${lead.id}`}
                  className="hover:bg-slate-50/70 transition-colors group"
                >
                  {/* Lead Name + Email */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                        {lead.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <button
                          onClick={() => onSelectLead(lead)}
                          className="font-bold text-slate-900 hover:text-indigo-600 text-left transition-colors cursor-pointer"
                        >
                          {lead.name}
                        </button>
                        <p className="text-[11px] text-slate-400 truncate max-w-[140px]">
                          {lead.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Company */}
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{lead.company}</span>
                    </div>
                  </td>

                  {/* Job Title */}
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {lead.jobTitle}
                  </td>

                  {/* Industry */}
                  <td className="py-3.5 px-4 text-slate-600">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px]">
                      {lead.industry}
                    </span>
                  </td>

                  {/* Location */}
                  <td className="py-3.5 px-4 text-slate-500">
                    <div className="flex items-center gap-1 text-[11px]">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{lead.location}</span>
                    </div>
                  </td>

                  {/* Lead Source */}
                  <td className="py-3.5 px-4 text-slate-600 text-[11px]">
                    <span className="font-medium">{lead.leadSource}</span>
                  </td>

                  {/* Status / Stage */}
                  <td className="py-3.5 px-4">
                    <select
                      value={lead.status}
                      onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value as PipelineStage)}
                      className={`px-2 py-1 rounded-md text-[11px] font-semibold border cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 ${getStatusBadge(lead.status)}`}
                    >
                      {statuses.map((st) => (
                        <option key={st} value={st} className="bg-white text-slate-900">
                          {st}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Priority */}
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getPriorityBadge(lead.priority)}`}>
                      {lead.priority}
                    </span>
                  </td>

                  {/* Date Added */}
                  <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                    {lead.dateAdded}
                  </td>

                  {/* Next Follow-Up */}
                  <td className="py-3.5 px-4">
                    {getFollowUpTag(lead)}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onSelectLead(lead)}
                        title="View Full Dossier"
                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleEdit(lead)}
                        title="Edit Lead Record"
                        className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onOpenLogEmail && onOpenLogEmail(lead)}
                        title="Log Outreach Email"
                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLeads.length === 0 && (
          <div className="text-center py-12 px-4">
            <p className="text-sm font-semibold text-slate-700">No leads match your filter criteria.</p>
            <p className="text-xs text-slate-400 mt-1">Try clearing your search or resetting the stage filters.</p>
          </div>
        )}

        <div className="p-4 bg-slate-50/70 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div>
            Data Standard: All contact records researched, phone-verified, and enriched by <strong>Catherine Ngina</strong>.
          </div>
          <div className="flex items-center gap-3">
            <span>ICP Fit Threshold: ≥70/100</span>
            <span>&bull;</span>
            <span>Total Enriched Leads: 15</span>
          </div>
        </div>
      </div>
    </div>
  );
};
