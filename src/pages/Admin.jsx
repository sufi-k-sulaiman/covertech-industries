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
  Eye, Globe, Monitor, Smartphone, ExternalLink, Calendar
} from 'lucide-react';
import SEOHead from '@/components/seo/SEOHead';

const ADMIN_USERNAME = 'Covertechind';
const ADMIN_PASSWORD = 'CoverHenry2026@1';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Contact Submissions</p>
                    <p className="text-3xl font-bold text-slate-900">{contacts.length}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Dealer Applications</p>
                    <p className="text-3xl font-bold text-slate-900">{dealers.length}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Design Center Leads</p>
                    <p className="text-3xl font-bold text-slate-900">{designSubmissions.length}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Palette className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Total Leads</p>
                    <p className="text-3xl font-bold text-slate-900">
                      {contacts.length + dealers.length + designSubmissions.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-cyan-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="contacts" className="space-y-6">
            <TabsList className="bg-white border border-slate-200">
              <TabsTrigger value="contacts">Contact Submissions</TabsTrigger>
              <TabsTrigger value="dealers">Dealer Applications</TabsTrigger>
              <TabsTrigger value="design">Design Center</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Contact Submissions */}
            <TabsContent value="contacts">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Name</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Email</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Subject</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
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
                <CardHeader>
                  <CardTitle>Dealer Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Name</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Company</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Location</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Type</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
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
                <CardHeader>
                  <CardTitle>Design Center Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Contact</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Product</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Shape</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {designSubmissions.map((submission) => (
                          <tr key={submission.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3 text-sm text-slate-600">
                              {new Date(submission.created_date).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 text-sm font-medium text-slate-900">
                              {submission.contact_info?.fullName || 'N/A'}
                              <div className="text-xs text-slate-500">{submission.contact_info?.email}</div>
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600">{submission.product_type}</td>
                            <td className="px-4 py-3 text-sm text-slate-600">{submission.pool_shape || 'N/A'}</td>
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
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Analytics Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <p className="text-slate-600 mb-4">
                        Analytics integration coming soon. Connect your analytics provider to view:
                      </p>
                      <ul className="text-sm text-slate-500 space-y-2 max-w-md mx-auto text-left">
                        <li className="flex items-center gap-2">
                          <Eye className="w-4 h-4" /> Traffic Overview & Page Views
                        </li>
                        <li className="flex items-center gap-2">
                          <Globe className="w-4 h-4" /> Geographic Distribution
                        </li>
                        <li className="flex items-center gap-2">
                          <Monitor className="w-4 h-4" /> Operating Systems & Devices
                        </li>
                        <li className="flex items-center gap-2">
                          <ExternalLink className="w-4 h-4" /> Referrer Sources
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}