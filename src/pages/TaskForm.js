import {Form, Formik} from 'formik';
import {useTasks} from '../context/taskProvider'
import {useParams} from 'react-router-dom'
import { useEffect, useState} from 'react';


function TaskForm() {
    const {createTask, getTask, updateTask} = useTasks()
    const [task, setTask] = useState({
        title: "",
        description: "",
    })
    const params = useParams()

    
    useEffect(() => {
        const loadTask = async () => {
            if(params.id) {
                const task = await getTask(params.id)
                setTask({
                    title: task.title,
                    description: task.description
                })
            }
        }
        loadTask();
    }, [])

    return (
        <div>
            <h1>
                {
                    params.id ? "edit Task" : "new Task "
                }
            </h1>

            <Formik
            initialValues={task}
            enableReinitialize={true}

            onSubmit={ async (values, actions) => {
                console.log(values)
                
                if(params.id){
                    updateTask(params.id, values)
                }else {
                    await createTask(values);
                }


                actions.resetForm()
                
            }}

            >
                {({handleChange, handleSubmit, values, isSubmitting}) => (
                    <Form onSubmit={handleSubmit}>
                    <label>title</label>
                    <input type="text" name="title" placeholder="write a title"
                    onChange={handleChange}
                    value={values.title}
                    />

                    <label>description</label>
                    <textarea
                    name="description"
                    rows="3"
                    placeholder='Write a description'
                    onChange={handleChange}
                    value={values.description}
                    >
                    </textarea>


                    <button type='submit' disabled={isSubmitting}>
                        {isSubmitting ? "Saving...": "save"}
                    </button>
                </Form>
                )}
            </Formik>
        </div>
    )
}

export default TaskForm;
