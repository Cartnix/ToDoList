import { CheckOutlined } from '@ant-design/icons';
import CompleteBandle from './CompleteBandle';
import { Button, Switch, Card } from 'antd';
import { useTodos } from '../utils/ToDoContext';
import { useMemo } from 'react';

export default function CardApp() {
    const { todos, handleDelete, toggleComplete } = useTodos();

    const todoCards = useMemo(() => {
        return todos.map(todo => {
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

            return (
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
                    <h3
                        style={{
                            textDecoration: todo.complete ? 'line-through' : 'none',
                            color: todo.complete ? 'var(--color-text-muted)' : 'var(--color-text-main)',
                            marginBottom: '8px'
                        }}
                    >
                        {todo.title}
                    </h3>
                    <p
                        style={{
                            textDecoration: todo.complete ? 'line-through' : 'none',
                            color: todo.complete ? 'var(--color-text-muted-2)' : 'var(--color-text-sub)',
                            marginBottom: '12px'
                        }}
                    >
                        {todo.desc}
                    </p>

                    <p style={{ color: deadlineColor, fontWeight: 'bold' }}>{deadlineText}</p>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '15px'
                        }}
                    >
                        <Switch
                            checked={todo.complete}
                            onChange={() => toggleComplete(todo.id)}
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren="Не выполнено"
                        />
                        <Button danger onClick={() => handleDelete(todo.id)}>
                            Удалить
                        </Button>
                    </div>

                    {todo.complete && <CompleteBandle />}
                </Card>
            );
        });
    }, [todos, toggleComplete, handleDelete]);

    return (
        <div className="w-full max-w-[600px]">
            {todos.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '1.1em' }}>
                    Задач пока нет. Добавьте первую!
                </p>
            ) : (
                todoCards
            )}
        </div>
    );
}
