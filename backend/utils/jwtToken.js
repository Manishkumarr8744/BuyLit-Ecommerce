const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  const options = {
    httpOnly: true,
    expires: new Date(
      24 * 60 * 60 * 1000
    ),
    secure: true,
    sameSite:'none',
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
