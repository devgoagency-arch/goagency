import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
	const data = await request.formData();
	const name = data.get("name")?.toString();
	const phone = data.get("phone")?.toString() || "Not provided";
	const email = data.get("email")?.toString();
	const details = data.get("details")?.toString() || "No details";
	const pillars = data.getAll("pillars").join(", ") || "None";
	const turnstileToken = data.get("cf-turnstile-response")?.toString();

	if (!name || !email || !turnstileToken) {
		return new Response(JSON.stringify({ error: "Missing required fields or CAPTCHA validation." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
	}

	// Verify Turnstile
	const secretKey = import.meta.env.TURNSTILE_SECRET_KEY || process.env.TURNSTILE_SECRET_KEY;
	if (secretKey) {
		const verifyResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `secret=${secretKey}&response=${turnstileToken}`,
		});

		const verifyResult = await verifyResponse.json();

		if (!verifyResult.success) {
			return new Response(JSON.stringify({ error: "Security validation (CAPTCHA) failed." }), {
				status: 400,
				headers: { "Content-Type": "application/json" }
			});
		}
	} else {
		console.warn("No TURNSTILE_SECRET_KEY found. Skipping Turnstile verification.");
	}

	// Send Email via Resend
	const resendApiKey = import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY;
	if (resendApiKey) {
		const resendResponse = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${resendApiKey}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				from: "Go Agency Web <onboarding@resend.dev>", // Resend testing domain (will only send to your verified Resend account email)
				to: "hola@goestrategiacreativa.com",
				subject: `New Web Lead: ${name}`,
				html: `
					<h2>New contact request</h2>
					<p><strong>Name:</strong> ${name}</p>
					<p><strong>Email:</strong> ${email}</p>
					<p><strong>Phone:</strong> ${phone}</p>
					<p><strong>Pillars:</strong> ${pillars}</p>
					<p><strong>Details:</strong><br/> ${details}</p>
				`,
			}),
		});

		if (!resendResponse.ok) {
			const resendError = await resendResponse.json();
			return new Response(JSON.stringify({ error: "Error sending email.", details: resendError }), {
				status: 500,
				headers: { "Content-Type": "application/json" }
			});
		}
	} else {
		console.warn("No RESEND_API_KEY found. Simulating success.");
	}

	return new Response(JSON.stringify({ success: true, message: "Message sent successfully." }), {
		status: 200,
		headers: { "Content-Type": "application/json" }
	});
};
