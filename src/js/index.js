import '../css/styles.scss';
import Inputmask from 'inputmask';

const form = document.getElementById('feedbackForm');
const errorMessage = document.getElementById('errorMessage');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modalMessage');
const closeModal = document.getElementById('closeModal');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorMessage.textContent = '';

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('http://localhost:9090/api/registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.status === 'error') {
        for (const [key, message] of Object.entries(result.fields)) {
            const input = form.querySelector(`[name="${key}"]`);
            input.style.borderColor = 'red';
            errorMessage.textContent += message + '\n';
        }
    } else {
        form.reset();
        modalMessage.textContent = result.msg;
        modal.style.display = 'block';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.querySelector('input[name="phone"]');
    const im = new Inputmask("+7 (999) 999-99-99");
    im.mask(phoneInput);
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

document.getElementById('openModal').addEventListener('click', () => {
    modal.style.display = 'block';
});