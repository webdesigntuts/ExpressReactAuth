import prisma from "../../constants/config.js";

const deleteAccService = async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: req?.session?.userId,
      },
    });
    req.session.destroy();
    return res.status(200).json({ message: "Account Deleted Successfully" });
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      message: "Something went wrong",
    });
  }
};

export default deleteAccService;
