export default function GlassCard({ className = '', children, ...props }) {
  return (
    <div className={`glass-card rounded-3xl p-8 ${className}`} {...props}>
      {children}
    </div>
  )
}
