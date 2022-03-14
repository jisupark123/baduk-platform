(() => {
  let date = new Date();
  const MINI_WINDOW_CLASSNAME = 'mini-window';
  const renderCalendar = () => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const preLast = new Date(year, month - 1, 0); // 지난달 마지막 날
    const thisLast = new Date(year, month, 0); // 이번달 마지막 날
    const PLDate = preLast.getDate();
    const PLDay = preLast.getDay();
    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();

    const preDates = [];
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);
    const nextDates = [];

    if (PLDay !== 6) {
      // 저번달 마지막날이 토요일이면 필요없음
      for (let i = 0; i <= PLDay; i++) {
        preDates.unshift(PLDate - i);
      }
    }

    const rowCount =
      (TLDate === 31 && (PLDay === 4 || PLDay === 5)) ||
      (TLDate === 30 && PLDay === 5)
        ? 7
        : 14;

    for (let i = 1; i < rowCount - TLDay; i++) {
      nextDates.push(i);
    }
    const dates = preDates.concat(thisDates, nextDates);
    const firstDateIndex = dates.indexOf(1);
    const lastDateIndex =
      dates.indexOf(TLDate) > 10
        ? dates.indexOf(TLDate)
        : dates.lastIndexOf(TLDate);

    dates.forEach((date, i) => {
      const condition =
        i >= firstDateIndex && i <= lastDateIndex ? 'this' : 'other';

      dates[
        i
      ] = `<div class="calendar__date"><div class=${condition}>${date}</div></div>`;
    });
    document.querySelector('.calendar__dates').innerHTML = dates.join('');
    document.querySelector(
      '.calendar__year-month'
    ).innerText = `${year}년 ${month}월`;

    // 오늘 날짜 그리기
    const today = new Date();
    const todayDate = today.getDate();
    if (year === today.getFullYear() && month === today.getMonth() + 1) {
      for (let date of document.querySelectorAll('.this')) {
        if (+date.innerText === todayDate) {
          date.classList.add('today');
          break;
        }
      }
    }
  };

  const filter = (contests, contestfilter) => {
    const possibleContests = [];
    for (let contest of contests) {
      let contestPossible = false; // 대회 전체 가능 여부 (테스트를 하나라도 통과하면 true로 바뀜)
      let { title, link, dates, sections } = contest;
      let contestObj = {};
      let sectionList = [];
      for (let section of sections) {
        let sectionPossible = true; // 각 부문별 가능 여부 (테스트를 하나라도 탈락하면 false로 바뀜)
        let RT = section.requirementTypes;
        let RV = section.requirementValues;
        let RO = section.requirementOr;
        let ET = section.excludeTypes;
        let EV = section.excludeValues;
        let EA = section.excludeAnd;
        for (let i in RT) {
          if (RT[i] && contestfilter[RT[i]] !== RV[i]) {
            // 필수 조건 (값에 해당되지 않으면 제외)
            sectionPossible = false;
            break;
          }
          if (ET[i] && contestfilter[ET[i] === EV[i]]) {
            // 제외 조건 (값에 해당되면 제외)
            sectionPossible = false;
            break;
          }
        }
        if (RO.length) {
          // 필수 조건(or) (2개의 값 중 하나라도 true면 통과)
          for (let i in RO) {
            let extraPossible = 0;
            for (let key in RO[i]) {
              // 2번 반복
              if (key === 'age-over') {
                extraPossible += contestfilter.age <= RO[i][key]; // 2002년생 기준일 때 2002년생까지 통과
              } else if (key === 'age-under') {
                extraPossible += contestfilter.age > RO[i][key];
              } else {
                extraPossible += contestfilter.age === RO[i][key];
              }
            }

            if (!extraPossible) {
              sectionPossible = false;
              break;
            }
          }
        }
        if (EA.length) {
          // 제외 조건(and) (2개의 값 모두 일치하면 제외)
          for (let i in EA) {
            let extraPossible = 0;
            for (let key in EA[i]) {
              // 2번 반복
              if (key === 'age-over') {
                extraPossible += contestfilter.age > EA[i][key]; // 2002년생 기준일 때 2002년 생이면 탈락 2003년 생이면 통과
              } else if (key === 'age-under') {
                extraPossible += contestfilter.age <= EA[i][key];
              } else {
                extraPossible += contestfilter.age !== EA[i][key];
              }
            }
            if (!extraPossible) {
              sectionPossible = false;
              break;
            }
          }
        }
        if (sectionPossible === true) {
          contestPossible = true;
          sectionList.push(section.sectionName);
        }
      }
      if (contestPossible === true) {
        possibleContests.push({
          title,
          link,
          dates,
          sections: sectionList,
        });
      }
    }
    return possibleContests;
  };

  const renderContest = (contests, contestfilter) => {
    // 날짜별로 id 추가
    const yearMonth = document.querySelector('.calendar__year-month').innerText;
    const year = Number(yearMonth.slice(0, 4));
    const month = Number(
      yearMonth.length === 9
        ? yearMonth.slice(-3, yearMonth.length - 1)
        : yearMonth.slice(-2, yearMonth.length - 1)
    );
    const dateCells = document.querySelectorAll('.calendar__date');
    for (let dateCell of dateCells) {
      dateCell.innerHTML += "<div class='calendar__contest'></div>";

      const date = dateCell.innerText.padStart(2, '0');
      if (dateCell.querySelector('.this')) {
        dateCell.id = `${year}${month}${date}`;
      } else {
        if (date > 15) {
          month === 1
            ? (dateCell.id = `${year - 1}${month + 11}${date}`)
            : (dateCell.id = `${year}${month - 1}${date}`);
        } else {
          month === 12
            ? (dateCell.id = `${year + 1}${month - 11}${date}`)
            : (dateCell.id = `${year}${month + 1}${date}`);
        }
      }
    }
    // 해당되는 날짜에 대회 추가
    const possibleContests = filter(contests, contestfilter);
    for (let contest of contests) {
      let { title, link, dates, sections } = contest;
      const viewSectionNames = '';
      for (let section of sections) {
        viewSectionNames += `<span>${section.sectionName}</span>`;
      }
      for (let d of dates) {
        let contestDate = d.split('-');
        contestDate =
          contestDate[0] + contestDate[1] + contestDate[2].slice(0, 2);
        for (let dateCell of dateCells) {
          if (dateCell.id === contestDate) {
            const contestBox = dateCell.querySelector('.calendar__contest');
            contestBox.innerText = title;
            dateCell.addEventListener('mouseenter', () => {
              contestBox.classList.add(MINI_WINDOW_CLASSNAME);
              contestBox.innerHTML = `<span>${title}</span><span><추천></span>${viewSectionNames}<a href=${link}>${link}</span>`;
            });
            dateCell.addEventListener('mouseleave', () => {
              contestBox.classList.remove(MINI_WINDOW_CLASSNAME);
              contestBox.innerHTML = title;
            });
          }
        }
      }
    }
  };

  const toPreMonth = () => {
    date.setDate(1);
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
    renderContest(contests, contestfilter);
  };
  const toNextMonth = () => {
    date.setDate(1);
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
    renderContest(contests, contestfilter);
  };
  const thisMonth = () => {
    date = new Date();
    renderCalendar();
    renderContest(contests, contestfilter);
  };

  const preMonthBtn = document.querySelector('.go-pre');
  const nextMonthBtn = document.querySelector('.go-next');
  const calendar = document.querySelector('.calendar');
  const contests = calendar.dataset.contests
    ? JSON.parse(calendar.dataset.contests)
    : undefined;
  const contestfilter = calendar.dataset.contestfilter
    ? JSON.parse(calendar.dataset.contestfilter)
    : undefined;

  renderCalendar();
  if (contests && contestfilter) {
    renderContest(contests, contestfilter);
  }

  preMonthBtn.addEventListener('click', toPreMonth);
  nextMonthBtn.addEventListener('click', toNextMonth);
})();
