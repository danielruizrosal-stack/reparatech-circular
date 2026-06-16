import AdminHeader from '@/components/admin/AdminHeader';

export default function DashboardLoading() {
  return (
    <>
      <AdminHeader title="Cargando Dashboard..." />
      <main className="p-6 md:p-8 animate-pulse">
        {/* Saludo */}
        <div className="mb-10">
          <div className="h-8 w-64 bg-[rgba(255,255,255,0.05)] rounded mb-3"></div>
          <div className="h-4 w-48 bg-[rgba(255,255,255,0.05)] rounded"></div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {[1,2,3,4].map(i => (
            <div key={i} className="p-6 rounded-xl bg-[rgba(13,17,23,0.8)] border border-[rgba(255,255,255,0.05)] h-[140px]"></div>
          ))}
        </div>

        {/* Recientes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {[1,2].map(i => (
            <div key={i} className="bg-[rgba(13,17,23,0.6)] border border-[rgba(255,255,255,0.06)] rounded-xl h-[400px]"></div>
          ))}
        </div>

        {/* Acciones */}
        <div className="h-6 w-40 bg-[rgba(255,255,255,0.05)] rounded mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1,2,3].map(i => (
            <div key={i} className="p-4 rounded-lg bg-[rgba(255,255,255,0.05)] h-14"></div>
          ))}
        </div>
      </main>
    </>
  );
}
