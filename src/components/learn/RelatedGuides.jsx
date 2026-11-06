import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight } from 'lucide-react';

export default function RelatedGuides({ items = [] }) {
  if (!items.length) return null;

  return (
    <section className="mt-16 pt-10 border-t border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900">Related Guides</h2>
      <p className="text-slate-500 mt-1 mb-6">More Covertech guidance on the topics covered above.</p>

      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <Link
            key={item.slug}
            to={createPageUrl(`LearnArticle?slug=${item.slug}`)}
            className="group flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-5 hover:border-cyan-400 hover:shadow-lg transition-all"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-cyan-600">{item.categoryName}</span>
            <span className="font-medium text-slate-900 group-hover:text-cyan-700 transition-colors leading-snug">
              {item.title}
            </span>
            <span className="mt-auto flex items-center gap-1 text-sm font-medium text-cyan-600">
              Read guide
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}