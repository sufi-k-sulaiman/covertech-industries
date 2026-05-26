import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table2, ChevronUp, ChevronDown, Download } from 'lucide-react';

const COUNTRY_FLAGS = {
  US: '🇺🇸', CA: '🇨🇦', GB: '🇬🇧', AU: '🇦🇺', DE: '🇩🇪', FR: '🇫🇷',
  IN: '🇮🇳', CN: '🇨🇳', BR: '🇧🇷', MX: '🇲🇽', JP: '🇯🇵', NL: '🇳🇱',
  SE: '🇸🇪', IT: '🇮🇹', ES: '🇪🇸', PL: '🇵🇱', RU: '🇷🇺', PT: '🇵🇹',
  ZA: '🇿🇦', SG: '🇸🇬', KR: '🇰🇷', AR: '🇦🇷', CO: '🇨🇴', PH: '🇵🇭',
};

function getReferrerLabel(referrer) {
  if (!referrer || referrer === 'direct' || referrer === '') return 'Direct';
  try {
    const url = new URL(referrer.startsWith('http') ? referrer : `https://${referrer}`);
    return url.hostname.replace('www.', '');
  } catch {
    return referrer;
  }
}

const PAGE_SIZE = 50;

export default function RawDataTable({ analytics, exportToCSV }) {
  const [sortCol, setSortCol] = useState('created_date');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return analytics.filter(a =>
      !q ||
      (a.page || '').toLowerCase().includes(q) ||
      (a.country || '').toLowerCase().includes(q) ||
      (a.device_type || '').toLowerCase().includes(q) ||
      getReferrerLabel(a.referrer).toLowerCase().includes(q) ||
      (a.session_id || '').toLowerCase().includes(q)
    );
  }, [analytics, search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let av = a[sortCol] ?? '';
      let bv = b[sortCol] ?? '';
      if (sortCol === 'created_date') {
        av = new Date(av).getTime();
        bv = new Date(bv).getTime();
      } else {
        av = String(av).toLowerCase();
        bv = String(bv).toLowerCase();
      }
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filtered, sortCol, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const pageData = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = (col) => {
    if (sortCol === col) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCol(col);
      setSortDir('desc');
    }
    setPage(1);
  };

  const SortIcon = ({ col }) => {
    if (sortCol !== col) return <ChevronDown className="w-3 h-3 opacity-30" />;
    return sortDir === 'asc' ? <ChevronUp className="w-3 h-3 text-cyan-500" /> : <ChevronDown className="w-3 h-3 text-cyan-500" />;
  };

  const cols = [
    { key: 'created_date', label: 'Date / Time' },
    { key: 'page', label: 'Page' },
    { key: 'country', label: 'Country' },
    { key: 'device_type', label: 'Device' },
    { key: 'referrer', label: 'Referrer' },
    { key: 'session_id', label: 'Session ID' },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Table2 className="w-4 h-4" />
            Raw Visit Data
            <span className="text-xs font-normal text-slate-400 ml-1">{filtered.length.toLocaleString()} rows</span>
          </CardTitle>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search…"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="text-sm border border-slate-200 rounded-md px-3 py-1.5 w-44 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
            <Button size="sm" variant="outline" className="gap-1.5" onClick={() =>
              exportToCSV(sorted.map(a => ({
                Date: new Date(a.created_date).toLocaleDateString(),
                Time: new Date(a.created_date).toLocaleTimeString(),
                Page: a.page,
                Device: a.device_type || '',
                Country: a.country || '',
                Referrer: getReferrerLabel(a.referrer),
                'Session ID': a.session_id || '',
              })), 'analytics-raw.csv')
            }>
              <Download className="w-4 h-4" /> CSV
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {cols.map(c => (
                  <th
                    key={c.key}
                    onClick={() => handleSort(c.key)}
                    className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide cursor-pointer hover:text-slate-700 select-none whitespace-nowrap"
                  >
                    <span className="flex items-center gap-1">
                      {c.label} <SortIcon col={c.key} />
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageData.map((row, i) => (
                <tr key={row.id} className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/40'}`}>
                  <td className="px-4 py-2 text-slate-500 whitespace-nowrap text-xs">
                    {new Date(row.created_date).toLocaleString('en-CA', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-4 py-2 font-medium text-slate-800">{row.page}</td>
                  <td className="px-4 py-2 text-slate-600 whitespace-nowrap">
                    {row.country
                      ? <span>{COUNTRY_FLAGS[row.country] || '🌍'} {row.country}</span>
                      : <span className="text-slate-300">—</span>
                    }
                  </td>
                  <td className="px-4 py-2 text-slate-500 capitalize">{row.device_type || '—'}</td>
                  <td className="px-4 py-2 text-slate-500 max-w-[180px] truncate">
                    {getReferrerLabel(row.referrer) === 'Direct'
                      ? <span className="text-slate-400">Direct</span>
                      : <span className="text-cyan-600">{getReferrerLabel(row.referrer)}</span>
                    }
                  </td>
                  <td className="px-4 py-2 text-xs text-slate-300 font-mono truncate max-w-[120px]">{row.session_id || '—'}</td>
                </tr>
              ))}
              {pageData.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-400 text-sm">No records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
            <span className="text-xs text-slate-400">
              Page {page} of {totalPages} · {sorted.length.toLocaleString()} records
            </span>
            <div className="flex items-center gap-1">
              <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</Button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const p = Math.max(1, Math.min(totalPages - 4, page - 2)) + i;
                return (
                  <Button
                    key={p}
                    size="sm"
                    variant={p === page ? 'default' : 'outline'}
                    onClick={() => setPage(p)}
                    className={p === page ? 'bg-cyan-500 border-cyan-500 text-white' : ''}
                  >
                    {p}
                  </Button>
                );
              })}
              <Button size="sm" variant="outline" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}