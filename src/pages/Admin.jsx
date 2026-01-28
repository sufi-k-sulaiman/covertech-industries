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
  Eye, Globe, Monitor, Smartphone, ExternalLink, Calendar, Shield
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

  const { data: warranties = [] } = useQuery({
    queryKey: ['warranties'],
    queryFn: () => base44.entities.WarrantyRegistration.list('-created_date', 100),
    enabled: isAuthenticated
  });

  const { data: analytics = [] } = useQuery({
    queryKey: ['analytics'],
    queryFn: () => base44.entities.Analytics.list('-created_date', 500),
    enabled: isAuthenticated
  });

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list('-created_date', 200),
    enabled: isAuthenticated
  });

  // Process analytics data
  const analyticsData = {
    totalViews: analytics.length,
    uniqueSessions: new Set(analytics.map(a => a.session_id)).size,
    pageViews: analytics.reduce((acc, curr) => {
      acc[curr.page] = (acc[curr.page] || 0) + 1;
      return acc;
    }, {}),
    devices: analytics.reduce((acc, curr) => {
      acc[curr.device_type] = (acc[curr.device_type] || 0) + 1;
      return acc;
    }, {}),
    referrers: analytics.reduce((acc, curr) => {
      const ref = curr.referrer === 'direct' ? 'Direct Traffic' : new URL(curr.referrer || 'https://direct').hostname;
      acc[ref] = (acc[ref] || 0) + 1;
      return acc;
    }, {}),
    topPages: Object.entries(analytics.reduce((acc, curr) => {
      acc[curr.page] = (acc[curr.page] || 0) + 1;
      return acc;
    }, {})).sort((a, b) => b[1] - a[1]).slice(0, 10)
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
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="contacts" className="space-y-6">
            <TabsList className="bg-white border border-slate-200">
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
              <TabsTrigger value="dealers">Dealers</TabsTrigger>
              <TabsTrigger value="design">Design Center</TabsTrigger>
              <TabsTrigger value="warranties">Warranties</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
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

            {/* Products */}
            <TabsContent value="products">
              <Card>
                <CardHeader>
                  <CardTitle>Product Management</CardTitle>
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
                                onClick={() => {
                                  const newName = prompt('Edit product name:', product.name);
                                  if (newName && newName !== product.name) {
                                    base44.entities.Product.update(product.id, { name: newName })
                                      .then(() => window.location.reload());
                                  }
                                }}
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
                <CardHeader>
                  <CardTitle>Warranty Registrations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Name</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Email</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Product</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Serial</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
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
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                warranty.status === 'approved' ? 'bg-green-100 text-green-800' :
                                warranty.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {warranty.status}
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
                {/* Traffic Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Traffic Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-6 mb-6">
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Total Page Views</p>
                        <p className="text-3xl font-bold text-slate-900">{analyticsData.totalViews}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Unique Sessions</p>
                        <p className="text-3xl font-bold text-slate-900">{analyticsData.uniqueSessions}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Avg. Pages/Session</p>
                        <p className="text-3xl font-bold text-slate-900">
                          {analyticsData.uniqueSessions > 0 ? (analyticsData.totalViews / analyticsData.uniqueSessions).toFixed(1) : 0}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Top Pages */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Top Pages
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {analyticsData.topPages.map(([page, count]) => (
                          <div key={page} className="flex items-center justify-between">
                            <span className="text-sm text-slate-700">{page}</span>
                            <span className="text-sm font-semibold text-slate-900">{count} views</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Devices */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Monitor className="w-5 h-5" />
                        Devices
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Object.entries(analyticsData.devices).map(([device, count]) => (
                          <div key={device} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {device === 'mobile' ? <Smartphone className="w-4 h-4 text-slate-500" /> :
                               device === 'tablet' ? <Monitor className="w-4 h-4 text-slate-500" /> :
                               <Monitor className="w-4 h-4 text-slate-500" />}
                              <span className="text-sm text-slate-700 capitalize">{device}</span>
                            </div>
                            <span className="text-sm font-semibold text-slate-900">{count}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Referrers */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ExternalLink className="w-5 h-5" />
                        Top Referrers
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Object.entries(analyticsData.referrers)
                          .sort((a, b) => b[1] - a[1])
                          .slice(0, 10)
                          .map(([referrer, count]) => (
                            <div key={referrer} className="flex items-center justify-between">
                              <span className="text-sm text-slate-700 truncate max-w-[200px]">{referrer}</span>
                              <span className="text-sm font-semibold text-slate-900">{count}</span>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {analytics.slice(0, 10).map((visit) => (
                          <div key={visit.id} className="text-xs text-slate-600 border-b border-slate-100 pb-2">
                            <div className="font-medium text-slate-900">{visit.page}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <span>{visit.device_type}</span>
                              <span>•</span>
                              <span>{new Date(visit.created_date).toLocaleTimeString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}