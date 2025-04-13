import { Order, Device, Client } from '../models';
import { Op } from 'sequelize';
/**
 * Отримання всіх замовлень
 */
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                {
                    model: Device,
                    as: 'device',
                    include: [{ model: Client, as: 'client' }]
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(orders);
    }
    catch (error) {
        console.error('Помилка при отриманні замовлень:', error);
        res.status(500).json({ message: 'Помилка сервера при отриманні замовлень' });
    }
};
/**
 * Отримання замовлення за ID
 */
export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id, {
            include: [
                {
                    model: Device,
                    as: 'device',
                    include: [{ model: Client, as: 'client' }]
                }
            ]
        });
        if (!order) {
            res.status(404).json({ message: `Замовлення з ID ${id} не знайдено` });
            return;
        }
        res.status(200).json(order);
    }
    catch (error) {
        console.error(`Помилка при отриманні замовлення з ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Помилка сервера при отриманні замовлення' });
    }
};
/**
 * Отримання замовлень за статусом
 */
export const getOrdersByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        // Перевірка валідності статусу
        const validStatuses = ['pending', 'in_progress', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            res.status(400).json({
                message: 'Невірний статус. Допустимі значення: pending, in_progress, completed, cancelled'
            });
            return;
        }
        const orders = await Order.findAll({
            where: { status },
            include: [
                {
                    model: Device,
                    as: 'device',
                    include: [{ model: Client, as: 'client' }]
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(orders);
    }
    catch (error) {
        console.error(`Помилка при отриманні замовлень зі статусом ${req.params.status}:`, error);
        res.status(500).json({ message: 'Помилка сервера при отриманні замовлень за статусом' });
    }
};
/**
 * Отримання замовлень за датою
 */
export const getOrdersByDate = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        if (!startDate || !endDate) {
            res.status(400).json({ message: 'Параметри startDate та endDate є обов\'язковими' });
            return;
        }
        const orders = await Order.findAll({
            where: {
                createdAt: {
                    [Op.between]: [new Date(startDate), new Date(endDate)]
                }
            },
            include: [
                {
                    model: Device,
                    as: 'device',
                    include: [{ model: Client, as: 'client' }]
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(orders);
    }
    catch (error) {
        console.error('Помилка при отриманні замовлень за датою:', error);
        res.status(500).json({ message: 'Помилка сервера при отриманні замовлень за датою' });
    }
};
/**
 * Створення нового замовлення
 */
export const createOrder = async (req, res) => {
    try {
        const { deviceId, problem, status, price } = req.body;
        // Базова валідація
        if (!deviceId || !problem) {
            res.status(400).json({ message: 'ID пристрою та опис проблеми є обов\'язковими полями' });
            return;
        }
        // Перевірка існування пристрою
        const device = await Device.findByPk(deviceId);
        if (!device) {
            res.status(404).json({ message: `Пристрій з ID ${deviceId} не знайдено` });
            return;
        }
        // Перевірка валідності статусу
        const validStatuses = ['pending', 'in_progress', 'completed', 'cancelled'];
        if (status && !validStatuses.includes(status)) {
            res.status(400).json({
                message: 'Невірний статус. Допустимі значення: pending, in_progress, completed, cancelled'
            });
            return;
        }
        const newOrder = await Order.create({
            deviceId,
            problem,
            status: status || 'pending',
            price: price || null,
            completedAt: status === 'completed' ? new Date() : undefined
        });
        // Отримуємо створене замовлення з інформацією про пристрій та клієнта
        const orderWithDetails = await Order.findByPk(newOrder.id, {
            include: [
                {
                    model: Device,
                    as: 'device',
                    include: [{ model: Client, as: 'client' }]
                }
            ]
        });
        res.status(201).json(orderWithDetails);
    }
    catch (error) {
        console.error('Помилка при створенні замовлення:', error);
        res.status(500).json({ message: 'Помилка сервера при створенні замовлення' });
    }
};
/**
 * Оновлення існуючого замовлення
 */
export const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { deviceId, problem, status, price } = req.body;
        console.log('Отримано запит на оновлення замовлення:', id);
        console.log('Тіло запиту:', req.body);
        // Базова валідація
        if (!deviceId || !problem) {
            console.log('Помилка валідації: відсутні обов\'язкові поля');
            res.status(400).json({ message: 'ID пристрою та опис проблеми є обов\'язковими полями' });
            return;
        }
        const order = await Order.findByPk(id);
        if (!order) {
            console.log(`Помилка: Замовлення з ID ${id} не знайдено`);
            res.status(404).json({ message: `Замовлення з ID ${id} не знайдено` });
            return;
        }
        console.log('Знайдено замовлення:', order.toJSON());
        // Перевірка існування пристрою
        const device = await Device.findByPk(deviceId);
        if (!device) {
            res.status(404).json({ message: `Пристрій з ID ${deviceId} не знайдено` });
            return;
        }
        // Перевірка валідності статусу
        const validStatuses = ['pending', 'in_progress', 'completed', 'cancelled'];
        if (status && !validStatuses.includes(status)) {
            res.status(400).json({
                message: 'Невірний статус. Допустимі значення: pending, in_progress, completed, cancelled'
            });
            return;
        }
        // Якщо статус змінюється на "completed", встановлюємо дату завершення
        const completedAt = status === 'completed'
            ? (order.status !== 'completed' ? new Date() : order.completedAt)
            : (status === 'pending' || status === 'in_progress' || status === 'cancelled' ? undefined : order.completedAt);
        console.log('Оновлюю замовлення з наступними даними:', {
            deviceId,
            problem,
            status: status || order.status,
            price: price !== undefined ? price : order.price,
            completedAt
        });
        await order.update({
            deviceId,
            problem,
            status: status || order.status,
            price: price !== undefined ? price : order.price,
            completedAt
        });
        console.log('Замовлення успішно оновлено');
        // Отримуємо оновлене замовлення з інформацією про пристрій та клієнта
        const updatedOrder = await Order.findByPk(id, {
            include: [
                {
                    model: Device,
                    as: 'device',
                    include: [{ model: Client, as: 'client' }]
                }
            ]
        });
        res.status(200).json(updatedOrder);
    }
    catch (error) {
        console.error(`Помилка при оновленні замовлення з ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Помилка сервера при оновленні замовлення' });
    }
};
/**
 * Оновлення статусу замовлення
 */
export const updateOrderStatus = async (req, res) => {
    console.log('Отримано запит на зміну статусу:', req.params, req.body);
    try {
        const { id } = req.params;
        const { status } = req.body;
        console.log(`Спроба змінити статус замовлення ${id} на ${status}`);
        if (!status) {
            console.log('Помилка: Статус не вказано');
            res.status(400).json({ message: 'Статус є обов\'язковим полем' });
            return;
        }
        // Перевірка валідності статусу
        const validStatuses = ['pending', 'in_progress', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            console.log(`Помилка: Невірний статус ${status}`);
            res.status(400).json({
                message: 'Невірний статус. Допустимі значення: pending, in_progress, completed, cancelled'
            });
            return;
        }
        const order = await Order.findByPk(id);
        if (!order) {
            console.log(`Помилка: Замовлення з ID ${id} не знайдено`);
            res.status(404).json({ message: `Замовлення з ID ${id} не знайдено` });
            return;
        }
        console.log(`Знайдено замовлення: ${JSON.stringify(order)}`);
        // Якщо статус змінюється на "completed", встановлюємо дату завершення
        const completedAt = status === 'completed'
            ? (order.status !== 'completed' ? new Date() : order.completedAt)
            : (status === 'pending' || status === 'in_progress' || status === 'cancelled' ? undefined : order.completedAt);
        console.log(`Оновлюю замовлення з ID ${id}, новий статус: ${status}`);
        try {
            await order.update({
                status,
                completedAt
            });
            console.log('Замовлення успішно оновлено');
        }
        catch (updateError) {
            console.error('Помилка при оновленні замовлення:', updateError);
            throw updateError;
        }
        // Отримуємо оновлене замовлення
        const updatedOrder = await Order.findByPk(id);
        console.log('Оновлене замовлення:', updatedOrder);
        res.status(200).json(updatedOrder);
        console.log('Відповідь успішно відправлена');
    }
    catch (error) {
        console.error(`Помилка при оновленні статусу замовлення з ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Помилка сервера при оновленні статусу замовлення' });
    }
};
/**
 * Видалення замовлення
 */
export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id);
        if (!order) {
            res.status(404).json({ message: `Замовлення з ID ${id} не знайдено` });
            return;
        }
        await order.destroy();
        res.status(200).json({ message: `Замовлення з ID ${id} успішно видалено` });
    }
    catch (error) {
        console.error(`Помилка при видаленні замовлення з ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Помилка сервера при видаленні замовлення' });
    }
};
/**
 * Пошук замовлень за параметрами
 */
export const searchOrders = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            res.status(400).json({ message: 'Параметр пошуку q є обов\'язковим' });
            return;
        }
        const orders = await Order.findAll({
            where: {
                problem: { [Op.iLike]: `%${q}%` }
            },
            include: [
                {
                    model: Device,
                    as: 'device',
                    include: [{ model: Client, as: 'client' }]
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(orders);
    }
    catch (error) {
        console.error('Помилка при пошуку замовлень:', error);
        res.status(500).json({ message: 'Помилка сервера при пошуку замовлень' });
    }
};
