import { motion } from 'framer-motion';

export default function PageHero({ 
  badge,
  title, 
  titleAccent,
  description, 
  backgroundImage,
  children,
  overlay = true,
  minHeight = "min-h-[60vh]"
}) {
  return (
    <section 
      className={`relative ${minHeight} flex items-center justify-center overflow-hidden`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-cyan-900/70" />
      )}
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-cyan-300 text-sm font-medium mb-6"
          >
            {badge}
          </motion.div>
        )}
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
        >
          {title}
          {titleAccent && (
            <>
              <br />
              <span className="text-cyan-400">{titleAccent}</span>
            </>
          )}
        </motion.h1>
        
        {description && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            {description}
          </motion.p>
        )}
        
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </div>
      
      {/* Decorative gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    </section>
  );
}