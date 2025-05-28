import { runCors } from "@/lib/cors";
import { supabase } from "@/lib/supabase";
import { Homestay } from "@/types/homestay";
import { NextApiRequest, NextApiResponse } from "next";
import slugify from "slugify";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const handled = runCors(req, res);
            if (handled) return;
    
            const { id } = req.query;

        if (req.method === "OPTIONS") {
        return res.status(200).end();
      }

    if (req.method === "GET") {
        const { data, error } = await supabase
            .from("homestay")
            .select("*")
            .eq("slug", id)
            .single();

        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json(data as Homestay);
    }

    if (req.method === "PUT") {
        const { name, description, address, telephone, price, url, image } = req.body;
        
        const slug = slugify(name, {lower: true});

        const { data, error } = await supabase
            .from("homestay")
            .update({ name, slug, description, address, telephone, price, url, image })
            .eq("id", id)
            .select()
            .single();
        
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json(data as Homestay);
    }

    if (req.method === "DELETE") {
        const { error } = await supabase.from("homestay").delete().eq("id", id);
        if (error) return res.status(500).json({ error: error.message });
        return res.status(204).end();
    }

     res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}