import prisma from "../../constants/config.js";

const whoAmIService = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req?.session?.userId,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        userRole: true,
      },
    });

    //this must not happen
    if (!user) return res.status(401).json({ authed: false });

    return res.status(200).json({
      authed: true,
      user,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Something Went Wrong" });
  }
};

export default whoAmIService;
