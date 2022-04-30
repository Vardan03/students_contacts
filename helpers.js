function byField(field) {
  return (a, b) => a[field] > b[field] ? 1 : -1;
}

function byFieldСonversely(field) {
  return (a, b) => a[field] < b[field] ? 1 : -1;
}

function getDate(str = "") {
  let date = str.slice(0, 10)
  let newdate = date.replace(/-/gi, '.');
  return newdate;
}

function getHours(str = "") {
  let Hours = str.slice(11, 16);
  return Hours
}

async function getStudents() {
  const response = await fetch('http://localhost:3000/api/clients', {
    method: 'GET'
  });

  const result = await response.json();
  return result;
}

function closeModal() {
  if (document.querySelector('.modal_H2').textContent == 'Изменить данные' || document.querySelector('.modal_H2').textContent == 'Новый клиент') {
    let modal_surname = document.getElementById('input_surname');
    let modal_name = document.getElementById('input_name');
    let modal_patronymic = document.getElementById('input_patronymic');
    let modal_id = document.getElementById('span_id');

    modal_name.value = "";
    modal_surname.value = "";
    modal_patronymic.value = "";
    modal_id.textContent = "";
  }
  modal.style.display = "none";
  modal.removeChild(document.querySelector('.modal_content'))
}

function mouseOverClearContact(button) {
  let path = button.firstChild.firstChild;
  path.style.fill = '#F06A4D';
  button.style.borderColor = '#F06A4D';
}

function onmouseOutClearContact(button) {
  let path = button.firstChild.firstChild;
  path.style.fill = '#B0B0B0';
  button.style.borderColor = '#E7E5EB'
}

function clearContact(button) {
  let div = button.parentNode;
  div.parentNode.removeChild(div);
  let select_div = document.querySelector('.select_div');
  let add_contact = document.querySelector('.add_contact');

  if (select_div.childNodes.length == 0) {
    select_div.style.marginBottom = '0px';
    add_contact.style.padding = '8px 30px 8px 30px';
  }
}

function addContact(type, value) {
  let contact_icon = {
    phone: "phone",
    vk: "vk",
    Twitter: "Subtract",
    mail: "mail",
    Facebook: "fb",
  };

  let addContact_div = document.querySelector('.add_contact');
  let select_div = document.querySelector('.select_div');
  select_div.style.marginBottom = '25px';

  let select = document.createElement('select');
  let types_arr = ['Телефон', 'VK', 'Twitter', 'Email', 'Facebook'];

  for (let i = 0; i < 5; i++) {
    let option = document.createElement('option');
    option.value = Object.keys(contact_icon)[i];
    option.textContent = types_arr[i];
    select.append(option);
  }

  let input_value = document.createElement('input');
  input_value.setAttribute('type', 'text');
  input_value.setAttribute('class', 'input_value');
  input_value.setAttribute('placeholder', 'Введите данные контакта');

  let delete_contact = document.createElement('button');
  delete_contact.classList.add('delete_contact');
  delete_contact.innerHTML = "<svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z' fill='#B0B0B0'/></svg>";
  delete_contact.firstChild.style.cursor = 'pointer';

  delete_contact.addEventListener('mouseover', () => {
    mouseOverClearContact(delete_contact);
  });
  delete_contact.addEventListener('mouseout', () => {
    onmouseOutClearContact(delete_contact);
  })
  delete_contact.addEventListener('click', () => {
    clearContact(delete_contact);
  });

  addContact_div.style.padding = '25px 30px 25px 30px';
  addContact_div.style.height = 'auto';
  select_div.style.marginBottom = '25px';

  let div = document.createElement('div');
  div.style.marginBottom = '15px';
  div.append(select, input_value, delete_contact);
  if (type && value) {
    input_value.value = value;
    select.value = type;
  }
  select_div.append(div);
}

let fl = true;
function sortTable(vector, students) {
  if (fl) {
    vector.setAttribute('src', '/images/vector_up.svg');
    vector.setAttribute('class', 'vector_up vector');
    students = students.sort(byFieldСonversely(vector.id));
    fl = !fl;
  }
  else {
    vector.setAttribute('src', '/images/vector_down.svg');
    vector.setAttribute('class', 'vector_down vector');
    students = students.sort(byField(vector.id));
    fl = !fl;
  }
}

export { getHours, getStudents, getDate, closeModal, addContact, sortTable, mouseOverClearContact, onmouseOutClearContact, clearContact };
