import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight } from 'lucide-react';

export default function GuideProducts({ items = [] }) {
  if (!items.length) return null;

  return (
    <section className="mt-14">
      <h2 className="text-2xl font-bold text-slate-900">Products in this guide</h2>
      <p className="text-slate-500 mt-1 mb-6">The Covertech products built for what you just read.</p>

      <div className="grid sm:grid-cols-3 gap-4">
        {items.map((item) => (
          <Link
            key={item.slug}
            to={createPageUrl(`ProductDetails?slug=${item.slug}`)}
            className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white hover:border-cyan-400 hover:shadow-lg transition-all"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                decoding="async"
                className="w-full h-32 object-cover"
              />
            )}
            <div className="flex flex-col gap-1 p-4">
              <span className="font-semibold text-slate-900 group-hover:text-cyan-700 transition-colors leading-snug">
                {item.name}
              </span>
              {item.tagline && (
                <span className="text-sm text-slate-500 leading-snug">{item.tagline}</span>
              )}
              <span className="mt-2 flex items-center gap-1 text-sm font-medium text-cyan-600">
                View product
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}