const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.SUPABASE_URL?.replace(/"/g, "");
const supabaseKey = process.env.SUPABASE_ANON_KEY?.replace(/"/g, "");
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  console.log("URL:", supabaseUrl);
  const { data, error } = await supabase.storage.getBucket("images");
  console.log("Bucket check error:", error);

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("images")
    .upload("test_" + Date.now() + ".txt", "hello world", { upsert: true });

  console.log("Upload data:", uploadData);
  console.log("Upload error:", uploadError);
}

test();
