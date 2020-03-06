window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let input = document.getElementsByTagName('input'),
        statusMessage = document.createElement('div'),
        formBottom = document.querySelector('#form');
        statusMessage.classList.add('status');

    function sendForm(elem) {
        elem.addEventListener('submit', function(e) {
            e.preventDefault();
                elem.appendChild(statusMessage);
                let formData = new FormData(elem);

                function postData(data) {

                    return new Promise(function(resolve, reject) {
                        let request = new XMLHttpRequest();

                        request.open('POST', 'server.php');

                        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

                        request.onreadystatechange = function() {
                            if (request.readyState < 4) {
                                resolve()
                            } else if (request.readyState === 4) {
                                if (request.status == 200 && request.readyState < 3) {
                                    resolve()
                                }
                                else {
                                    reject()
                                }
                            }
                        }

                        //преобразуем данные в json формат
                        let obj = {};
                        formData.forEach(function(value, key) {
                            obj[key] = value;
                        });
                        let json = JSON.stringify(obj);

                        request.send(json);
                    })
                } 

                function clearInput() {
                    for (let i = 0; i < input.length; i++) {
                        input[i].value = '';
                    }
                }

                postData(formData)
                    .then(() => statusMessage.innerHTML = message.loading)
                    .then(()=> {
                        statusMessage.innerHTML = message.success;
                    })
                    .catch(()=> statusMessage.innerHTML = message.failure)
                    .then(clearInput)
        });
    }
    sendForm(formBottom);


});