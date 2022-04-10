function modalEdit() {
  let div_modal = document.createElement('div');
  div_modal.classList.add('modal_content');
  let h2 = document.createElement('h2');
  h2.classList.add('modal_H2');
  h2.textContent = 'Изменить данные';
  let span_id = document.createElement('span');
  span_id.setAttribute('id', 'span_id');
  let img = document.createElement('img');
  img.setAttribute('src', '/images/Union.svg');
  img.setAttribute('id', 'modal_close');
  img.classList.add('cross_close');
  let div_input = document.createElement('div');
  div_input.classList.add('modal_inputs');
  let span_surname = document.createElement('span');
  span_surname.textContent = "Фамилия*";
  let input_surname = document.createElement('input');
  input_surname.setAttribute('id', 'input_surname');
  let span_name = document.createElement('span');
  span_name.textContent = 'Имя*';
  let input_name = document.createElement('input');
  input_name.setAttribute('id', 'input_name');
  let span_patronymic = document.createElement('span');
  span_patronymic.textContent = 'Отчество'
  let input_patronymic = document.createElement('input');
  input_patronymic.setAttribute('id', 'input_patronymic');
  let div_addContant = document.createElement('div');
  div_addContant.classList.add('add_contact');
  let div_select = document.createElement('div');
  div_select.classList.add('select_div');
  let span_add = document.createElement('span');
  span_add.textContent = 'Добавить контакт';
  span_add.setAttribute('id', 'add_contact');
  span_add.innerHTML = '<img src="/images/add_contact.svg" alt=""> Добавить контакт';
  let button_save = document.createElement('button');
  button_save.classList.add('modal_save');
  button_save.textContent = 'Сохранить';
  let button_delete = document.createElement('button');
  button_delete.textContent = 'Удалить клиента';
  button_delete.classList.add('delete_link');

  div_input.append(span_surname, input_surname, span_name, input_name, span_patronymic, input_patronymic);
  div_addContant.append(div_select, span_add);
  div_modal.append(h2, span_id, img, div_input, div_addContant, button_save, button_delete);

  return div_modal;
}

function modalDelete(id) {
  let modal_content = document.createElement('div');
  modal_content.classList.add('modal_content');
  let img = document.createElement('img');
  img.setAttribute('src', '/images/Union.svg');
  img.classList.add('cross_close');
  img.setAttribute('id', 'closeDelete_modal');
  let h2 = document.createElement('h2');
  h2.classList.add('modal_H2');
  h2.textContent = 'Удалить клиента';
  let div_wrap = document.createElement('div');
  div_wrap.classList.add('modal_wrap');
  let span_question = document.createElement('span');
  span_question.classList.add('question_remove');
  span_question.textContent = 'Вы действительно хотите удалить данного клиента?';
  let button_save = document.createElement('button');
  button_save.classList.add('modal_save');
  button_save.textContent = 'Удалить';
  let button_link = document.createElement('button');
  button_link.classList.add('delete_link');
  button_link.textContent = 'Отмена';

  div_wrap.append(span_question, button_save, button_link);
  modal_content.append(img, h2, div_wrap);

  h2.style.marginRight = '152px';
  h2.style.marginLeft = '133px';

  button_link.addEventListener('click', () => {
    modal.style.display = 'none';
    modal.removeChild(document.querySelector('.modal_content'));
  });

  img.addEventListener('click', () => {
    modal.style.display = 'none';
    modal.removeChild(document.querySelector('.modal_content'));
  });

  button_save.onclick = async function () {
    const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
      method: 'DELETE'
    });

  }

  return modal_content;
}

let delayTimer;
function Filter() {
  clearTimeout(delayTimer)
  delayTimer = setTimeout(async () => {
    let input = document.querySelector('.search');
    const response = await fetch(`http://localhost:3000/api/clients?search=${input.value}`, {
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

    let surname = student.surname;
    let name = student.name;
    let patronymic = student.lastName;

    edit.addEventListener('click', () => {
      modal.append(modalEdit());
      let modal_h2 = document.querySelector('.modal_H2');////////////////
      modal_h2.textContent = "Изменить данные";

      let contact = student.contacts;
      if (contact.length > 0) {

        for (let i = 0; i < contact.length; i++) {
          let select_div = document.querySelector('.select_div');
          select_div.style.margin.bottom = '25px';

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
      let addContact_div = document.querySelector('.add_contact');


      add_contact.addEventListener('click', () => {
        let select_div = document.querySelector('.select_div');
        select_div.style.margin.bottom = '25px';

        let select = document.createElement('select');
        let types_arr = ['Телефон', 'VK', 'Twitter', 'Email', 'Facebook'];

        for (let i = 0; i < types_arr.length; i++) {
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

        const response = await fetch(`http://localhost:3000/api/clients/${student.id}`, {
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
        modal.removeChild(document.querySelector('.modal_content'));
      });
    });

    remove.addEventListener('click', () => {
      modal.append(modalDelete(student.id));


      modal.style.display = "flex";
    })

    window.onclick = function (event) {
      if (event.target == modal) {
        if (document.querySelector('.modal_H2').textContent == 'Изменить данные' || document.querySelector('.modal_H2').textContent == 'Новый клиент') {
          let modal_surname = document.getElementById('input_surname');
          let modal_name = document.getElementById('input_name');
          let modal_patronymic = document.getElementById('input_patronymic');
          let modal_id = document.getElementById('span_id');

          modal_name.value = "";
          modal_surname.value = "";
          modal_patronymic.value = "";
          modal_id.textContent = ``;
        }
        modal.style.display = "none";
        modal.removeChild(document.querySelector('.modal_content'))
      }
    }
  }



  let addStudent = document.querySelector('.addStudent');

  addStudent.addEventListener('click', () => {
    let modal = document.getElementById('modal');
    modal.append(modalEdit());

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

      const response = await fetch('http://localhost:3000/api/clients', {
        method: 'POST',
        body: JSON.stringify({
          name: modal_name.value,
          surname: modal_surname.value,
          lastName: modal_patronymic.value,
          contacts: student_contacts
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

function sortColumn(columnName)
{

}

document.addEventListener('DOMContentLoaded', async () => {
  let  students = await getStudents();
  createTableBody(students);
  console.log(students);

  let vectors = document.querySelectorAll('.vector_down');
  vectors.forEach(vector => vector.addEventListener('click', () => {

  }));

});

