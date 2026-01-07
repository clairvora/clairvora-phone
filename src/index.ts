export interface Env {
	DB: D1Database;
	TWILIO_ACCOUNT_SID: string;
	TWILIO_AUTH_TOKEN: string;
	TWILIO_PHONE_NUMBER: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);

		// CORS headers
		const corsHeaders = {
			'Access-Control-Allow-Origin': '*', // TODO: Restrict in production
			'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		};

		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: corsHeaders });
		}

		// Health check
		if (url.pathname === '/health') {
			return new Response('OK', { headers: corsHeaders });
		}

		// TwiML endpoints will go here:
		// POST /twiml/client - TwiML for client leg of call
		// POST /twiml/advisor - TwiML for advisor leg of call
		// POST /status-callback - Twilio status updates
		// POST /initiate - Start a new call

		return new Response('Clairvora Phone Service', {
			headers: corsHeaders,
		});
	},
};
