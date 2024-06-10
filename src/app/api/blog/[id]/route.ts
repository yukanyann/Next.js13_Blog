import { supabase } from "@/utils/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";
import { imageOptimizer } from "next/dist/server/image-optimizer";
import { NextResponse } from "next/server";
import { notFound } from "next/navigation";

export async function GET(req: Request, res: NextApiResponse){
  const id = req.url.split("/blog/")[1];

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

if (error) return NextResponse.json(error);
if (!data) {
    notFound();
 }
return NextResponse.json(data);
}

export async function DELETE(req: Request, res: NextApiResponse) {
    const id = req.url.split("/blog/")[1];
  
    const { error: deleteError } = await supabase
    .from("posts")
    .delete()
    .eq("id", id);
  
    if (deleteError) 
      return NextResponse.json(deleteError);
  
    return NextResponse.json({ status: 200 });
  }