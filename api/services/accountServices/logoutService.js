const logoutService = async (req, res) => {
  try {
    if (req?.session?.userId) {
      req.session.destroy();
      return res.status(401).json({
        message: "Logged out",
      });
    } else {
      return res.status(401).json({
        message: "Not logged in",
      });
    }
  } catch (e) {
    return res.status(401).json({
      message: "Something went wrong",
    });
  }
};

export default logoutService;
