import { createClient } from '@supabase/supabase-js';
import { PrismaClient } from "@prisma/client";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase environment variables are not set');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export const prisma = new PrismaClient();
export { supabase };