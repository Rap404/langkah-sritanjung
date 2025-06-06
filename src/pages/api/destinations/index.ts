import { runCors } from "@/lib/cors";
import { supabase } from "@/lib/supabase";
import { Destination } from "@/types/destination";
import { NextApiRequest, NextApiResponse } from "next";
import slugify from "slugify";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const handled = runCors(req, res);
        if (handled) return;

    if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

    if (req.method === "GET") {
        const { data, error } = await supabase
        .from("destination")
        .select('*, destinations_homestays ( homestay (*) ), destinations_transportations ( transportation (*) ), destinations_culinaries ( culinary (*) )')
        .order('created_at', { ascending: true });
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json(data as Destination[]);
    }

    if (req.method === "POST") {
        const { name, location, actions, timelist, image, category_id } = req.body;

        const slug = slugify(name, {
            lower: true,})

        const { data, error } = await supabase
            .from("destination")
            .insert([{ name, slug, location, actions, timelist, image, category_id }])
            .select()
            .single();
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json(data as Destination);
    }
}