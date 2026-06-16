export default function StatCard({ 
  icon, title, value, color, variation 
}: { 
  icon: string; title: string; value: number | string; color: string; variation?: number; 
}) {
  return (
    <div className="p-6 rounded-xl" style={{ background: 'rgba(13,17,23,0.8)', border: `1px solid ${color}33` }}>
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style={{ background: `${color}1A` }}>
          {icon}
        </div>
        {variation !== undefined && (
          <div className={`flex items-center gap-1 text-[12px] font-medium ${variation >= 0 ? 'text-[#00FF94]' : 'text-[#EF4444]'}`}>
            {variation >= 0 ? '↑' : '↓'} {Math.abs(variation)}%
          </div>
        )}
      </div>
      <div>
        <div className="font-orbitron font-bold text-[36px] mb-1" style={{ color }}>{value}</div>
        <div className="font-sans text-[14px] text-[#94A3B8]">{title}</div>
      </div>
    </div>
  );
}
