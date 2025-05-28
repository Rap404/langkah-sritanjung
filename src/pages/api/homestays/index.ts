import { runCors } from "@/lib/cors";
import { supabase } from "@/lib/supabase";
import { Homestay } from "@/types/homestay";
import { NextApiRequest, NextApiResponse } from "next";
import slugify from "slugify";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    const handled = runCors(req, res);
            if (handled) return;
    
        if (req.method === "OPTIONS") {
        return res.status(200).end();
      }

    if (req.method === "GET") {
        const { data, error } = await supabase.from("homestay").select('*').order('created_at', { ascending: false });
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json(data as Homestay[]);
    }

    if (req.method === "POST") {
        const { name, description, address, telephone, price, url, image } = req.body;

        const slug = slugify(name, {
            lower: true,
        });
        
        const { data, error } = await supabase
            .from("homestay")
            .insert([{ name, slug, description, address, telephone, price, url, image }])
            .select()
            .single();
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json(data as Homestay);
    }
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}