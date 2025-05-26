import { supabase } from "@/lib/supabase";
import { Category } from "@/types/category";
import { NextApiRequest, NextApiResponse } from "next";
import slugify from "slugify";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === "GET") {
        const { data, error } = await supabase
            .from("category")
            .select("*")
            .eq("slug", id)
            .single();

        if (error) {
            return res.status(500).json({ error: error.message });
        } else {
            return res.status(200).json(data as Category);
        }
    }

    if (req.method === "PUT") {
        const { name, destinations } = req.body;
        
        const slug = slugify(name, {
            lower: true,})

        const { data, error } = await supabase
            .from("category")
            .update({ name, destinations, slug })
            .eq("id", id)
            .select()
            .single();

        if (error) {
            return res.status(500).json({ error: error.message });
        } else {
            return res.status(200).json(data as Category);
        }
    }

    if (req.method === "DELETE") {
        const { error } = await supabase.from("category").delete().eq("id", id);
        if (error) {
            return res.status(500).json({ error: error.message });
        } else {
            return res.status(204).end();
        }
    }

    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}