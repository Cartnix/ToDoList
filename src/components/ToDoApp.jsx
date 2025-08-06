import { Button, Input, Switch, Card, message } from 'antd';
import { useEffect, useState } from 'react';
import { CheckOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import useThemeToogle from '../utils/themeToggle';
import CompleteBandle from './CompleteBandle';
import ButtonWrapper from './filterButtons';



export default function ToDoApp() {
    const [theme, toggleTheme] = useThemeToogle();
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [date, setDate] = useState('');
    const [menu, setMenu] = useState(false);

    const [todos, setTodos] = useState(() => {
        try {
            const StoredTodo = localStorage.getItem('todos');
            return StoredTodo ? JSON.parse(StoredTodo) : [];
        } catch (e) {
            console.error('Ошибка чтения данных из localStorage при инициализации:', e);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
        console.log(todos.length === 0 ? 'Пусто' : [...todos])
    }, [todos]);

    const handleAdd = () => {
        if (!title.trim()) {
            message.error('Пожалуйста, введите заголовок задачи!');
            return;
        }

        const newTodo = {
            id: Date.now(),
            title: title.trim(),
            desc: desc.trim(),
            date,
            complete: false
        };

        setTodos([...todos, newTodo]);

        setTitle('');
        setDesc('');
        setDate('');
        message.success('Задача успешно добавлена!');
    };

    const handleDelete = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
        message.info('Задача удалена.');
    };

    const toogleComplete = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id
                ? { ...todo, complete: !todo.complete }
                : todo
        ));
        message.success(`Задача ${todos.find(t => t.id === id)?.complete ? 'отмечена как невыполненная' : 'отмечена как выполненная'}.`);
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
            padding: '20px',
            minWidth: 720
        }}>

            <div style={{
                marginBottom: '40px',
                display: 'flex',
                gap: '15px',
                flexDirection: 'column',
                backgroundColor: 'var(--color-bg-card)',
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0 4px 12px var(--box-shadow-form)',
                maxWidth: '500px',
                width: '100%',
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Switch style={{ width: 60 }}
                        checkedChildren={<SunOutlined />}
                        unCheckedChildren={<MoonOutlined style={{ color: 'yellow' }} />}
                        onChange={toggleTheme}
                    />

                    <ButtonWrapper />

                </div>
                <h2 style={{ marginBottom: '15px', textAlign: 'center', color: 'var(--color-text-main)' }}>Добавить новую задачу</h2>
                <Input
                    type='text'
                    variant='outlined'
                    placeholder='Название задачи'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Input.TextArea
                    variant='outlined'
                    placeholder='Описание задачи'
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    rows={3}
                />
                <Input
                    type='date'
                    variant='outlined'
                    placeholder='Крайний срок'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <Button
                    type='primary'
                    onClick={handleAdd}
                    style={{ marginTop: '20px', color: 'var(--color-text-main)' }}
                    disabled={!title.trim()}
                >
                    Добавить задачу
                </Button>
            </div>

            <div style={{ maxWidth: '600px', width: '100%' }}>
                {todos.length === 0 ? (
                    <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '1.1em' }}>Задач пока нет. Добавьте первую!</p>
                ) : (
                    todos.map(todo => (
                        <Card
                            key={todo.id}
                            style={{
                                marginBottom: '15px',
                                backgroundColor: todo.complete ? 'var(--color-bg-completed)' : 'var(--color-bg-card)',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 1)',
                                borderRadius: '8px',
                                position: 'relative',
                                borderColor: todo.complete ? 'var(--color-border-completed)' : 'var(--color-border-default)',
                                backdropFilter: 4,
                                opacity: '.7'
                            }}
                        >
                            <h3 style={{
                                textDecoration: todo.complete ? 'line-through' : 'none',
                                color: todo.complete ? 'var(--color-text-muted)' : 'var(--color-text-main)',
                                marginBottom: '8px'
                            }}>
                                {todo.title}
                            </h3>
                            <p style={{
                                textDecoration: todo.complete ? 'line-through' : 'none',
                                color: todo.complete ? 'var(--color-text-muted-2)' : 'var(--color-text-sub)',
                                marginBottom: '12px'
                            }}>
                                {todo.desc}
                            </p>

                            {(() => {
                                const deadlineDate = new Date(todo.date);
                                deadlineDate.setHours(23, 59, 59, 999);
                                const today = new Date();
                                today.setHours(23, 59, 59, 999);

                                const daysLeft = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

                                let deadlineText;
                                let deadlineColor;

                                if (todo.complete) {
                                    deadlineText = 'Задача выполнена!';
                                    deadlineColor = 'green';
                                } else if (daysLeft > 0) {
                                    deadlineText = `Осталось дней: ${daysLeft}`;
                                    deadlineColor = '#1890ff';
                                } else if (daysLeft === 0) {
                                    deadlineText = 'Сегодня последний день!';
                                    deadlineColor = '#faad14';
                                } else {
                                    deadlineText = `Просрочено: ${Math.abs(daysLeft)} дней назад`;
                                    deadlineColor = '#ff4d4f';
                                }
                                return <p style={{ color: deadlineColor, fontWeight: 'bold' }}>{deadlineText}</p>;
                            })()}

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                                <Switch
                                    checked={todo.complete}
                                    onChange={() => toogleComplete(todo.id)}
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren="Не выполнено"
                                />

                                <Button danger onClick={() => handleDelete(todo.id)}>
                                    Удалить
                                </Button>
                            </div>

                            {todo.complete && <CompleteBandle />}

                        </Card>
                    )
                    ))}
            </div>
        </div>
    );
}