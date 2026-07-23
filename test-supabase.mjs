import { createClient } from '@supabase/supabase-js';

const url = 'https://tzylrjjjzbmgkmtciubc.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6eWxyampqemJtZ2ttdGNpdWJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MTg3MzMsImV4cCI6MjEwMDM5NDczM30.hZRfnbPYvT1FLm6mvlzowlmb57VJREZVX0EkWRrdcI4';

const supabase = createClient(url, key);

async function test() {
  console.log('Testing connection to Supabase...');
  try {
    const { data, error } = await supabase.from('applications').select('*').limit(1);
    if (error) {
      console.error('Error querying applications table:', error);
    } else {
      console.log('Success! Table exists. Data:', data);
    }
  } catch (err) {
    console.error('Exception:', err);
  }
}

test();
