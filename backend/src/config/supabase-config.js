import { createClient } from "@supabase/supabase-js";
import { config } from "./config.js";

const SUPABASE_URL = config.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = config.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const BUCKET_NAME = "uploads";

export { supabase, BUCKET_NAME };
