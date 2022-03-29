let modal_div = `<div class="modal_content">
<h2 class="modal_H2">Изменить данные</h2><span id="span_id">ID: 123458</span><img src="/images/Union.svg" id="modal_close" class="cross_close">
<div class="modal_inputs">
  <span>Фамилия*</span>
  <br>
  <input type="text" name="" id="input_surname">
  <span>Имя*</span>
  <input type="text" name="" id="input_name">
  <span>Отчество</span>
  <input type="text" name="" id="input_patronymic">
</div>
<div class="add_contact">
  <div class="select_div"></div>
  <span id="add_contact"><img src="/images/add_contact.svg" alt=""> Добавить контакт</span>
</div>
<button class="modal_save">Сохранить</button>
<button class="delete_link">Удалить клиента</button>
</div>`;



let contact_icon = {
  phone: "phone",
  vk: "vk",
  Twitter: "Subtract",
  mail: "mail",
  instagram: "Subtract",
  mail2: "mail2"

};

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

//students.sort(byField('ID'));
async function createTableBody() {

  const response = await fetch('http://localhost:3000/api/clients', {
    method: 'GET'
  });

  const students = await response.json();

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
    let modalDelete = document.getElementById('modal_delete');

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

    remove.addEventListener('click', () => {
      modalDelete.style.display = "flex";
    });

    let surname = student.surname;
    let name = student.name;
    let patronymic = student.lastName;

    edit.addEventListener('click', () => {
      modal.innerHTML = modal_div;
      let modal_h2 = document.querySelector('.modal_H2');
      modal_h2.textContent = "Изменить данные";

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
      let addContact_div = document.querySelector('.add_contact');


      add_contact.addEventListener('click', () => {
        let select_div = document.querySelector('.select_div');
        select_div.style.margin.bottom = '25px';

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
      });

      save_change.addEventListener('click', async function changes() {

        let select = document.getElementsByTagName('select');
        let contact_value = document.querySelector('.input_value');

        const response = await fetch(`http://localhost:3000/api/clients/${student.ID}`, {
          method: 'PATCH',
          body: JSON.stringify({
            name: modal_name.value,
            surname: modal_surname.value,
            lastName: modal_patronymic.value,
            contacts: [{
              type: select.value,
              value: contact_value.value
            }]
          })
        });

        const x = await response.json();
        console.log(x);
      });

      let modal_close = document.getElementById('modal_close');
      modal_close.addEventListener('click', () => {

        let modal_surname = document.getElementById('input_surname');
        let modal_name = document.getElementById('input_name');
        let modal_patronymic = document.getElementById('input_patronymic');
        let modal_id = document.getElementById('span_id');


        modal_name.value = "";
        modal_surname.value = "";
        modal_patronymic.value = "";
        modal_id.textContent = ``;

        modal.style.display = "none";
      });
    });

    remove.addEventListener('click', () => {
      let modal_h2 = document.querySelector('.modal_H2');
      modal_h2.style.marginRight = '152px';
      modal_h2.style.marginLeft = '133px';

      //let closeDelete_modal = document.getElementById();

      modal.style.display = "flex";//////////////////////////////////////////////////////
    })

    window.onclick = function (event) {
      if (event.target == modal) {
        let modal_surname = document.getElementById('input_surname');
        let modal_name = document.getElementById('input_name');
        let modal_patronymic = document.getElementById('input_patronymic');
        let modal_id = document.getElementById('span_id');


        modal_name.value = "";
        modal_surname.value = "";
        modal_patronymic.value = "";
        modal_id.textContent = ``;

        modal.style.display = "none";
      }
    }
  }



  let addStudent = document.querySelector('.addStudent');

  addStudent.addEventListener('click', () => {
    let modal_h2 = document.querySelector('.modal_H2');
    modal_h2.textContent = "Новый клиент"

    let add_contact = document.getElementById('add_contact');
    let addContact_div = document.querySelector('.add_contact');

    add_contact.addEventListener('click', () => {
      let select_div = document.querySelector('.select_div');
      select_div.style.margin.bottom = '25px';

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
    });

    let create_button = document.querySelector('.modal_save');
    create_button.addEventListener('click', async () => {

      let select = document.getElementsByTagName('select');
      let contact_value = document.querySelector('.input_value');
      let modal_surname = document.getElementById('input_surname');
      let modal_name = document.getElementById('input_name');
      let modal_patronymic = document.getElementById('input_patronymic');

      const response = await fetch('http://localhost:3000/api/clients', {
        method: 'POST',
        body: JSON.stringify({
          name: modal_name.value,
          surname: modal_surname.value,
          lastName: modal_patronymic.value,
          contacts: [{
            type: select[0].value,
            value: contact_value.value
          }]
        })
      });

      let result = await response.json();
      console.log(result);


      let obj = {
        ID: result.id,
        Name: result.surname + " " + result.name + " " + result.lastName,
        dateCreate: new Date(),
        dateLastChange: new Date(),
        contacts: result.cotancts
      };
      students.push(obj);
      console.log(students);
      createTableBody();

    });

    modal.style.display = 'flex';
  });
}


/*
let IDvector = document.getElementById("ID_vector");
let Name_vector = document.getElementById("Name_vector");
let dateStart_vector = document.getElementById('date_vector');
let dateLast_vector = document.getElementById('lastDate_vector');

IDvector.addEventListener('click', () => {
  let src = IDvector.getAttribute('src');
  if (src == '/images/vector_down.svg') {
    students.sort(byFieldСonversely('ID'));
    IDvector.setAttribute('src', '/images/vector_up.svg');
    IDvector.setAttribute('class', 'vector_up');
    createTableBody();
  }
  else if (src == '/images/vector_up.svg') {
    students.sort(byField('ID'));
    IDvector.setAttribute('src', '/images/vector_down.svg');
    IDvector.setAttribute('class', 'vector_down');
    createTableBody();
  }
});
Name_vector.addEventListener('click', () => {
  let src = Name_vector.getAttribute('src');
  if (src == '/images/vector_down.svg') {
    students.sort(byFieldСonversely('Name'));
    Name_vector.setAttribute('src', '/images/vector_up.svg');
    Name_vector.setAttribute('class', 'vector_up');
    createTableBody();
  }
  else if (src == '/images/vector_up.svg') {
    students.sort(byField('Name'));
    Name_vector.setAttribute('src', '/images/vector_down.svg');
    Name_vector.setAttribute('class', 'vector_down');
    createTableBody();
  }
});
dateStart_vector.addEventListener('click', () => {
  let src = dateStart_vector.getAttribute('src');
  if (src == '/images/vector_down.svg') {
    students.sort(byFieldСonversely('dateCreate'));
    dateStart_vector.setAttribute('src', '/images/vector_up.svg');
    dateStart_vector.setAttribute('class', 'vector_up');
    createTableBody();
  }
  else if (src == '/images/vector_up.svg') {
    students.sort(byField('dateCreate'));
    dateStart_vector.setAttribute('src', '/images/vector_down.svg');
    dateStart_vector.setAttribute('class', 'vector_down');
    createTableBody();
  }
});
dateLast_vector.addEventListener('click', () => {
  let src = dateLast_vector.getAttribute('src');
  if (src == '/images/vector_down.svg') {
    students.sort(byFieldСonversely('dateLastChange'));
    dateLast_vector.setAttribute('src', '/images/vector_up.svg');
    dateLast_vector.setAttribute('class', 'vector_up');
    createTableBody();
  }
  else if (src == '/images/vector_up.svg') {
    students.sort(byField('dateLastChange'));
    dateLast_vector.setAttribute('src', '/images/vector_down.svg');
    dateLast_vector.setAttribute('class', 'vector_down');
    createTableBody();
  }
});
*/
document.addEventListener('DOMContentLoaded', () => {
  createTableBody();

  /*let vectors = document.querySelectorAll('.vector_down');
  vectors.forEach(vector => vector.addEventListener('click', () => {

  }));*/

});

