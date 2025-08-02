const supabase = require('./_supabase');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Check authentication
  const auth = event.headers['x-admin-auth'];
  const expectedAuth = `${process.env.ADMIN_USER}|${process.env.ADMIN_PASS}`;
  
  if (auth !== expectedAuth) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }

  try {
    const { imageUrl, caption } = JSON.parse(event.body);
    
    const { data, error } = await supabase
      .from('images')
      .insert([{
        image_url: imageUrl,
        caption,
        created_at: new Date().toISOString()
      }]);
    
    if (error) throw error;
    
    return {
      statusCode: 200,
      body: JSON.stringify({ data })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
