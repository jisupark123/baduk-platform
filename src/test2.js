/*
You DONT have to import the User with your username.
Because it's a default export we can nickname it whatever we want.
So import User from "./models"; will work!
You can do User.find() or whatever you need like normal!
*/
import User from "./models/User";

// Add your magic here!

export const home = (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect("/login");
  }
  return res.render("home", { pageTitle: "home" });
};
export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res) => {
  const { username, name, password, password2 } = req.body;
  const pageTitle = "Join";
  if (password !== password2) {
    return res.render("join", {
      pageTitle,
      errorMessage: "비밀번호가 다릅니다",
    });
  }
  const usernameExists = await User.exists({ username });
  if (usernameExists) {
    return res.render("join", {
      pageTitle,
      errorMessage: "이미 존재하는 아이디입니다",
    });
  }

  try {
    await User.create({
      username,
      name,
      password,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: error._message,
    });
  }
};
export const getlogin = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "Login";
  const user = await User.findOne({ username });
  if (!user) {
    return res.render("login", {
      pageTitle,
      errorMessage: "존재하지 않는 아이디입니다.",
    });
  }
  const checkingPW = await bcrypt.compare(password, user.password);
  if (!checkingPW) {
    return res.render("login", {
      pageTitle,
      errorMessage: "잘못된 비밀번호입니다.",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};
