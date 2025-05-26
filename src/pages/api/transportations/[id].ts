import { supabase } from "@/lib/supabase";
import { Homestay } from "@/types/homestay";
import { Transportation } from "@/types/transportation";
import { NextApiRequest, NextApiResponse } from "next";
import slugify from "slugify";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === "GET") {
        const { data, error } = await supabase
            .from("transportation")
            .select("*")
            .eq("slug", id)
            .single();

        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json(data as Transportation);
    }

    if (req.method === "PUT") {
        const { name, description, address, telephone, price, url, image } = req.body;
        
        const slug = slugify(name, {lower: true});

        const { data, error } = await supabase
            .from("transportation")
            .update({ name, slug, description, address, telephone, price, url, image })
            .eq("id", id)
            .select()
            .single();
        
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json(data as Transportation);
    }

    if (req.method === "DELETE") {
        const { error } = await supabase.from("transportation").delete().eq("id", id);
        if (error) return res.status(500).json({ error: error.message });
        return res.status(204).end();
    }
}