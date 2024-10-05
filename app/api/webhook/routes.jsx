const { Webhook } = require('svix');
const { headers } = require('next/headers');
const { WebhookEvent } = require('@clerk/nextjs/server');
const { setUser } = require('@/lib/actions/user.action');
const { NextResponse } = require('next/server');

module.exports.POST = async function(req) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.NEXT_CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred', {
      status: 400,
    });
  }

  const eventType = evt.type;

  // Handle user creation event
  if (eventType === 'user.created') {
    const { id: userId, username: userName } = evt.data;

    try {
      // Set the user in the database
      const mongoUser = await setUser({
        user: { userId, userName }
      });

      return NextResponse.json({ message: 'User created successfully', user: mongoUser });
    } catch (error) {
      console.error('Error setting user in the database:', error);
      return NextResponse.json({ message: 'Error setting user in the database' }, { status: 500 });
    }
  }

  return new Response('', { status: 200 });
};
