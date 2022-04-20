export function modalEdit() {
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
  let Errors_div = document.createElement('div');
  Errors_div.classList.add('errors_div');

  div_input.append(span_surname, input_surname, span_name, input_name, span_patronymic, input_patronymic);
  div_addContant.append(div_select, span_add);
  div_modal.append(h2, span_id, img, div_input, div_addContant,Errors_div,button_save, button_delete);

  return div_modal;
}

export function modalDelete(id) {
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
   await fetch(`http://localhost:3000/api/clients/${id}`, {
      method: 'DELETE'
    });

  }

  return modal_content;
}
