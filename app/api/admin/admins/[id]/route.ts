import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';

const supabaseAdmin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: currentUser } = await supabase.from('admin_users').select('role').eq('id', user.id).single();
  if (currentUser?.role !== 'superadmin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  if (user.id === params.id) return NextResponse.json({ error: 'Cannot delete yourself' }, { status: 400 });

  await supabaseAdmin.from('admin_users').delete().eq('id', params.id);
  const { error } = await supabaseAdmin.auth.admin.deleteUser(params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
