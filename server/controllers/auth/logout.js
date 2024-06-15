const { StatusCodes } = require("http-status-codes");

const Logout = async (req, res) => {
  res.clearCookie("Token", {
    httpOnly: true,
    secure: true,
    path: "/",
    expires: new Date(0),
    sameSite: "Strict",
  });

  res.status(StatusCodes.OK).json({ message: "Logout successful" });
};

module.exports = { Logout };
