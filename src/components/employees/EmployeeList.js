import { useEffect, useState } from 'react'
import { Employee } from './Employee'
import "./Employees.css"

// STEP 1) Set initial state
// STEP 2) Create first useEffect
export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    // Observes when initial state is done, the go fetch permanent state, then update our component state
    useEffect(
        () => {
            fetch(`http://localhost:8088/users?isStaff=true`)
                .then((response) => response.json())
                .then((employeeArray) => {
                    setEmployees(employeeArray);
                });
        }, [employees]
    )
// REMEMBER: We need a unique key because we are iterating 👀
// Map Employees
//      - FOR EACH Employee set the employee's (id, fullName and email)
//          - 
    return <article className='employees'>
        {
            employees.map(employee => <Employee 
                id={employee.id} 
                fullName={employee.fullName} 
                email={employee.email}/>)
        }
    </article>

}