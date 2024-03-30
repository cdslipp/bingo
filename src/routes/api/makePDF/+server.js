import { PRINT_FRIENDLY_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const { html } = await request.json();

	try {
		const response = await fetch(
			`https://api.printfriendly.com/v2/pdf/create?api_key=${PRINT_FRIENDLY_API_KEY}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
				},
				body: `html=${encodeURIComponent(html)}`
			}
		);

		const data = await response.json();

		if (data.status === 'success') {
			console.log('PDF generated:', data.file_url);
			return json({ status: 'success', file_url: data.file_url });
		} else {
			console.error('Failed to generate PDF');
			return { status: 500, message: 'Failed to generate PDF' };
		}
	} catch (error) {
		console.error('Error generating PDF:', error);
		return { status: 'error', message: error.message };
	}
}
