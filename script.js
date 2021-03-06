import { modalEdit, modalDelete } from './create-modal.js';
import { getHours, getStudents, getDate, closeModal, addContact, sortTable } from './helpers.js';
import { appendEdit, appendAdd } from './modal.js';

let delayTimer;
function Filter(e) {
  clearTimeout(delayTimer)
  delayTimer = setTimeout(async () => {
    const response = await fetch(`http://localhost:3000/api/clients?search=${e}`, {
      method: 'GET'
    });

    const result = await response.json();
    createTableBody(result);
  }, 300)
}

let contact_icon = {
  phone: "phone",
  vk: "vk",
  Twitter: "Subtract",
  mail: "mail",
  Facebook: "fb",
  mail2: "mail2"
};

function createTableBody(students) {
  let tbody = document.getElementById("tbody");

  while (tbody.firstChild) {
    tbody.removeChild(tbody.lastChild);
  }

  let item_student = 0;
  for (const student of students) {
    ++item_student;

    let tr = document.createElement('tr');
    let td_id = document.createElement('td');
    let td_name = document.createElement('td');
    let td_dateCreate = document.createElement('td');
    let td_dateLast = document.createElement('td');
    let td_contacts = document.createElement('td');
    let td_change = document.createElement('td');

    td_id.textContent = student.id;
    td_name.textContent = student.name + " " + student.surname + " " + student.lastName;

    td_dateCreate.textContent = `${getDate(student.createdAt)}`;
    let span_create = document.createElement('span');
    span_create.setAttribute('class', 'clock');
    span_create.textContent = `${getHours(student.createdAt)}`;
    td_dateCreate.append(span_create);

    td_dateLast.textContent = `${getDate(student.updatedAt)}`;
    let span_lastChange = document.createElement('span');
    span_lastChange.setAttribute('class', 'clock');
    span_lastChange.textContent = `${getHours(student.updatedAt)}`;
    td_dateLast.append(span_lastChange);

    td_contacts.style.width = "135px"
    let k = 0;
    for (const contact of student.contacts) {
      let img = document.createElement('img');

      let attribute = contact_icon[Object.values(contact)[0]];
      img.setAttribute('src', `/images/${attribute}.svg`);

      let tooltiptext = document.createElement('span');
      tooltiptext.setAttribute('class', 'tooltiptext');


      if (k !== 0 && k !== 5)
        img.style.marginLeft = "7px";
      let div_img = document.createElement('div');
      div_img.setAttribute('class', 'tool');

      tooltiptext.textContent = Object.values(contact)[1];
      if (img.getAttribute('src') == "/images/Subtract.svg") {
        tooltiptext.textContent = `${Object.values(contact)[0]}:  ${Object.values(contact)[1]}`;
      }

      div_img.append(tooltiptext);
      div_img.append(img);
      td_contacts.append(div_img);
      k = k + 1;
    }

    td_change.innerHTML = `<span id='${item_student}_edit'><img src='/images/edit.svg' class='edit_icon'>????????????????</span> <span id='${item_student}_delete'><img src='/images/cancel.svg' class='cancel_icon'>??????????????</span> `;

    tr.append(td_id, td_name, td_dateCreate, td_dateLast, td_contacts, td_change);
    tbody.append(tr);

    let edit = document.getElementById(`${item_student}_edit`);
    let remove = document.getElementById(`${item_student}_delete`);
    let modal = document.getElementById('modal');

    edit.style.cursor = "pointer";

    edit.onmouseover = () => {
      edit.style.color = "#9873FF";
    }
    edit.onmouseout = () => {
      edit.style.color = "#333"
    }

    remove.style.cursor = "pointer";

    remove.onmouseover = () => {
      remove.style.color = "#F06A4D";
    }
    remove.onmouseout = () => {
      remove.style.color = "#333"
    }

    edit.addEventListener('click', () => {
      appendEdit(student);
    });

    remove.addEventListener('click', () => {
      modal.append(modalDelete(student.id));
      modal.style.display = "flex";
    })

    window.onclick = function (event) {
      if (event.target == modal) {
        closeModal()
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  let students = await getStudents();
  createTableBody(students);

  let vectors = document.querySelectorAll('.vector');
  vectors.forEach(vector => vector.addEventListener('click', () => {
    sortTable(vector, students);
    createTableBody(students);
  }));

  let input_search = document.querySelector('.search');
  input_search.addEventListener('input', () => {
    Filter(input_search.value)
  })

  let addStudent = document.querySelector('.addStudent');
  addStudent.addEventListener('click', () => {
    appendAdd();
  });
});
