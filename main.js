const memberBtns = document.querySelectorAll('.member-button');
const modalBtn = document.querySelector('.modal-btn');
const modalBody = document.querySelector('.modal-body');
const qNum = document.querySelector('.q-number');
const log = document.querySelector('.log');

const option1 = document.querySelector('#option1');
const option2 = document.querySelector('#option2');
const option3 = document.querySelector('#option3');

let memberList = [];

const addMember = (name) => {
  memberList.push(name);
  console.log('add ' + name);
  console.log(memberList);
};
const removeMember = (name) => {
  memberList = memberList.filter((n) => {
    return n != name;
  });
  console.log('remove ' + name);
  console.log(memberList);
};

memberBtns.forEach((btn) => {
  const checkBox = btn.querySelector('.btn-check');
  const label = btn.querySelector('label');
  label.addEventListener('click', () => {
    if (!checkBox.checked) {
      addMember(label.textContent);
    } else {
      removeMember(label.textContent);
    }
  });
});

modalBtn.addEventListener('click', () => {
  if (memberList.length === 0) {
    if (option3.checked) {
      memberBtns.forEach((btn) => {
        const checkBox = btn.querySelector('.btn-check');
        const label = btn.querySelector('label');
        if (checkBox.checked === false) {
          addMember(label.textContent);
          checkBox.checked = true;
        }
      });
    } else {
      modalBody.textContent = '멤버를 선택해주세요!';
      return;
    }
  }
  const rand = Math.floor(Math.random() * memberList.length);
  const selectedMember = memberList[rand];
  modalBody.textContent = selectedMember;
  if (option1.checked) {
    memberBtns.forEach((btn) => {
      const checkBox = btn.querySelector('.btn-check');
      const label = btn.querySelector('label');
      if (label.textContent === selectedMember) {
        removeMember(selectedMember);
        checkBox.checked = false;
      }
    });
  }
  const logItem = document.createElement('li');
  const logText = document.createElement('span');
  const logInput = document.createElement('input');
  const logDelete = document.createElement('button');
  logDelete.addEventListener('click', () => {
    logItem.remove();
  });
  logDelete.textContent = 'X';
  logText.textContent = `${qNum.value}번 문제 `;
  logInput.value = selectedMember;
  logItem.appendChild(logText);
  logItem.appendChild(logInput);
  logItem.appendChild(logDelete);
  log.appendChild(logItem);
  if (option2.checked) {
    qNum.value = Number(qNum.value) + 1;
  }
});
