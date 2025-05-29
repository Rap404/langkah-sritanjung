import { runCors } from "@/lib/cors";
import { supabase } from "@/lib/supabase";
import { Category } from "@/types/category";
import { NextApiRequest, NextApiResponse } from "next";
import slugify from "slugify";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const handled = runCors(req, res);
            if (handled) return;
    
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method === "GET"){
        const { data, error } = await supabase.from("category").select('*, destination(*)').order('created_at', { ascending: false });
        if (error) {
            return res.status(500).json({ error: error.message });
        } else {
            return res.status(200).json(data as Category[]);
        }
    }

    if (req.method === "POST") {
        const { name } = req.body as Category;
        const slug = slugify(name, {
            lower: true})
        const { data, error } = await supabase
        .from("category")
        .insert([{ name, slug }])
        .select()
        .single();
        if (error) {
            return res.status(500).json({ error: error.message });
        } else {
            return res.status(200).json(data as Category);
        }
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}