(() => {
  const sectionTypes = document.querySelectorAll('.section-type');
  const submitBtn = document.querySelector('input[type=submit]');

  for (let sectionType of sectionTypes) {
    sectionType.addEventListener('change', () => {
      const sectionTypeId = sectionType.id;
      sectionValue = document.getElementById(
        sectionTypeId.slice(0, sectionTypeId.length - 4) + 'value'
      );
      if (sectionType.value === '') {
        sectionValue.innerHTML = `<option value=""></option>`;
      } else if (sectionType.value === 'sex') {
        sectionValue.innerHTML = '';
        sectionValue.innerHTML += `<option value="male">남</option>`;
        sectionValue.innerHTML += `<option value="female">여</option>`;
      } else if (
        sectionType.value === 'age-over' ||
        sectionType.value === 'age-under'
      ) {
        sectionValue.innerHTML = '';
        const maxYear = new Date().getFullYear() - 4;
        for (let i = 0; i < 68; i++) {
          sectionValue.innerHTML += `<option value=${maxYear - i}>${
            maxYear - i
          }</option>`;
        }
      } else if (sectionType.value === 'school') {
        sectionValue.innerHTML = '';
        sectionValue.innerHTML += `<option value="university">대학교</option>`;
        sectionValue.innerHTML += `<option value="high">고등학교</option>`;
        sectionValue.innerHTML += `<option value="middle">중학교</option>`;
        sectionValue.innerHTML += `<option value="elementary">초등학교</option>`;
      } else if (sectionType.value === 'belongNow') {
        sectionValue.innerHTML = '';
        sectionValue.innerHTML += `<option value="national">내셔널리그</option>`;
        sectionValue.innerHTML += `<option value="city">시도리그</option>`;
        sectionValue.innerHTML += `<option value="seoul-semi-pro">서울 연구생</option>`;
        sectionValue.innerHTML += `<option value="local-semi-pro">지역 연구생</option>`;
        sectionValue.innerHTML += `<option value="federation">한바연</option>`;
      } else if (sectionType.value === 'belongPre') {
        sectionValue.innerHTML = '';
        sectionValue.innerHTML += `<option value="national">내셔널리그</option>`;
        sectionValue.innerHTML += `<option value="city">시도리그</option>`;
        sectionValue.innerHTML += `<option value="seoul-semi-pro">서울 연구생</option>`;
        sectionValue.innerHTML += `<option value="local-semi-pro">지역 연구생</option>`;
      }
    });
  }
})();
