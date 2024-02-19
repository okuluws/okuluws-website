import { json } from '@sveltejs/kit';

let a = 0;
export const POST = async ({ request, getClientAddress }) => {
    console.log(new Date().toISOString());
	const { redstone_power } = await request.json();
    
	return json("thanks for post");
};

export const GET = async () => {
    console.log("received get");
    a += 1;
    console.log(a);
    
	return json("hello get");
};