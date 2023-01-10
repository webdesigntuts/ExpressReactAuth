import prisma from "../../constants/config.js";
import bcrypt from "bcryptjs";

const loginService = async (req, res) => {
  const { email, password } = req.body;
  try {
    //check if mail exists
    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });
    if (!user) {
      return res.status(400).json({
        authed: false,
        message: "Invalid Credentials",
      });
    }
    //check if password is correct
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      return res.status(400).json({
        authed: false,
        message: "Invalid Credentials",
      });
    }
    //if it is
    req.session.userId = user.id;
    return res.status(200).json({
      message: req.session.userId,
    });
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      authed: false,
      message: "Something went wrong",
    });
  }
};

export default loginService;
