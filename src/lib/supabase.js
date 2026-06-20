import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aatujtxhqxjnqyqvmihr.supabase.co';
const supabaseAnonKey = 'sb_publishable_VCyGK1m5VM2Ia6sp3v7qnw_AFmpkv1f';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
