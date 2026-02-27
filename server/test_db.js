const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

const supabaseUrl = process.env.SUPABASE_URL.replace(/"/g, "");
const supabaseKey = process.env.SUPABASE_ANON_KEY.replace(/"/g, "");
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase
    .from("gallery")
    .insert([
      {
        id: uuidv4(),
        url: "https://example.com/test.png",
        category: "Other",
        caption: "Test",
        dateAdded: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  console.log("Supabase Insert Error:", error);
  console.log("Supabase Insert Data:", data);
}
test();
