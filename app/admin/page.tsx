'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell
} from 'recharts';
import { 
  Lock, 
  Eye, 
  Download, 
  Mail, 
  Trash2, 
  Sparkles, 
  ArrowLeft,
  MousePointerClick,
  CheckCircle2,
  Calendar,
  AlertCircle,
  FileText,
  Save,
  RefreshCw
} from 'lucide-react';
import { analytics } from '@/lib/analytics';

interface LogEntry {
  id: string;
  event: string;
  data: any;
  timestamp: number;
}

interface LocalMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [messages, setMessages] = useState<LocalMessage[]>([]);

  // Database configuration files editor states
  const [activeTab, setActiveTab] = useState<'personal' | 'cs' | 'mechanical'>('personal');
  const [jsonContents, setJsonContents] = useState({
    personal: '',
    cs: '',
    mechanical: ''
  });
  const [saveStatus, setSaveStatus] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Check existing session on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const session = sessionStorage.getItem('admin_authenticated');
      if (session === 'true') {
        setIsAuthenticated(true);
      }
    }
  }, []);

  // Fetch dynamic JSON database configurations from route
  const fetchDatabaseContents = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/data', {
        headers: {
          'Authorization': 'Bearer Ankurwps+119933#Versel/'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setJsonContents({
          personal: JSON.stringify(data.personalData, null, 2),
          cs: JSON.stringify(data.csData, null, 2),
          mechanical: JSON.stringify(data.mechanicalData, null, 2)
        });
      }
    } catch (e) {
      console.error("Failed to fetch database files:", e);
    }
  }, []);

  // Load logs, messages, and configurations from localStorage/API
  const loadData = useCallback(() => {
    if (typeof window !== 'undefined') {
      const localLogs = JSON.parse(localStorage.getItem('portfolio_analytics_logs') || '[]');
      const localMsgs = JSON.parse(localStorage.getItem('portfolio_local_messages') || '[]');
      setLogs(localLogs);
      setMessages(localMsgs);
      fetchDatabaseContents();
    }
  }, [fetchDatabaseContents]);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, loadData]);

  // Handle PIN authentication submit
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === 'Ankurwps+119933#Versel/') { // Secure security gate code
      setIsAuthenticated(true);
      setError('');
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('admin_authenticated', 'true');
      }
    } else {
      setError('Invalid PIN code. Please try again.');
      setPin('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPin('');
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('admin_authenticated');
    }
  };

  // Delete contact message
  const handleDeleteMessage = (id: string) => {
    const updated = messages.filter(msg => msg.id !== id);
    setMessages(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_local_messages', JSON.stringify(updated));
    }
  };

  // Clear analytics logs
  const handleClearLogs = () => {
    if (confirm("Are you sure you want to clear all visitor analytics logs?")) {
      setLogs([]);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('portfolio_analytics_logs');
      }
    }
  };



  // Submit dynamic JSON file edits back to Node API
  const handleSaveJson = async () => {
    const rawContent = jsonContents[activeTab];
    setSaveStatus('');
    setIsSaving(true);

    // 1. Validation syntax check
    try {
      JSON.parse(rawContent);
    } catch (e: any) {
      setSaveStatus('Invalid JSON formatting: ' + e.message);
      setIsSaving(false);
      return;
    }

    // 2. POST to write API route
    try {
      const response = await fetch('/api/admin/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer Ankurwps+119933#Versel/'
        },
        body: JSON.stringify({
          fileKey: activeTab,
          content: rawContent
        })
      });

      const result = await response.json();
      if (response.ok) {
        setSaveStatus(result.message || 'Saved successfully!');
        
        // Client fallback sync
        if (result.simulated) {
          localStorage.setItem(`portfolio_simulated_${activeTab}`, rawContent);
        }
      } else {
        setSaveStatus('Save failed: ' + result.error);
      }
    } catch (err: any) {
      setSaveStatus('Failed to connect to API: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Dynamic statistics calculations
  const stats = useMemo(() => {
    const totalViews = logs.length;
    const csDownloads = logs.filter(l => l.event === 'resume_download' && l.data?.type === 'cs').length;
    const mechDownloads = logs.filter(l => l.event === 'resume_download' && l.data?.type === 'mechanical').length;
    const projectClicks = logs.filter(l => l.event === 'project_demo_click' || l.event === 'project_code_click').length;
    const domainSwitches = logs.filter(l => l.event === 'domain_switch').length;

    let csViewCount = 0;
    let mechViewCount = 0;
    logs.forEach(l => {
      if (l.event === 'project_view' && l.data?.domain === 'cs') csViewCount++;
      if (l.event === 'project_view' && l.data?.domain === 'mechanical') mechViewCount++;
    });

    return {
      totalViews,
      resumeDownloads: { cs: csDownloads, mechanical: mechDownloads, total: csDownloads + mechDownloads },
      projectClicks,
      domainSwitches,
      domainRatio: [
        { name: 'CS Profile Views', value: csViewCount || 1 },
        { name: 'Mech Profile Views', value: mechViewCount || 1 }
      ]
    };
  }, [logs]);

  // Aggregate project clicks
  const projectClicksChartData = useMemo(() => {
    const counts: Record<string, number> = {};
    logs.forEach(l => {
      if (l.event === 'project_demo_click' || l.event === 'project_code_click') {
        const title = l.data?.project || 'Unknown Project';
        counts[title] = (counts[title] || 0) + 1;
      }
    });

    return Object.keys(counts).map(key => ({
      name: key.length > 20 ? key.substring(0, 20) + '...' : key,
      clicks: counts[key]
    }));
  }, [logs]);

  // Login PIN screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
        <div className="max-w-md w-full">
          <Card className="bg-slate-800 border-slate-700 shadow-2xl">
            <CardHeader className="space-y-2 text-center pb-6">
              <div className="w-16 h-16 bg-indigo-600/10 text-indigo-500 rounded-full flex items-center justify-center mx-auto border border-indigo-500/20 mb-2">
                <Lock className="w-8 h-8" />
              </div>
              <CardTitle className="text-2xl font-bold text-white tracking-tight">Admin Portal</CardTitle>
              <CardDescription className="text-slate-400">
                Enter your secure access PIN code to unlock the portfolio analytics dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="password"
                    maxLength={50}
                    placeholder="Enter Security PIN"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white text-center text-lg tracking-widest placeholder:tracking-normal placeholder:text-slate-400 focus:border-indigo-500"
                  />
                  {error && (
                    <p className="text-red-400 text-xs flex items-center justify-center space-x-1 mt-2">
                      <AlertCircle className="w-3.5 h-3.5 mr-1" />
                      <span>{error}</span>
                    </p>
                  )}
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg flex items-center justify-center space-x-2"
                >
                  <span>Authenticate Session</span>
                </Button>
                <div className="text-center pt-2">
                  <a 
                    href="/" 
                    className="text-indigo-400 hover:text-indigo-300 text-sm inline-flex items-center space-x-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Portfolio</span>
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Dashboard layout
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <h1 className="text-3xl font-bold tracking-tight">Portfolio Analytics Suite</h1>
              <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-950/20 font-semibold">
                Session Securely Authenticated
              </Badge>
            </div>
            <p className="text-slate-400 text-sm">
              Real-time insights and metrics generated from visitor interactions with Ankur Salunkhe's portfolio.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">

            <Button 
              variant="outline" 
              className="border-red-500/30 hover:bg-red-950/30 text-red-400"
              onClick={handleClearLogs}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              <span>Reset Logs</span>
            </Button>
            <Button 
              className="bg-slate-800 hover:bg-slate-700 text-white font-semibold"
              onClick={handleLogout}
            >
              <span>Terminate Session</span>
            </Button>
          </div>
        </div>

        {/* Analytics highlights grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total logged actions</p>
                  <h3 className="text-3xl font-bold mt-2 text-white">{stats.totalViews}</h3>
                </div>
                <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-400">
                  <Eye className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 text-slate-400 text-xs">
                Active tracking via Local events + Vercel Analytics.
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Resume Downloads</p>
                  <h3 className="text-3xl font-bold mt-2 text-white">{stats.resumeDownloads.total}</h3>
                </div>
                <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400">
                  <Download className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 text-xs flex justify-between text-slate-400">
                <span>CS: {stats.resumeDownloads.cs} downloads</span>
                <span>Mech: {stats.resumeDownloads.mechanical} downloads</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Project Clicks</p>
                  <h3 className="text-3xl font-bold mt-2 text-white">{stats.projectClicks}</h3>
                </div>
                <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-400">
                  <MousePointerClick className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 text-slate-400 text-xs">
                Demonstrates developer work/code view engagement rate.
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Inbox Inquiries</p>
                  <h3 className="text-3xl font-bold mt-2 text-white">{messages.length}</h3>
                </div>
                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-400">
                  <Mail className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 text-slate-400 text-xs">
                Submissions securely logged via fallback router.
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dynamic CMS File Editor Section 📝 */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row justify-between items-center pb-4 border-b border-slate-800">
            <div>
              <CardTitle className="text-xl font-bold flex items-center space-x-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                <span>JSON Configuration Manager</span>
              </CardTitle>
              <CardDescription className="text-slate-400">
                Update personal-data, cs-data, or mechanical-data JSON profiles instantly without touching any JSX/UI layout code.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            
            {/* Tab selection toolbar */}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant={activeTab === 'personal' ? 'default' : 'outline'}
                onClick={() => { setActiveTab('personal'); setSaveStatus(''); }}
                className={activeTab === 'personal' ? 'bg-indigo-600 hover:bg-indigo-700' : 'border-slate-850'}
              >
                <span>📝 personal-data.json</span>
              </Button>
              <Button
                variant={activeTab === 'cs' ? 'default' : 'outline'}
                onClick={() => { setActiveTab('cs'); setSaveStatus(''); }}
                className={activeTab === 'cs' ? 'bg-indigo-600 hover:bg-indigo-700' : 'border-slate-850'}
              >
                <span>💻 cs-data.json</span>
              </Button>
              <Button
                variant={activeTab === 'mechanical' ? 'default' : 'outline'}
                onClick={() => { setActiveTab('mechanical'); setSaveStatus(''); }}
                className={activeTab === 'mechanical' ? 'bg-indigo-600 hover:bg-indigo-700' : 'border-slate-850'}
              >
                <span>⚙️ mechanical-data.json</span>
              </Button>
              
              <div className="ml-auto flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-slate-800"
                  onClick={fetchDatabaseContents}
                >
                  <RefreshCw className="w-4 h-4 mr-1.5" />
                  <span>Reload Data</span>
                </Button>
              </div>
            </div>

            {/* Code textarea editor */}
            <div className="space-y-4">
              <textarea
                value={jsonContents[activeTab]}
                onChange={(e) => setJsonContents(prev => ({ ...prev, [activeTab]: e.target.value }))}
                rows={18}
                className="w-full bg-slate-950 text-emerald-400 font-mono text-sm leading-relaxed p-5 border border-slate-850 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-600 resize-y"
                placeholder="JSON configuration payload will load here..."
              />

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <Button
                  onClick={handleSaveJson}
                  disabled={isSaving}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center space-x-2 px-6"
                >
                  {isSaving ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>Save Configuration</span>
                </Button>

                {saveStatus && (
                  <p className={`text-xs font-semibold px-3 py-1.5 rounded-lg border ${
                    saveStatus.toLowerCase().includes('failed') || saveStatus.toLowerCase().includes('invalid')
                      ? 'bg-red-950/20 text-red-400 border-red-500/20'
                      : 'bg-emerald-950/20 text-emerald-400 border-emerald-500/20'
                  }`}>
                    {saveStatus}
                  </p>
                )}
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Charts Grids */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Donut Chart: Domain views */}
          <Card className="bg-slate-900 border-slate-800 lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Profile Interest Ratio</CardTitle>
              <CardDescription className="text-slate-400">CS vs Mechanical project views count ratio</CardDescription>
            </CardHeader>
            <CardContent className="h-64 flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.domainRatio}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stats.domainRatio.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <span className="text-xs text-slate-400 uppercase">Switches</span>
                <span className="text-2xl font-bold text-white">{stats.domainSwitches}</span>
              </div>
            </CardContent>
            <div className="px-6 pb-6 flex justify-around text-xs text-slate-400">
              <div className="flex items-center space-x-1.5">
                <div className="w-3 h-3 bg-indigo-600 rounded-full" />
                <span>CS Software</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                <span>Mechanical</span>
              </div>
            </div>
          </Card>

          {/* Bar Chart: Project clicks */}
          <Card className="bg-slate-900 border-slate-800 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Demo & Code Interaction Rates</CardTitle>
              <CardDescription className="text-slate-400">Total demo view & repository link clicks per project</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              {projectClicksChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={projectClicksChartData}>
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                    />
                    <Bar dataKey="clicks" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-2">
                  <MousePointerClick className="w-8 h-8" />
                  <span>No click interaction logs recorded yet.</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Inbox panel messages list */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row justify-between items-center pb-4 border-b border-slate-800">
            <div>
              <CardTitle className="text-xl font-bold flex items-center space-x-2">
                <Mail className="w-5 h-5 text-indigo-400" />
                <span>Local Message Inbox ({messages.length})</span>
              </CardTitle>
              <CardDescription className="text-slate-400">
                Contact submissions stored securely in local simulated database format (No external APIs needed)
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {messages.length > 0 ? (
              <div className="space-y-6">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className="p-5 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all flex flex-col md:flex-row justify-between gap-4"
                  >
                    <div className="space-y-2 max-w-4xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-white text-md">{msg.name}</span>
                        <a 
                          href={`mailto:${msg.email}`} 
                          className="text-xs text-indigo-400 hover:underline flex items-center"
                        >
                          {msg.email}
                        </a>
                        <span className="text-[10px] text-slate-500 flex items-center">
                          <Calendar className="w-3.5 h-3.5 mr-1" />
                          {msg.date}
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                        {msg.message}
                      </p>
                    </div>
                    <div className="flex-shrink-0 flex items-start">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10 focus-ring"
                        onClick={() => handleDeleteMessage(msg.id)}
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-slate-500 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-slate-600" />
                <div className="text-center">
                  <h4 className="font-medium text-white">Your inbox is empty</h4>
                  <p className="text-xs text-slate-500 mt-1">Submissions to your contact form will appear here dynamically.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
