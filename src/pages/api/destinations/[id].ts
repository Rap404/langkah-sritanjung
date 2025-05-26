import { supabase } from "@/lib/supabase";
import { Destination } from "@/types/destination";
import { NextApiRequest, NextApiResponse } from "next";
import slugify from "slugify";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === "GET") {
        const { data, error } = await supabase
            .from("destination")
            .select("*")
            .eq("slug", id)
            .single();

        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json(data as Destination);
    }

    if (req.method === "PUT") {
        const { name, location, actions, timelist, image, transportations, homestays, culinaries } = req.body;

        const slug = slugify(name, {
                    lower: true,})

        const { data, error } = await supabase
            .from("destination")
            .update({ name, slug, location, actions, timelist, image, transportations, homestays, culinaries })
            .eq("id", id)
            .select()
            .single();

        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json(data as Destination);
    }

    if (req.method === "DELETE") {
        const { error } = await supabase.from("destination").delete().eq("id", id);
        if (error) return res.status(500).json({ error: error.message });
        return res.status(204).end();
    }
}