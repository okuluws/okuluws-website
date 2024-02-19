import { json } from '@sveltejs/kit';

export const POST = async ({ request, getClientAddress }) => {
    console.log("[" + new Date().toUTCString() + " | " + getClientAddress() + "] " + await request.text());
    
	return json("thanks for post");
};