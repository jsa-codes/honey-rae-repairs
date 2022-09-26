import { useEffect, useState } from 'react'

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

    return <>
        {
            employees.map(employee => {
                return <section>
                    <div>Name: {employee.fullName}</div>
                    <div>Email: {employee.email}</div>
                </section>
            })
        }
    </>

}