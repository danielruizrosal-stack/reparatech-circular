import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';

const supabaseAdmin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: currentUser } = await supabase.from('admin_users').select('role').eq('id', user.id).single();
  if (currentUser?.role !== 'superadmin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { data, error } = await supabase.from('admin_users').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ admins: data });
}

export async function POST(request: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: currentUser } = await supabase.from('admin_users').select('role').eq('id', user.id).single();
  if (currentUser?.role !== 'superadmin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { email, name, role } = await request.json();

  const { data: inviteData, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email);
  if (inviteError) return NextResponse.json({ error: inviteError.message }, { status: 500 });

  const { error: dbError } = await supabaseAdmin.from('admin_users').insert([{
    id: inviteData.user.id,
    email,
    name,
    role
  }]);

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });
  return NextResponse.json({ success: true, admin: { id: inviteData.user.id, email, name, role } });
}
