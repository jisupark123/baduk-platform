import Notice from '../models/Notice';
import User from '../models/User';
import bcrypt from 'bcrypt';

export const home = (req, res) => {
  return res.render('home');
};

export const getJoin = (req, res) => {
  return res.render('join');
};

export const postJoin = async (req, res) => {
  const { name, userId, password, password2, email } = req.body;
  if (password !== password2) {
    return res
      .status(400)
      .render('join', { errorMessage: '비밀번호가 다릅니다' });
  }
  // const userIdExists = await User.exists({ userId });
  // if (userIdExists) {
  //   return res
  //     .status(400)
  //     .render("join", { errorMessage: "이미 존재하는 아이디입니다" });
  // }
  // 따로 버튼 만들어서 아이디 중복검사
  const emailExists = await User.exists({ email });
  if (emailExists) {
    return res
      .status(400)
      .render('join', { errorMessage: '이미 존재하는 이메일입니다' });
  }
  try {
    await User.create({
      name,
      userId,
      password,
      email,
    });
    return res.redirect('/login');
  } catch (error) {
    return res.status(400).render('join', {
      errorMessage: error._message,
    });
  }
};

export const getLogin = (req, res) => {
  return res.render('login');
};

export const postLogin = async (req, res) => {
  const { userId, password } = req.body;
  const user = await User.findOne({ userId, socialOnly: false });
  if (!user) {
    return res.status(400).render('login', {
      errorMessage: '존재하지 않는 아이디입니다.',
    });
  }
  const checkingPW = await bcrypt.compare(password, user.password);
  if (!checkingPW) {
    return res.status(400).render('login', {
      errorMessage: '잘못된 비밀번호입니다.',
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect('/');
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect('/');
};

export const notices = async (req, res) => {
  const notices = await Notice.find({});
  return res.render('notices', { notices });
};

export const noticeView = async (req, res) => {
  const { id } = req.params;
  const notice = await Notice.findById(id);
  return res.render('noticeView', { notice });
};

export const dashboard = (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect('/login');
  }
  return res.render('dashboard');
};

export const recorder = (req, res) => {
  return res.render('recorder');
};
