const express = require('express');
const cors = require('cors');
const app = express();
const { body, validationResult } = require('express-validator');
const PORT = process.env.PORT || 9090;

app.use(cors());
app.use(express.json());

app.get('/api/ping', (req, res) => {
    res.send('Server is running!');
});

app.post('/api/registration', [
    body('name').notEmpty().withMessage('Имя обязательно для заполнения'),
    body('email').isEmail().withMessage('Некорректный email'),
    body('phone').matches(/^\+?\d[\d\s()-]{4,14}\d$/).withMessage('Некорректный формат телефона'),
    body('message').notEmpty().withMessage('Сообщение обязательно для заполнения')
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            errors: errors.array().map(error => ({
                field: error.param,
                message: error.msg
            }))
        });
    }

    res.json({
        status: 'success',
        msg: 'Ваша заявка успешно отправлена'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});