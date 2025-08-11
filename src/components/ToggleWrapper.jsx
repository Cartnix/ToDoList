import { Switch } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useTodos } from '../utils/ToDoContext';
import ButtonWrapper from './filterButtons';

export default function ToggleWrapper() {
    const {toggleTheme, todos, setTodos} = useTodos()
    return (
        <div className='flex justify-between items-center'>
            <Switch style={{ width: 60 }}
                checkedChildren={<SunOutlined />}
                unCheckedChildren={<MoonOutlined style={{ color: 'yellow' }} />}
                onChange={toggleTheme}
            />

            <ButtonWrapper todos={todos} setTodos={setTodos} />

        </div>
    )
}