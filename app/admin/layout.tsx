import AdminSidebar from '@/components/admin/AdminSidebar';
import { Space_Grotesk, Inter, Orbitron } from 'next/font/google';
import '../[lang]/globals.css';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' });

export const metadata = {
  title: 'Panel de Administración - ReparaTech Circular',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${inter.variable} ${orbitron.variable}`}>
      <body className="font-sans flex min-h-screen" style={{ background: '#020817', color: '#F8FAFC' }}>
        <div className="flex-1 flex flex-col min-w-0">
          {children}
        </div>
      </body>
    </html>
  );
}
