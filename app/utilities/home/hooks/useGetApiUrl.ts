import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const supabaseUrl = 'https://nlljvmwgxlnhdinvkofd.supabase.co';
const supabaseKey = Constants.expoConfig?.extra?.SUPABASE_KEY ?? "";
const supabase = createClient(supabaseUrl, supabaseKey ?? "");

const useGetMemberList = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchAPIUrl = async () => {
    setIsLoading(true);
    setError(null);

    const { data: resultData, error: resultError } = await supabase
    .from('TBL_URL')
    .select('url')
    .eq('name', 'api')
    .single();

    if (!resultError) {
      setData(resultData.url + "/");
    } else {
      setError(resultError);
    }

    setIsLoading(false);
  };

  return { fetchAPIUrl, data, isLoading, error };
};

export default useGetMemberList;
