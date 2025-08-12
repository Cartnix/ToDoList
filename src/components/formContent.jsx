import { useTodos } from "../utils/ToDoContext"
import ToggleWrapper from './ToggleWrapper';
import { Button, Input } from 'antd';


export default function Fields() {

    const { title, setTitle, desc, setDesc, date, setDate, handleAdd} = useTodos()

    return (
        <div className='mb-10 flex flex-col gap-4 p- max-w-[500px] w-full rounded-[10px] form-shadow  bg-[var(--color-bg-card)] p-[30px]'>
            <ToggleWrapper />
            <h2 className='mb-4 text-center text-[var(--color-text-main)] font-bold text-2xl'>Добавить новую задачу</h2>
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
                disabled={!title.trim() || !date.trim()}
            >
                Добавить задачу
            </Button>
        </div>
    )
}