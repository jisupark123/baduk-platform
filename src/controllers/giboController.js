import Gibo from '../models/Gibo';
import User from '../models/User';
import paging from '../utils/paging';

export const getUploadGibo = (req, res) => {
  return res.render('gibo/upload-gibo');
};

export const postUploadGibo = async (req, res) => {
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

export const myGiboList = async (req, res) => {
  const { _id } = req.session.user;
  const { page } = req.query;
  try {
    const totalPost = await Gibo.countDocuments({ owner: _id });
    if (!totalPost) throw Error();
    const { startPage, endPage, hidePost, maxPost, totalPage, currentPage } =
      paging(page, totalPost);
    const gibos = await Gibo.find({ owner: _id })
      .sort({ createdAt: -1 })
      .skip(hidePost)
      .limit(maxPost);
    return res.render('gibo/my-gibo-list', {
      gibos,
      startPage,
      endPage,
      maxPost,
      totalPage,
      currentPage,
    });
  } catch {}
  return res.render('gibo/my-gibo-list', { gibos: [] });
};

export const watchGibo = async (req, res) => {
  const { id } = req.params;
  try {
    const gibo = await Gibo.findById(id);
    res.render('gibo/watch-gibo', { gibo });
  } catch {
    return;
  }
};
