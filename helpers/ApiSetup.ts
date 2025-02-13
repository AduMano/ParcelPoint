import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const supabaseUrl = 'https://nlljvmwgxlnhdinvkofd.supabase.co';
const supabaseKey = Constants.expoConfig?.extra?.SUPABASE_KEY ?? "";
const supabase = createClient(supabaseUrl, supabaseKey);

let cachedApiUrl: string | null = null;

async function fetchApiUrl() {
  if (!cachedApiUrl) {
    const { data, error } = await supabase
      .from('TBL_URL')
      .select('url')
      .eq('name', 'api')
      .single();

    if (error) {
      console.error('Error fetching API URL:', error);
      return null;
    }

    cachedApiUrl = data?.url ? `${data.url}/` : null;
    console.log('Fetched API URL:', cachedApiUrl);
  }
  return cachedApiUrl;
}

export const ApiSetup = {
  get apiUrl(): Promise<string | null> {
    return fetchApiUrl();
  }
};
