import AppParticles from "./components/Particles";
import ToDoApp from "./components/ToDoApp";
import { TodoProvider } from "./utils/ToDoContext";

export default function App() {


  return (
    <div>
      <AppParticles />
      <TodoProvider>
        <ToDoApp />
      </TodoProvider>
    </div>
  );
}
