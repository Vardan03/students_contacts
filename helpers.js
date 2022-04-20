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

function addContact()
{
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


      addContact_div.style.padding = '25px 30px 25px 30px';
      addContact_div.style.height = 'auto';
      select_div.style.marginBottom = '25px';
      select_div.append(select, input_value);
}

let fl = true;
function sortTable(vector,students)
{
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

export { getHours, getStudents, getDate, closeModal,addContact,sortTable};
