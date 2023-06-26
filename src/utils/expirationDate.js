export const generateDate = () => {
  const expires_in = new Date();
  const limit = expires_in.getHours() + 2;
  expires_in.setHours(limit);

  return {
    expires_in: expires_in.getTime(),
    created_at: new Date().getTime()
  };
}

export const verifyDateExpires = (expires) => new Date().getTime() > expires;