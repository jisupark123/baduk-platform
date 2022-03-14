import Notice from '../models/Notice';
import Contest from '../models/Contest';
import LDQuestion from '../models/LDQuestion';

export const bookedPhoneNumber = async (req, res) => {
  return res.render('manage/booked');
};

const todayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  const dateString = year + '-' + month + '-' + day;
  return dateString;
};

export const manageNotices = async (req, res) => {
  const notices = await Notice.find({});
  return res.render('manage/manageNotices', { notices });
};

export const getNoticeUpload = (req, res) => {
  return res.render('manage/notice-upload');
};

export const postNoticeUpload = async (req, res) => {
  const { title, content, isImportant } = req.body;
  await Notice.create({
    title,
    content,
    writtenAt: todayDate(),
    isImportant: isImportant ? true : false,
  });
  return res.redirect('/manage/notices');
};

export const deleteNotices = async (req, res) => {
  let ids = req.query.notice;
  if (!ids) {
    return res.redirect('/manage/notices');
  }
  if (!Array.isArray(ids)) {
    ids = Array(ids);
  }
  for (const id of ids) {
    await Notice.deleteOne({
      _id: id,
    });
  }
  return res.redirect('/manage/notices');
};

export const getUploadContest = (req, res) => {
  return res.render('manage/contest-upload');
};

export const postUploadContest = async (req, res) => {
  const body = req.body;
  let sections = {};
  let i = 1;
  let type;
  let value;
  while (body[`sectionName${i}`]) {
    sections[`S${i}`] = {};
    sections[`S${i}`]['sectionName'] = body[`sectionName${i}`];
    sections[`S${i}`]['requirementTypes'] =
      body[`section${i}-requirement-type`];
    sections[`S${i}`]['requirementValues'] =
      body[`section${i}-requirement-value`];
    sections[`S${i}`]['excludeTypes'] = body[`section${i}-exclude-type`];
    sections[`S${i}`]['excludeValues'] = body[`section${i}-exclude-value`];

    const rOrt = body[`section${i}-requirementOr-type`];
    const rOrv = body[`section${i}-requirementOr-value`];
    let idx = 0;
    let obj;
    sections[`S${i}`]['requirementOr'] = [];
    while (idx < rOrt.length) {
      if (!rOrt[idx] || !rOrv[idx] || !rOrt[idx + 1] || !rOrv[idx + 1]) {
        break;
      }
      obj = {};
      for (let k = 0; k < 2; k++) {
        obj[`${rOrt[idx]}`] = rOrv[idx];
        obj[`${rOrt[idx + 1]}`] = rOrv[idx + 1];
      }
      sections[`S${i}`]['requirementOr'].push(obj);
      idx += 2;
    }

    const eAndt = body[`section${i}-excludeAnd-type`];
    const eAndv = body[`section${i}-excludeAnd-value`];
    idx = 0;
    sections[`S${i}`]['excludeAnd'] = [];
    while (idx < eAndt.length) {
      if (!eAndt[idx] || !eAndv[idx] || !eAndt[idx + 1] || !eAndv[idx + 1]) {
        break;
      }
      obj = {};
      for (let k = 0; k < 2; k++) {
        obj[`${eAndt[idx]}`] = eAndv[idx];
        obj[`${eAndt[idx + 1]}`] = eAndv[idx + 1];
      }
      sections[`S${i}`]['excludeAnd'].push(obj);
      idx += 2;
    }

    i++;
  }
  try {
    const contest = await Contest.create({
      title: body.title,
      link: body.link,
    });
    for (let date of body.dates) {
      if (date) {
        contest.dates.push(date);
      }
    }
    for (let section in sections) {
      contest.sections.push(sections[section]);
    }
    await contest.save();
    return res.status(201).redirect('/');
  } catch (error) {
    return res.status(400).render('manage/contest-upload', {
      errorMessage: error,
    });
  }
};

export const getUploadQuestion = (req, res) => {
  res.render('manage/question-upload');
};
export const getUploadAnswer = (req, res) => {
  res.render('manage/answer-upload');
};
export const getUploadFailure = (req, res) => {
  res.render('manage/failure-upload');
};

export const postSaveQuestion = async (req, res) => {
  const { board, turn, answer, failures, title } = req.body.question;
  try {
    await LDQuestion.create({
      board,
      turn,
      answer,
      failures,
      title,
    });
    return res.sendStatus(201);
  } catch (error) {
    return res.status(404);
  }
};
