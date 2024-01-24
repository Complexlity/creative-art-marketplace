import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import { subscribeSchema } from "~/utils/schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // let error = false
  if (req.method === "POST") {
    let supabase;
    // const resendApiKey = process.env.RESEND_API_KEY;
    try {
      supabase = createPagesServerClient({ req, res });
    } catch (err) {
      // Ensures this does not throw on the client
      console.log({err})
    }
    if (!supabase) {
      //catches both errors here
      return res
        .status(500)
        .json({ success: false, message: "Something Went wrong" });
    }

    let email = req.body

    try {
      email = await subscribeSchema.validate({ email });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Invalid Email" });
    }
    // TODO: Get a domain and verify to send emails
    // const resend = new Resend(process.env.RESEND_API_KEY);

      const { data, error } = await supabase
        .from('subscribers')
        .insert([
          { email },
        ])

    if (error) {

      if (error.code == "23505") {
        return res.status(200).json({
          success: true, message: "Already A Subscriber"
        })
      }
      return res.status(400).json({
        success: false, message: error.message
      })
        }

    return res.status(200).json({
      success: true, message: "Successfully Subscribed"
    });
  }
}
