import { modalEdit, modalDelete } from './create-modal.js';
import { closeModal, addContact, } from './helpers.js';

export function appendEdit(student) {
  let surname = student.surname;
  let name = student.name;
  let patronymic = student.lastName;
  modal.append(modalEdit());
  let modal_h2 = document.querySelector('.modal_H2');
  modal_h2.textContent = "Изменить данные";

  let contact = student.contacts;
  if (contact.length > 0) {

    for (let i = 0; i < contact.length; i++) {
      addContact(contact[i].type, contact[i].value);
    }
  }

  let delete_link = document.querySelector('.delete_link');
  delete_link.addEventListener('click', () => {
    modal.style.display = 'none';
    modal.removeChild(document.querySelector('.modal_content'));
    modal.append(modalDelete(student.id));
    modal.style.display = 'flex';
  });
  let modal_surname = document.getElementById('input_surname');
  let modal_name = document.getElementById('input_name');
  let modal_patronymic = document.getElementById('input_patronymic');

  modal_surname.value = surname;
  modal_name.value = name;
  modal_patronymic.value = patronymic;

  let modal_id = document.getElementById('span_id');
  modal_id.textContent = `ID: ${student.id}`;

  let save_change = document.querySelector('.modal_save');
  let select_div = document.querySelector('.select_div');
  let add_contact = document.getElementById('add_contact');
  add_contact.addEventListener('click', () => {
    if (select_div.childNodes.length == 10) {
      alert('Нельзя больше десяти контактов');
      return;
    }
    addContact();
  });

  save_change.addEventListener('click', async () => {
    let modal_errors = document.querySelector('.errors_div');
    modal_errors.innerHTML = '';
    modal_errors.style.marginBottom = '0px'

    let select_div = document.querySelector('.select_div');
    let student_contacts = [];

    for (const div of select_div.childNodes) {
      let obj = {};
      obj.type = div.firstChild.value;
      obj.value = div.childNodes[1].value;
      student_contacts.push(obj);
    }

    console.log(student_contacts);

    const response = await fetch(`http://localhost:3000/api/clients/${student.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: modal_name.value,
        surname: modal_surname.value,
        lastName: modal_patronymic.value,
        contacts: student_contacts
      })
    });

    const result = await response.json();
    try {
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

  let modal_close = document.getElementById('modal_close');
  modal_close.addEventListener('click', closeModal);
  modal.style.display = "flex";
}

export function appendAdd() {
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
    closeModal();
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

    for (const div of select_div.childNodes) {
      let obj = {};
      obj.type = div.firstChild.value;
      obj.value = div.childNodes[1].value;
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
}
