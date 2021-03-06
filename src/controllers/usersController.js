import User from '../models/User';
import Contest from '../models/Contest';

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
