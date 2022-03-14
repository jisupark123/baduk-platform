import User from '../models/User';
import Contest from '../models/Contest';
import Gibo from '../models/Gibo';

export const startKakaoLogin = (req, res) => {};

export const calendar = async (req, res) => {
  const { contestFilter } = await User.findById(req.session.user._id);
  const contests = await Contest.find({});
  return res.render('calendar', { contests, contestFilter });
};

export const getContestFilter = (req, res) => {
  return res.render('contest-filter');
};

export const postContestFilter = async (req, res) => {
  const { name, sex, age, school, belongNow, belongPre } = req.body;
  const user = await User.findById(req.session.user._id);
  user.contestFilter = {
    name,
    sex,
    age,
    school,
    belongNow,
    belongPre,
  };
  await user.save();
  return res.redirect('/users/calendar');
};
export const getMakeGibo = (req, res) => {
  return res.render('make-gibo');
};

export const saveGibo = async (req, res) => {
  const { title, blackPlayer, whitePlayer, adventage, result, record } =
    req.body;
  const { _id } = req.session.user;
  try {
    const user = await User.findById(_id);
    const gibo = await Gibo.create({
      title,
      blackPlayer,
      whitePlayer,
      adventage,
      result,
      gibo: record,
      owner: user._id,
    });
    user.gibos.push(gibo._id);
    user.save();
    return res.sendStatus(201);
  } catch (error) {
    return res.status(400).json({ errorMessage: error._message });
  }
};
