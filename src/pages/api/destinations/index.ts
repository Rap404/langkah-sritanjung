import { runCorsMiddleware } from "@/lib/cors";
import { supabase } from "@/lib/supabase";
import { Destination } from "@/types/destination";
import { NextApiRequest, NextApiResponse } from "next";
import slugify from "slugify";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    await runCorsMiddleware(req, res);

    if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

    if (req.method === "GET") {
        const { data, error } = await supabase.from("destination").select('*').order('created_at', { ascending: false });
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json(data as Destination[]);
    }

    if (req.method === "POST") {
        const { name, description, address, telephone, price, url, image } = req.body;

        const slug = slugify(name, {
            lower: true,})

        const { data, error } = await supabase
            .from("destination")
            .insert([{ name, slug, description, address, telephone, price, url, image }])
            .select()
            .single();
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json(data as Destination);
    }
}