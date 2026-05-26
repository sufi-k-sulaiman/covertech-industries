import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Eye, BarChart3, Monitor, Smartphone, ExternalLink,
  Calendar, Globe, TrendingUp, Users, Clock, Activity, Download
} from 'lucide-react';

const exportToCSV = (rows, filename) => {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const csvContent = [
    headers.join(','),
    ...rows.map(row =>
      headers.map(h => {
        const val = row[h];
        const str = val === null || val === undefined ? '' : String(val);
        return `"${str.replace(/"/g, '""')}"`;
      }).join(',')
    )
  ].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
};

const COUNTRY_FLAGS = {
  US: '🇺🇸', CA: '🇨🇦', GB: '🇬🇧', AU: '🇦🇺', DE: '🇩🇪', FR: '🇫🇷',
  IN: '🇮🇳', CN: '🇨🇳', BR: '🇧🇷', MX: '🇲🇽', JP: '🇯🇵', NL: '🇳🇱',
  SE: '🇸🇪', IT: '🇮🇹', ES: '🇪🇸', PL: '🇵🇱', RU: '🇷🇺', PT: '🇵🇹',
  ZA: '🇿🇦', SG: '🇸🇬', KR: '🇰🇷', AR: '🇦🇷', CO: '🇨🇴', PH: '🇵🇭',
};

function StatCard({ label, value, sub, icon: Icon, color = 'cyan' }) {
  const colorMap = {
    cyan: 'bg-cyan-50 text-cyan-600',
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
  };
  return (
    <Card>
      <CardContent className="pt-5 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-slate-500 mb-1">{label}</p>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
            {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
          </div>
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${colorMap[color]}`}>
            <Icon className="w-4 h-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function BarList({ data, total }) {
  return (
    <div className="space-y-2.5">
      {data.map(([label, count]) => {
        const pct = total > 0 ? Math.round((count / total) * 100) : 0;
        return (
          <div key={label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-slate-700 truncate max-w-[65%]">{label}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">{pct}%</span>
                <span className="text-sm font-semibold text-slate-900 w-8 text-right">{count}</span>
              </div>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function getReferrerLabel(referrer) {
  if (!referrer || referrer === 'direct' || referrer === '') return 'Direct';
  try {
    const url = new URL(referrer.startsWith('http') ? referrer : `https://${referrer}`);
    return url.hostname.replace('www.', '');
  } catch {
    return referrer;
  }
}

export default function AnalyticsTab({ analyticsRaw = [] }) {
  const [dateRange, setDateRange] = useState('30');

  const analytics = useMemo(() => {
    return analyticsRaw.filter(a => {
      if (a.page === 'Admin' || a.page?.toLowerCase().includes('admin')) return false;
      if (dateRange !== 'all') {
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - parseInt(dateRange));
        if (new Date(a.created_date) < cutoff) return false;
      }
      return true;
    });
  }, [analyticsRaw, dateRange]);

  // Previous period for comparison
  const prevAnalytics = useMemo(() => {
    if (dateRange === 'all') return [];
    const days = parseInt(dateRange);
    return analyticsRaw.filter(a => {
      if (a.page === 'Admin' || a.page?.toLowerCase().includes('admin')) return false;
      const cutoffEnd = new Date();
      cutoffEnd.setDate(cutoffEnd.getDate() - days);
      const cutoffStart = new Date();
      cutoffStart.setDate(cutoffStart.getDate() - days * 2);
      const d = new Date(a.created_date);
      return d >= cutoffStart && d < cutoffEnd;
    });
  }, [analyticsRaw, dateRange]);

  const totalViews = analytics.length;
  const uniqueSessions = new Set(analytics.map(a => a.session_id).filter(Boolean)).size;
  const uniqueVisitors = new Set(analytics.map(a => a.user_agent)).size;
  const avgPagesPerSession = uniqueSessions > 0 ? (totalViews / uniqueSessions).toFixed(1) : 0;

  const prevTotalViews = prevAnalytics.length;
  const prevSessions = new Set(prevAnalytics.map(a => a.session_id).filter(Boolean)).size;

  function pctChange(curr, prev) {
    if (prev === 0) return curr > 0 ? '+100%' : '—';
    const c = Math.round(((curr - prev) / prev) * 100);
    return (c >= 0 ? '+' : '') + c + '%';
  }

  // Page traffic — ALL pages, no limit
  const pageTraffic = Object.entries(
    analytics.reduce((acc, a) => { acc[a.page] = (acc[a.page] || 0) + 1; return acc; }, {})
  ).sort((a, b) => b[1] - a[1]);

  // Devices — ALL
  const devices = Object.entries(
    analytics.reduce((acc, a) => {
      const d = a.device_type || 'unknown';
      acc[d] = (acc[d] || 0) + 1; return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]);

  // OS — from user_agent (best effort)
  const osMap = analytics.reduce((acc, a) => {
    const ua = a.user_agent || '';
    let os = 'Other';
    if (/Windows/.test(ua)) os = 'Windows';
    else if (/Mac OS X/.test(ua)) os = 'Mac OS X';
    else if (/iPhone|iPad/.test(ua)) os = 'iOS';
    else if (/Android/.test(ua)) os = 'Android';
    else if (/Linux/.test(ua)) os = 'Linux';
    else if (/CrOS/.test(ua)) os = 'Chrome OS';
    acc[os] = (acc[os] || 0) + 1;
    return acc;
  }, {});
  const osList = Object.entries(osMap).sort((a, b) => b[1] - a[1]);

  // Browser — from user_agent
  const browserMap = analytics.reduce((acc, a) => {
    const ua = a.user_agent || '';
    let browser = 'Other';
    if (/Edg\//.test(ua)) browser = 'Edge';
    else if (/Chrome\//.test(ua) && !/Chromium/.test(ua)) browser = 'Chrome';
    else if (/Firefox\//.test(ua)) browser = 'Firefox';
    else if (/Safari\//.test(ua) && !/Chrome/.test(ua)) browser = 'Safari';
    else if (/MSIE|Trident/.test(ua)) browser = 'IE';
    else if (/OPR\/|Opera\//.test(ua)) browser = 'Opera';
    acc[browser] = (acc[browser] || 0) + 1;
    return acc;
  }, {});
  const browserList = Object.entries(browserMap).sort((a, b) => b[1] - a[1]);

  // Referrers — ALL
  const referrers = Object.entries(
    analytics.reduce((acc, a) => {
      const label = getReferrerLabel(a.referrer);
      acc[label] = (acc[label] || 0) + 1; return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]);

  // Countries — ALL
  const countries = Object.entries(
    analytics.reduce((acc, a) => {
      const c = a.country || 'Unknown';
      acc[c] = (acc[c] || 0) + 1; return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]);

  // Daily traffic
  const dailyMap = {};
  if (dateRange === 'all') {
    // Span from earliest record to today
    analytics.forEach(a => {
      const key = new Date(a.created_date).toLocaleDateString('en-CA');
      dailyMap[key] = (dailyMap[key] || 0) + 1;
    });
    // Fill gaps between min and max date
    if (analytics.length > 0) {
      const dates = analytics.map(a => new Date(a.created_date).toLocaleDateString('en-CA')).sort();
      const start = new Date(dates[0]);
      const end = new Date();
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const key = d.toLocaleDateString('en-CA');
        if (!(key in dailyMap)) dailyMap[key] = 0;
      }
    }
  } else {
    const daysToShow = parseInt(dateRange);
    for (let i = daysToShow - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dailyMap[d.toLocaleDateString('en-CA')] = 0;
    }
    analytics.forEach(a => {
      const key = new Date(a.created_date).toLocaleDateString('en-CA');
      if (key in dailyMap) dailyMap[key]++;
    });
  }
  const dailyData = Object.entries(dailyMap).sort(([a], [b]) => a.localeCompare(b));
  const maxDaily = Math.max(...dailyData.map(([, v]) => v), 1);

  // Recent activity — last 20
  const recentActivity = [...analytics].sort((a, b) => new Date(b.created_date) - new Date(a.created_date)).slice(0, 20);

  return (
    <div className="space-y-6">
      {/* Date Range Filter + Export */}
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-slate-600">Period:</span>
        {[['7', 'Last 7 days'], ['30', 'Last 30 days'], ['90', 'Last 90 days'], ['all', 'All time']].map(([val, label]) => (
          <button
            key={val}
            onClick={() => setDateRange(val)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              dateRange === val
                ? 'bg-cyan-500 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-cyan-300'
            }`}
          >
            {label}
          </button>
        ))}
          <span className="text-xs text-slate-400 ml-1">{analytics.length.toLocaleString()} events</span>
        </div>
        <Button size="sm" variant="outline" className="gap-1.5" onClick={() => exportToCSV(analytics.map(a => ({ Date: new Date(a.created_date).toLocaleDateString(), Time: new Date(a.created_date).toLocaleTimeString(), Page: a.page, Device: a.device_type || '', Country: a.country || '', Referrer: a.referrer || '', 'Session ID': a.session_id || '' })), 'analytics.csv')}>
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Page Views" value={totalViews.toLocaleString()} sub={dateRange !== 'all' ? `prev: ${pctChange(totalViews, prevTotalViews)}` : undefined} icon={Eye} color="cyan" />
        <StatCard label="Unique Sessions" value={uniqueSessions.toLocaleString()} sub={dateRange !== 'all' ? `prev: ${pctChange(uniqueSessions, prevSessions)}` : undefined} icon={Users} color="blue" />
        <StatCard label="Unique Visitors" value={uniqueVisitors.toLocaleString()} icon={Activity} color="green" />
        <StatCard label="Pages / Session" value={avgPagesPerSession} icon={TrendingUp} color="purple" />
      </div>

      {/* Daily Traffic Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BarChart3 className="w-4 h-4" />
            Daily Traffic
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-1 h-28">
            {dailyData.map(([date, count]) => (
              <div key={date} className="flex-1 flex flex-col items-center gap-1 group relative">
                <div
                  className="w-full bg-cyan-500 rounded-t hover:bg-cyan-400 transition-colors cursor-default"
                  style={{ height: `${(count / maxDaily) * 100}%`, minHeight: count > 0 ? '3px' : '0' }}
                />
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-10">
                  {date}: {count}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-2">
            <span>{dailyData[0]?.[0]}</span>
            <span>{dailyData[Math.floor(dailyData.length / 2)]?.[0]}</span>
            <span>{dailyData[dailyData.length - 1]?.[0]}</span>
          </div>
        </CardContent>
      </Card>

      {/* 3-column grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Page Traffic */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="w-4 h-4" />
              Page Traffic
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarList data={pageTraffic} total={totalViews} />
          </CardContent>
        </Card>

        {/* Referrers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ExternalLink className="w-4 h-4" />
              Referrer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarList data={referrers} total={totalViews} />
          </CardContent>
        </Card>

        {/* Countries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Globe className="w-4 h-4" />
              Country
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarList
              data={countries.map(([code, count]) => [
                `${COUNTRY_FLAGS[code] || '🌍'} ${code}`, count
              ])}
              total={totalViews}
            />
          </CardContent>
        </Card>
      </div>

      {/* 4-column grid */}
      <div className="grid md:grid-cols-4 gap-6">
        {/* Devices */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Monitor className="w-4 h-4" />
              Devices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarList data={devices} total={totalViews} />
          </CardContent>
        </Card>

        {/* OS */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Smartphone className="w-4 h-4" />
              Operating System
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarList data={osList} total={totalViews} />
          </CardContent>
        </Card>

        {/* Browser */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Globe className="w-4 h-4" />
              Browser
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarList data={browserList} total={totalViews} />
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="w-4 h-4" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentActivity.map((visit) => (
                <div key={visit.id} className="text-xs border-b border-slate-100 pb-1.5">
                  <div className="font-medium text-slate-900">{visit.page}</div>
                  <div className="text-slate-400 flex gap-1.5 mt-0.5">
                    <span>{visit.device_type}</span>
                    <span>·</span>
                    <span>{new Date(visit.created_date).toLocaleString('en-CA', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}