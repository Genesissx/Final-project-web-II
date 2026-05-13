import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Supabase URL et anonymouse key requises. Ajoutez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans .env.local'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function signUpWithEmail(email, password, metadata = {}) {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  });
}

export async function signInWithEmail(email, password) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signInWithGoogle() {
  return supabase.auth.signInWithOAuth({ provider: 'google' });
}

export async function signOutUser() {
  return supabase.auth.signOut();
}

export async function createUserProfile(profile) {
  let { data, error } = await supabase
    .from('profiles')
    .insert(profile)
    .select()
    .single();

  if (error && error.message.includes('invalid input syntax for type bigint')) {
    const rest = Object.fromEntries(
      Object.entries(profile).filter(([key]) => key !== 'id'),
    );
    const fallback = await supabase
      .from('profiles')
      .insert(rest)
      .select()
      .single();

    if (fallback.error) {
      console.error('Supabase createUserProfile fallback error:', fallback.error.message);
      throw fallback.error;
    }

    return fallback.data;
  }

  if (error) {
    console.error('Supabase createUserProfile error:', error.message);
    throw error;
  }

  return data;
}

export async function getAllServices() {
  const { data, error } = await supabase.from('services').select('*');
  if (error) {
    console.error('Supabase getAllServices error:', error.message);
    return [];
  }
  return data ?? [];
}

export async function findServiceById(id) {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) {
    console.error('Supabase findServiceById error:', error.message);
    return null;
  }
  return data;
}

export async function addService(service) {
  const normalizedService = {
    ...service,
    id: service.id || `${Date.now()}`,
    rating: service.rating ?? 8.0,
    status: service.status ?? 'Disponible',
  };

  const { data, error } = await supabase
    .from('services')
    .insert(normalizedService)
    .select()
    .single();

  if (error) {
    console.error('Supabase addService error:', error.message);
    throw error;
  }

  return data;
}
