import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pymhikvbgdlpzlsfqfec.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5bWhpa3ZiZ2RscHpsc2ZxZmVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzNTg2ODksImV4cCI6MjA2MzkzNDY4OX0.PiSm7TcphvBkv2GalYRiBP6aJ4Rb54SiTNJPwmcHM2U';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);