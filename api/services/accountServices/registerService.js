import prisma from "../../constants/config.js";
import bcrypt from "bcryptjs";

const registerService = async (req, res) => {
  try {
    const { email, firstName, lastName, password, role } = req.body;
    const emailExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create user
    const account = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        password: hashedPassword,
        userRole: role,
      },
    });

    req.session.userId = account.id;
    return res.status(200).json({ message: "Account Created Successfully" });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: e?.message });
  }
};

export default registerService;
