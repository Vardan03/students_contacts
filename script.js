import { modalEdit, modalDelete } from './create-modal.js';
import { getHours, getStudents, getDate, closeModal, addContact, sortTable } from './helpers.js';
import { appendEdit } from './modal.js';

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

    td_change.innerHTML = `<span id='${item_student}_edit'><img src='/images/edit.svg' class='edit_icon'>Изменить</span> <span id='${item_student}_delete'><img src='/images/cancel.svg' class='cancel_icon'>Удалить</span> `;

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

  let addStudent = document.querySelector('.addStudent');

  addStudent.addEventListener('click', () => {
    let modal = document.getElementById('modal');
    modal.append(modalEdit());

    let modal_save = document.querySelector('.modal_save');
    modal_save.textContent = 'Добавить';

    let delete_link = document.querySelector('.delete_link');
    delete_link.textContent = 'Отмена';
    delete_link.addEventListener('click', () => {
      modal.style.display = "none";
      modal.removeChild(document.querySelector('.modal_content'));
    });

    let close = document.getElementById('modal_close');
    close.addEventListener('click', () => {
      let modal_surname = document.getElementById('input_surname');
      let modal_name = document.getElementById('input_name');
      let modal_patronymic = document.getElementById('input_patronymic');
      let modal_id = document.getElementById('span_id');

      modal_name.value = "";
      modal_surname.value = "";
      modal_patronymic.value = "";
      modal_id.textContent = ``;

      modal.style.display = "none";
      modal.removeChild(document.querySelector('.modal_content'));
    })

    let modal_h2 = document.querySelector('.modal_H2');
    modal_h2.textContent = "Новый клиент";

    let add_contact = document.getElementById('add_contact');
    add_contact.addEventListener('click', addContact);

    let add_button = document.querySelector('.modal_save');
    add_button.addEventListener('click', async () => {

      let modal_errors = document.querySelector('.errors_div');
      modal_errors.innerHTML = '';
      modal_errors.style.marginBottom = '0px'

      let select_div = document.querySelector('.select_div');
      let modal_surname = document.getElementById('input_surname');
      let modal_name = document.getElementById('input_name');
      let modal_patronymic = document.getElementById('input_patronymic');

      let student_contacts = [

      ];

      let k = select_div.childElementCount;
      for (let i = 0; i < k; i = i + 2) {
        let obj = {};
        obj.type = select_div.childNodes[i].value;
        obj.value = select_div.childNodes[i + 1].value;
        student_contacts.push(obj);
      }

      try {
        const response = await fetch('http://localhost:3000/api/clients', {
          method: 'POST',
          body: JSON.stringify({
            name: modal_name.value,
            surname: modal_surname.value,
            lastName: modal_patronymic.value,
            contacts: student_contacts
          })
        });
        const result = await response.json();

        if (result.errors) {
          modal_errors.style.marginBottom = '9px';
          for (let i = 0; i < result.errors.length; i++) {
            let span = document.createElement('span');
            span.classList.add('Errors');
            span.textContent = "Ошибка:" + result.errors[i].message
            modal_errors.append(span);
          }
        }
      }
      catch (error) {
        let span = document.createElement('span');
        span.classList.add('Errors');
        span.textContent = "Что-то пошло не так...";
        modal_errors.append(span);
      }
    });

    modal.style.display = 'flex';
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  let students = await getStudents();
  createTableBody(students);

  let vectors = document.querySelectorAll('.vector');
  vectors.forEach(vector => vector.addEventListener('click', () => {
    sortTable(vector,students);
    createTableBody(students);
  }));

  let input_search = document.querySelector('.search');
  input_search.addEventListener('input', () => {
    Filter(input_search.value)
  })
});
