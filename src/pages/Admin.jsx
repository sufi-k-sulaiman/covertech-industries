import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Lock, Users, Mail, Briefcase, Palette, BarChart3,
  Eye, Shield, MessageSquare, Send, CheckCircle2, Loader2, Download
} from 'lucide-react';

const exportToCSV = (rows, filename) => {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const csvContent = [
    headers.join(','),
    ...rows.map(row =>
      headers.map(h => {
        const val = row[h];
        const str = val === null || val === undefined ? '' :
          typeof val === 'object' ? JSON.stringify(val) : String(val);
        return `"${str.replace(/"/g, '""')}"`;
      }).join(',')
    )
  ].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
import SEOHead from '@/components/seo/SEOHead';
import ProductEditDialog from '@/components/admin/ProductEditDialog';
import WarrantyEditDialog from '@/components/admin/WarrantyEditDialog';
import AnalyticsTab from '@/components/admin/AnalyticsTab';

const ADMIN_USERNAME = 'Covertechind';
const ADMIN_PASSWORD = 'CoverHenry2026@1';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingWarranty, setEditingWarranty] = useState(null);
  const [sendingEmail, setSendingEmail] = useState(null); // stores record id
  const [sentEmails, setSentEmails] = useState(new Set());

  const handleResendEmail = async (entityType, record) => {
    setSendingEmail(record.id);
    await base44.functions.invoke('sendFormNotifications', { entityType, entityData: record });
    setSentEmails(prev => new Set([...prev, record.id]));
    setSendingEmail(null);
  };

  // Check if already authenticated
  useEffect(() => {
    const auth = sessionStorage.getItem('admin_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    setUsername('');
    setPassword('');
  };

  // Fetch entities data
  const { data: contacts = [] } = useQuery({
    queryKey: ['contacts'],
    queryFn: () => base44.entities.ContactSubmission.list('-created_date', 100),
    enabled: isAuthenticated
  });

  const { data: dealers = [] } = useQuery({
    queryKey: ['dealers'],
    queryFn: () => base44.entities.DealerApplication.list('-created_date', 100),
    enabled: isAuthenticated
  });

  const { data: designSubmissions = [] } = useQuery({
    queryKey: ['design-submissions'],
    queryFn: () => base44.entities.DesignCenterSubmission.list('-created_date', 100),
    enabled: isAuthenticated
  });

  const { data: warranties = [], refetch: refetchWarranties } = useQuery({
    queryKey: ['warranties'],
    queryFn: () => base44.entities.WarrantyRegistration.list('-created_date', 100),
    enabled: isAuthenticated
  });

  const { data: analyticsRaw = [] } = useQuery({
    queryKey: ['analytics'],
    queryFn: () => base44.entities.Analytics.list('-created_date'),
    enabled: isAuthenticated
  });

  // Filter out admin visits for overview stats
  const analytics = analyticsRaw.filter(a => a.page !== 'Admin' && !a.page?.toLowerCase().includes('admin'));

  const { data: products = [], refetch: refetchProducts } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list('-created_date', 200),
    enabled: isAuthenticated
  });

  const { data: chatConversations = [] } = useQuery({
    queryKey: ['chat-conversations'],
    queryFn: async () => {
      const conversations = await base44.asServiceRole.agents.listConversations({
        agent_name: 'covertech_assistant'
      });
      return conversations || [];
    },
    enabled: isAuthenticated
  });

  const analyticsData = {
    totalViews: analytics.length,
    uniqueSessions: new Set(analytics.map(a => a.session_id).filter(Boolean)).size,
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <>
        <SEOHead title="Admin Login" />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-full bg-cyan-100 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-cyan-600" />
              </div>
              <CardTitle className="text-2xl">Admin Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="mt-1"
                  />
                </div>
                {error && (
                  <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                    {error}
                  </div>
                )}
                <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700">
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  // Dashboard
  return (
    <>
      <SEOHead title="Admin Dashboard" />
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-sm text-slate-600">Contacts</p>
                  <p className="text-2xl font-bold text-slate-900">{contacts.length}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-sm text-slate-600">Dealers</p>
                  <p className="text-2xl font-bold text-slate-900">{dealers.length}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Palette className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-sm text-slate-600">Designs</p>
                  <p className="text-2xl font-bold text-slate-900">{designSubmissions.length}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-orange-600" />
                  </div>
                  <p className="text-sm text-slate-600">Warranties</p>
                  <p className="text-2xl font-bold text-slate-900">{warranties.length}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-cyan-600" />
                  </div>
                  <p className="text-sm text-slate-600">Page Views</p>
                  <p className="text-2xl font-bold text-slate-900">{analyticsData.totalViews}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-indigo-600" />
                  </div>
                  <p className="text-sm text-slate-600">Sessions</p>
                  <p className="text-2xl font-bold text-slate-900">{analyticsData.uniqueSessions}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-pink-600" />
                  </div>
                  <p className="text-sm text-slate-600">Chat Convos</p>
                  <p className="text-2xl font-bold text-slate-900">{chatConversations.length}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="contacts" className="space-y-6">
            <TabsList className="inline-flex h-12 items-center justify-start gap-1 rounded-full bg-white p-1.5 shadow-sm border border-slate-200">
              <TabsTrigger value="contacts" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-sm">
                <Mail className="w-4 h-4" />
                Contacts
              </TabsTrigger>
              <TabsTrigger value="dealers" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-sm">
                <Briefcase className="w-4 h-4" />
                Dealers
              </TabsTrigger>
              <TabsTrigger value="design" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-sm">
                <Palette className="w-4 h-4" />
                Design Center
              </TabsTrigger>
              <TabsTrigger value="warranties" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-sm">
                <Shield className="w-4 h-4" />
                Warranties
              </TabsTrigger>
              <TabsTrigger value="chat" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-sm">
                <MessageSquare className="w-4 h-4" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="products" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-sm">
                <Palette className="w-4 h-4" />
                Products
              </TabsTrigger>
              <TabsTrigger value="analytics" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-sm">
                <BarChart3 className="w-4 h-4" />
                Analytics
              </TabsTrigger>
            </TabsList>

            {/* Contact Submissions */}
            <TabsContent value="contacts">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Contact Submissions</CardTitle>
                  <Button size="sm" variant="outline" className="gap-1.5" onClick={() => exportToCSV(contacts.map(c => ({ Date: new Date(c.created_date).toLocaleDateString(), Name: c.name, Email: c.email, Phone: c.phone || '', Subject: c.subject || '', Message: c.message || '', Status: c.status })), 'contacts.csv')}>
                    <Download className="w-4 h-4" /> Export CSV
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-max">
                      <thead className="bg-slate-50 border-b">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Name</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Email</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Subject</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {contacts.map((contact) => (
                          <tr key={contact.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3 text-sm text-slate-600">
                              {new Date(contact.created_date).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 text-sm font-medium text-slate-900">{contact.name}</td>
                            <td className="px-4 py-3 text-sm text-slate-600">{contact.email}</td>
                            <td className="px-4 py-3 text-sm text-slate-600">{contact.subject || 'N/A'}</td>
                            <td className="px-4 py-3">
                             <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                               contact.status === 'resolved' ? 'bg-green-100 text-green-800' :
                               contact.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                               'bg-yellow-100 text-yellow-800'
                             }`}>
                               {contact.status}
                             </span>
                            </td>
                            <td className="px-4 py-3">
                             <Button
                               size="sm"
                               variant="outline"
                               disabled={sendingEmail === contact.id}
                               onClick={() => handleResendEmail('ContactSubmission', contact)}
                               className={`gap-1.5 text-xs ${sentEmails.has(contact.id) ? 'border-green-400 text-green-600' : ''}`}
                             >
                               {sendingEmail === contact.id ? <Loader2 className="w-3 h-3 animate-spin" /> :
                                sentEmails.has(contact.id) ? <CheckCircle2 className="w-3 h-3" /> :
                                <Send className="w-3 h-3" />}
                               {sentEmails.has(contact.id) ? 'Sent' : 'Send Email'}
                             </Button>
                            </td>
                            </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Dealer Applications */}
            <TabsContent value="dealers">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Dealer Applications</CardTitle>
                  <Button size="sm" variant="outline" className="gap-1.5" onClick={() => exportToCSV(dealers.map(d => ({ Date: new Date(d.created_date).toLocaleDateString(), Name: `${d.first_name} ${d.last_name}`, Email: d.email, Phone: d.phone, Company: d.company_name, City: d.city, Province: d.state_province, 'Business Type': d.business_type, 'About Business': d.about_business || '', Status: d.status })), 'dealer-applications.csv')}>
                    <Download className="w-4 h-4" /> Export CSV
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-max">
                      <thead className="bg-slate-50 border-b">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Name</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Email</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Company</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Location</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Type</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {dealers.map((dealer) => (
                          <tr key={dealer.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3 text-sm text-slate-600">
                              {new Date(dealer.created_date).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 text-sm font-medium text-slate-900">
                              {dealer.first_name} {dealer.last_name}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600">{dealer.email}</td>
                            <td className="px-4 py-3 text-sm text-slate-600">{dealer.company_name}</td>
                            <td className="px-4 py-3 text-sm text-slate-600">
                              {dealer.city}, {dealer.state_province}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600">{dealer.business_type}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                dealer.status === 'approved' ? 'bg-green-100 text-green-800' :
                                dealer.status === 'declined' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {dealer.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={sendingEmail === dealer.id}
                                onClick={() => handleResendEmail('DealerApplication', dealer)}
                                className={`gap-1.5 text-xs ${sentEmails.has(dealer.id) ? 'border-green-400 text-green-600' : ''}`}
                              >
                                {sendingEmail === dealer.id ? <Loader2 className="w-3 h-3 animate-spin" /> :
                                 sentEmails.has(dealer.id) ? <CheckCircle2 className="w-3 h-3" /> :
                                 <Send className="w-3 h-3" />}
                                {sentEmails.has(dealer.id) ? 'Sent' : 'Send Email'}
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Design Center Submissions */}
            <TabsContent value="design">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Design Center Submissions</CardTitle>
                  <Button size="sm" variant="outline" className="gap-1.5" onClick={() => exportToCSV(designSubmissions.map(s => ({ 'Quote ID': s.quote_id, Date: new Date(s.created_date).toLocaleDateString(), Name: s.contact_info?.fullName || '', Email: s.contact_info?.email || '', Phone: s.contact_info?.phone || '', Product: s.product_type, Shape: s.pool_shape || '', Features: (s.features || []).join('; '), Status: s.status })), 'design-center.csv')}>
                    <Download className="w-4 h-4" /> Export CSV
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-max">
                      <thead className="bg-slate-50 border-b">
                       <tr>
                         <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Quote ID</th>
                         <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Date</th>
                         <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Contact</th>
                         <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Product</th>
                         <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Details</th>
                         <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
                         <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Actions</th>
                       </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                       {designSubmissions.map((submission) => (
                         <tr key={submission.id} className="hover:bg-slate-50">
                           <td className="px-4 py-3">
                             <span className="text-sm font-mono font-semibold text-cyan-600">
                               {submission.quote_id || 'N/A'}
                             </span>
                           </td>
                           <td className="px-4 py-3 text-sm text-slate-600">
                             {new Date(submission.created_date).toLocaleDateString()}
                           </td>
                           <td className="px-4 py-3">
                             <div className="text-sm font-medium text-slate-900">
                               {submission.contact_info?.fullName || 'N/A'}
                             </div>
                             <div className="text-xs text-slate-500">{submission.contact_info?.email}</div>
                             {submission.contact_info?.phone && (
                               <div className="text-xs text-slate-500">{submission.contact_info.phone}</div>
                             )}
                           </td>
                           <td className="px-4 py-3">
                             <div className="text-sm text-slate-900">{submission.product_type}</div>
                             <div className="text-xs text-slate-500">{submission.pool_shape || 'N/A'}</div>
                           </td>
                           <td className="px-4 py-3">
                             <div className="text-xs text-slate-600 space-y-1">
                               {submission.dimensions?.length && (
                                 <div>Size: {submission.dimensions.length} x {submission.dimensions.width} ft</div>
                               )}
                               {submission.dimensions?.shallowDepth && (
                                 <div>Depth: {submission.dimensions.shallowDepth}-{submission.dimensions.deepDepth} ft</div>
                               )}
                               {submission.pattern_selection?.collection && (
                                 <div>Pattern: {submission.pattern_selection.collection}</div>
                               )}
                               {submission.features?.length > 0 && (
                                 <div>Features: {submission.features.join(', ')}</div>
                               )}
                             </div>
                           </td>
                           <td className="px-4 py-3">
                             <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                               submission.status === 'closed' ? 'bg-slate-100 text-slate-800' :
                               submission.status === 'quoted' ? 'bg-green-100 text-green-800' :
                               submission.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                               'bg-yellow-100 text-yellow-800'
                             }`}>
                               {submission.status}
                             </span>
                           </td>
                           <td className="px-4 py-3">
                             <Button
                               size="sm"
                               variant="outline"
                               disabled={sendingEmail === submission.id}
                               onClick={() => handleResendEmail('DesignCenterSubmission', submission)}
                               className={`gap-1.5 text-xs ${sentEmails.has(submission.id) ? 'border-green-400 text-green-600' : ''}`}
                             >
                               {sendingEmail === submission.id ? <Loader2 className="w-3 h-3 animate-spin" /> :
                                sentEmails.has(submission.id) ? <CheckCircle2 className="w-3 h-3" /> :
                                <Send className="w-3 h-3" />}
                               {sentEmails.has(submission.id) ? 'Sent' : 'Send Email'}
                             </Button>
                           </td>
                         </tr>
                       ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Chat Conversations */}
            <TabsContent value="chat">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Chat Conversations</CardTitle>
                  <Button size="sm" variant="outline" className="gap-1.5" onClick={() => exportToCSV(chatConversations.map(c => ({ Date: new Date(c.created_date).toLocaleDateString(), Time: new Date(c.created_date).toLocaleTimeString(), 'Session ID': c.metadata?.sessionId || '', Messages: c.messages?.length || 0, 'Last Message': c.messages?.[c.messages.length - 1]?.content || '', Source: c.metadata?.source || '' })), 'chat-conversations.csv')}>
                    <Download className="w-4 h-4" /> Export CSV
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Session ID</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Messages</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Last Message</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Source</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {chatConversations.map((conversation) => (
                          <tr key={conversation.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3 text-sm text-slate-600">
                              {new Date(conversation.created_date).toLocaleDateString()} {new Date(conversation.created_date).toLocaleTimeString()}
                            </td>
                            <td className="px-4 py-3 text-sm font-mono text-slate-600">
                              {conversation.metadata?.sessionId || 'N/A'}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-900 font-medium">
                              {conversation.messages?.length || 0} messages
                            </td>
                            <td className="px-4 py-3">
                              <div className="text-sm text-slate-700 max-w-md truncate">
                                {conversation.messages?.[conversation.messages.length - 1]?.content || 'No messages'}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600">
                              {conversation.metadata?.source || 'N/A'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Products */}
            <TabsContent value="products">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Product Management</CardTitle>
                  <Button size="sm" variant="outline" className="gap-1.5" onClick={() => exportToCSV(products.map(p => ({ Name: p.name, Slug: p.slug, Category: p.category, Tagline: p.tagline || '', 'Warranty Years': p.warranty_years || '', Bestseller: p.is_bestseller ? 'Yes' : 'No' })), 'products.csv')}>
                    <Download className="w-4 h-4" /> Export CSV
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Name</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Category</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Warranty</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Bestseller</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {products.map((product) => (
                          <tr key={product.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3 text-sm font-medium text-slate-900">{product.name}</td>
                            <td className="px-4 py-3 text-sm text-slate-600">{product.category}</td>
                            <td className="px-4 py-3 text-sm text-slate-600">{product.warranty_years} years</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                product.is_bestseller ? 'bg-yellow-100 text-yellow-800' : 'bg-slate-100 text-slate-600'
                              }`}>
                                {product.is_bestseller ? 'Yes' : 'No'}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => setEditingProduct(product)}
                              >
                                Edit
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Warranty Registrations */}
            <TabsContent value="warranties">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Warranty Registrations</CardTitle>
                  <Button size="sm" variant="outline" className="gap-1.5" onClick={() => exportToCSV(warranties.map(w => ({ Date: new Date(w.created_date).toLocaleDateString(), Name: w.full_name, Email: w.email, Phone: w.phone, Product: w.product_type, Serial: w.serial_number || '', 'Pool Type': w.pool_type || '', 'Pool Size': w.pool_size || '', 'Pool Shape': w.pool_shape || '', 'Dealer Purchased From': w.dealer_purchased_from || '', 'Purchase Date': w.purchase_date || '', 'Installation Date': w.installation_date || '', Status: w.status })), 'warranty-registrations.csv')}>
                    <Download className="w-4 h-4" /> Export CSV
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-max">
                      <thead className="bg-slate-50 border-b">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Name</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Email</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Product</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Serial</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Invoice #</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {warranties.map((warranty) => (
                          <tr key={warranty.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3 text-sm text-slate-600">
                              {new Date(warranty.created_date).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 text-sm font-medium text-slate-900">{warranty.full_name}</td>
                            <td className="px-4 py-3 text-sm text-slate-600">{warranty.email}</td>
                            <td className="px-4 py-3 text-sm text-slate-600">{warranty.product_type}</td>
                            <td className="px-4 py-3 text-sm text-slate-600">{warranty.serial_number || 'N/A'}</td>
                            <td className="px-4 py-3 text-sm text-slate-600">{warranty.invoice_number || '—'}</td>
                            <td className="px-4 py-3">
                             <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                               warranty.status === 'approved' ? 'bg-green-100 text-green-800' :
                               warranty.status === 'rejected' ? 'bg-red-100 text-red-800' :
                               'bg-yellow-100 text-yellow-800'
                             }`}>
                               {warranty.status}
                             </span>
                            </td>
                            <td className="px-4 py-3 flex items-center gap-2">
                             <Button
                               size="sm"
                               variant="outline"
                               onClick={() => setEditingWarranty(warranty)}
                               className="gap-1.5 text-xs"
                             >
                               Edit
                             </Button>
                             <Button
                               size="sm"
                               variant="outline"
                               disabled={sendingEmail === warranty.id}
                               onClick={() => handleResendEmail('WarrantyRegistration', warranty)}
                               className={`gap-1.5 text-xs ${sentEmails.has(warranty.id) ? 'border-green-400 text-green-600' : ''}`}
                             >
                               {sendingEmail === warranty.id ? <Loader2 className="w-3 h-3 animate-spin" /> :
                                sentEmails.has(warranty.id) ? <CheckCircle2 className="w-3 h-3" /> :
                                <Send className="w-3 h-3" />}
                               {sentEmails.has(warranty.id) ? 'Sent' : 'Send Email'}
                             </Button>
                            </td>
                            </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics */}
            <TabsContent value="analytics">
              <AnalyticsTab analyticsRaw={analyticsRaw} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Warranty Edit Dialog */}
      {editingWarranty && (
        <WarrantyEditDialog
          warranty={editingWarranty}
          open={!!editingWarranty}
          onClose={() => setEditingWarranty(null)}
          onSave={() => {
            refetchWarranties();
            setEditingWarranty(null);
          }}
        />
      )}

      {/* Product Edit Dialog */}
      {editingProduct && (
        <ProductEditDialog
          product={editingProduct}
          open={!!editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={() => {
            refetchProducts();
            setEditingProduct(null);
          }}
        />
      )}
    </>
  );
}