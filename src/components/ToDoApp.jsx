import { useTodos } from '../utils/ToDoContext';
import Fields from './formContent';
import CardApp from './Card';



export default function ToDoApp() {
    const {todos} = useTodos();
    return (
        <div className="flex justify-center flex-col items-center min-h-[100vh] p-5 min-w-[720px]">
            <Fields />
            <CardApp todos={todos} />
        </div>
    );
}