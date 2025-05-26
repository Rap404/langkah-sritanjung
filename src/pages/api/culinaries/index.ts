import { supabase } from "@/lib/supabase";
import { Culinary } from "@/types/culinary";
import { NextApiRequest, NextApiResponse } from "next";
import slugify from "slugify";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { data, error } = await supabase.from("culinary").select('*').order('created_at', { ascending: false });
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json(data as Culinary[]);
    }

    if (req.method === "POST") {
        const { name, description, address, telephone, price, url, image } = req.body;

        const slug = slugify(name, {
            lower: true,
        });
        
        const { data, error } = await supabase
            .from("culinary")
            .insert([{ name, slug, description, address, telephone, price, url, image }])
            .select()
            .single();
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json(data as Culinary);
    }
}