import { createClient } from "@supabase/supabase-js";

console.log(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

const supabase = createClient(
    process.env.SUPABASE_URL||"https://kytsxhzbvhzzlkhegbhu.supabase.co",
    process.env.SUPABASE_ANON_KEY||"sb_publishable_OF4HuTe4U1lSTY8aIMTe3A_5wQTb0_l"
);

export default supabase;