exports.handler = async (event) => {
  const auth = event.headers['x-admin-auth'];
  const expectedAuth = `${process.env.ADMIN_USER}|${process.env.ADMIN_PASS}`;
  
  if (auth === expectedAuth) {
    return {
      statusCode: 200,
      body: JSON.stringify({ authorized: true })
    };
  }
  
  return {
    statusCode: 403,
    body: JSON.stringify({ authorized: false })
  };
};
