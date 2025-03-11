import { useState, useEffect } from 'react';
function Sticky() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [selectedColor, setSelectedColor] = useState('#2196F3');
    const [grouped, setGrouped] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            try {
                setTasks(JSON.parse(savedTasks));
                console.log("Loaded tasks from local storage:", JSON.parse(savedTasks));
            } catch (error) {
                console.error("Error parsing tasks from local storage:", error);
            }
        }
    }, []);
    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
            console.log("Saved tasks to local storage:", tasks);
        }
    }, [tasks]);
    function handleTask(e) {
        setNewTask(e.target.value);
    }
    function addTask() {
        if (newTask.trim() === "") return;
        if (grouped && tasks.length > 0) {
            const updatedTasks = [...tasks];
            updatedTasks[updatedTasks.length - 1].subtasks.push(newTask);
            setTasks(updatedTasks);
        } else {
            setTasks([...tasks, { text: newTask, color: selectedColor, subtasks: [] }]);
        }
        setNewTask('');
    }
    function deleteTask(index) {
        setTasks(tasks.filter((_, i) => i !== index));
    }
    function taskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] =
                [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }
    function taskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] =
                [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }
    const filteredTasks = tasks.filter(task =>
        task.text.toLowerCase().includes(searchTerm.toLowerCase()) || 
        task.subtasks.some(subtask => subtask.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    return (
        <div className="container">
            <div className="tasky">
                <h1 className='head'>Sticky Note</h1>
                <input 
                    type="text" 
                    placeholder='Search tasks...' 
                    className='search' 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <input className='inputValue' type='text' placeholder='Add a task' onChange={handleTask} value={newTask} />
                
                <button className='btn' onClick={addTask}>Add Task</button>
                <label className="checkbox-container">
                    <input 
                        type="checkbox" 
                        checked={grouped} 
                        onChange={() => setGrouped(!grouped)}
                    />
                    Multiple tasks
                </label>
                
                <div className="tags">
                    <p className='tagsHash'> # tags</p>
                    <div className="tags-list">
                        <p className='single'>single tasks</p>
                        <span className='tasknumber'>{tasks.filter(task => task.subtasks.length === 0).length}</span>
                    </div>
                    <div className="tags-list">
                    <p className='single'>multi tasks</p>
                        <span className='tasknumber'>{tasks.filter(task => task.subtasks.length > 0).length}</span>
                    </div>
                    <div className="tags-list">
                    <p className='single'>total tasks</p>
                        <span className='tasknumber'>{tasks.length}</span>
                    </div>
                </div>
                <h6 className='pickColor'>Pick A Color</h6>
                <div className="buttons">
                    <button className='color-btn1' onClick={() => setSelectedColor("brown")} style={{ backgroundColor: "brown" }}></button>
                    <button className='color-btn2' onClick={() => setSelectedColor("#FF9800")} style={{ backgroundColor: "#FF9800" }}></button>
                    <button className='color-btn3' onClick={() => setSelectedColor("#8BC34A")} style={{ backgroundColor: "#8BC34A" }}></button>
                    <button className='color-btn4' onClick={() => setSelectedColor("#9C27B0")} style={{ backgroundColor: "#9C27B0" }}></button>
                    <button className='color-btn5' onClick={() => setSelectedColor("#E91E63")} style={{ backgroundColor: "#E91E63" }}></button>
                    <button className='color-btn6' onClick={() => setSelectedColor("#00BCD4")} style={{ backgroundColor: "#00BCD4" }}></button>
                    <button className='color-btn7' onClick={() => setSelectedColor("#2196F3")} style={{ backgroundColor: "#2196F3" }}></button>
                    <button className='color-btn8' onClick={() => setSelectedColor("#FFC107")} style={{ backgroundColor: "#FFC107" }}></button>
                </div>
                <ul className='list'>
                    {filteredTasks.map((task, index) => (
                        <li key={index} className='listItem' style={{ backgroundColor: task.color }}>
                            <span className='tasknum'>{`Task ${index+1}`}</span>
                            {task.subtasks.length > 0 ? (
                                <ol>
                                    <li>{task.text}</li>
                                    {task.subtasks.map((subtask, subIndex) => (
                                        <li key={subIndex}>{subtask}</li>
                                    ))}
                                </ol>
                            ) : (
                                <p className='taskItem'>{task.text}</p>
                            )}
                            <img className='img' src="./src/assets/buckle.png" alt="" />
                            <button className='delet-btn' onClick={() => deleteTask(index)}>X</button>
                            <button className='arrowUp' onClick={() => taskUp(index)}>⇦</button>
                            <button className='arrowDown' onClick={() => taskDown(index)}>⇨</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Sticky;