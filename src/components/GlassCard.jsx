function GlassCard({ className = '', children }) {
  return <div className={`glass-card ${className}`.trim()}>{children}</div>
}

export default GlassCard
