import { API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';

export const POST = async ({ request, getClientAddress }) => {
    console.log(`[${new Date().toUTCString()}][${getClientAddress()}][POST]`);
    console.log(await request.text())
    const req = await request.json();
    if (req.API_KEY !== API_KEY) {
        console.log("api key was wrong/missing");
        return json("api key was wrong/missing");
    }

    console.log(`power: ${req.power}`)
	return json("thanks for post");
};