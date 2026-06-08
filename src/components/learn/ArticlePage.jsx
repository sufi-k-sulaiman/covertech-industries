import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Check, Lightbulb, Wrench, ArrowRight } from 'lucide-react';

function ArticleSection({ title, excerpt, paragraphs, image, imageAlt, imageRight = false, index, articleSlug }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="mb-16 last:mb-0"
    >
      <div className={`grid lg:grid-cols-2 gap-10 items-start ${imageRight ? 'lg:flex lg:flex-row-reverse' : ''}`}>
        {/* Image */}
        {image && (
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={image}
              alt={imageAlt || title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
        {/* Text */}
        <div className={image ? '' : 'lg:col-span-2'}>
          <span className="text-xs font-bold tracking-widest text-cyan-500 uppercase mb-2 block">Article {index + 1}</span>
          <h3 className="text-2xl font-bold text-slate-900 mb-3 leading-snug">{title}</h3>
          <p className="text-cyan-600 font-medium mb-5 text-lg leading-relaxed">{excerpt}</p>
          <div className="space-y-4">
            {paragraphs.slice(0, 2).map((para, i) => (
              <p key={i} className="text-slate-700 leading-relaxed">{para}</p>
            ))}
          </div>
          {articleSlug && (
            <Link
              to={createPageUrl(`LearnArticle?slug=${articleSlug}`)}
              className="inline-flex items-center gap-2 mt-5 text-cyan-600 font-semibold hover:text-cyan-700 group"
            >
              Read Full Article
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>
      {/* Divider */}
      <div className="mt-16 border-b border-slate-100" />
    </motion.article>
  );
}

export default function ArticlePage({ articles, tips, care, warranty, image, name, categorySlugs = [] }) {
  return (
    <div>
      {/* Articles */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-12">Essential Guides</h2>
        {articles.map((article, idx) => (
          <ArticleSection
            key={idx}
            index={idx}
            title={article.title}
            excerpt={article.excerpt}
            paragraphs={article.paragraphs}
            image={article.image}
            imageAlt={article.imageAlt}
            imageRight={idx % 2 !== 0}
            articleSlug={categorySlugs[idx]}
          />
        ))}
      </div>

      {/* Tips & Care */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Pro Tips</h3>
          </div>
          <ol className="space-y-4">
            {tips.map((tip, index) => (
              <li key={index} className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-cyan-500 text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-slate-700">{tip}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-slate-50 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Care & Maintenance</h3>
          </div>
          <ul className="space-y-3">
            {care.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Warranty Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">Warranty Information</span>
          <h3 className="text-2xl md:text-3xl font-bold text-white mt-2">Industry-Leading Warranty</h3>
          <p className="text-slate-400 mt-2">{warranty}-year limited warranty with full coverage options</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              {warranty}
            </span>
            <p className="text-slate-400 text-sm mt-1">Year Warranty</p>
          </div>
          <img src={image} alt={name} className="w-24 h-24 object-cover rounded-xl hidden md:block" />
        </div>
      </div>
    </div>
  );
}