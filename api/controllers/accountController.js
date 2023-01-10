import registerService from "../services/accountServices/registerService.js";
import loginService from "../services/accountServices/loginService.js";
import logoutService from "../services/accountServices/logoutService.js";
import whoAmIService from "../services/accountServices/whoAmIService.js";
import deleteAccService from "../services/accountServices/deleteService.js";

const register = async (req, res) => {
  await registerService(req, res);
};

const login = async (req, res) => {
  await loginService(req, res);
};

const logout = async (req, res) => {
  await logoutService(req, res);
};

const deleteAcc = async (req, res) => {
  await deleteAccService(req, res);
};

const whoAmI = async (req, res) => {
  await whoAmIService(req, res);
};

export { register, login, logout, whoAmI, deleteAcc };
