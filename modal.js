import { modalEdit } from './create-modal.js';
import { closeModal,addContact } from './helpers.js';

export function appendEdit(student,value_contact) {
  let surname = student.surname;
  let name = student.name;
  let patronymic = student.lastName;
  modal.append(modalEdit());
  let modal_h2 = document.querySelector('.modal_H2');
  modal_h2.textContent = "Изменить данные";

  let contact = student.contacts;
  if (contact.length > 0) {

    for (let i = 0; i < contact.length; i++) {
      let select_div = document.querySelector('.select_div');
      select_div.style.marginBottom = '25px';

      let select = document.createElement('select');

      let option = document.createElement('option');
      option.value = contact[i].type;
      option.textContent = contact[i].type;
      select.append(option);

      let input_value = document.createElement('input');
      input_value.setAttribute('type', 'text');
      input_value.setAttribute('class', 'input_value');
      input_value.setAttribute('placeholder', 'Введите данные контакта');
      input_value.value = contact[i].value;

      let addContact_div = document.querySelector('.add_contact');

      addContact_div.style.padding = '25px 30px 25px 30px';
      addContact_div.style.height = 'auto';
      select_div.style.marginBottom = '25px';
      select_div.append(select, input_value);
    }
  }

  let delete_link = document.querySelector('.delete_link');
  delete_link.addEventListener('click', () => {
    modal.style.display = 'none';
    modal.removeChild(document.querySelector('.modal_content'));
    modal.append(modalDelete(student.id));
    modal.style.display = 'flex';
  });

  modal.style.display = "flex";
  let modal_surname = document.getElementById('input_surname');
  let modal_name = document.getElementById('input_name');
  let modal_patronymic = document.getElementById('input_patronymic');

  modal_surname.value = surname;
  modal_name.value = name;
  modal_patronymic.value = patronymic;

  let modal_id = document.getElementById('span_id');
  modal_id.textContent = `ID: ${student.id}`;

  let save_change = document.querySelector('.modal_save');

  let add_contact = document.getElementById('add_contact');
  add_contact.addEventListener('click',addContact );

  save_change.addEventListener('click', async () => {
    let select_div = document.querySelector('.select_div');
    let student_contacts = [];

    let k = select_div.childElementCount;
    for (let i = 0; i < k; i = i + 2) {
      let obj = {};
      obj.type = select_div.childNodes[i].value;
      obj.value = select_div.childNodes[i + 1].value;
      student_contacts.push(obj);
    }

    await fetch(`http://localhost:3000/api/clients/${student.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: modal_name.value,
        surname: modal_surname.value,
        lastName: modal_patronymic.value,
        contacts: student_contacts
      })
    });
  });

  let modal_close = document.getElementById('modal_close');
  modal_close.addEventListener('click', closeModal);
}
