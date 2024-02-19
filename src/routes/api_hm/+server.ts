import { json } from '@sveltejs/kit';

export const POST = async ({ request, getClientAddress }) => {
    console.log(new Date().toISOString());
	const { redstone_power } = await request.json();
    
	return json("thanks for post");
};