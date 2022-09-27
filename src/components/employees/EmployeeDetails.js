import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const EmployeeDetails = () => {
    const {employeeId} = useParams()
    const [employee, updateEmployee] = useState()

    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)
            .then(response => response.json())
            // Capture the data in the response that we get back from json
            .then((data) =>  {
                const singleEmployee = data[0]
                updateEmployee(singleEmployee)
            })
        }, [employeeId]
    )
    
    return (
        <section className='employee'>
            <header>Name: {employee.user.fullName}</header>
            <div>Specialty: {employee.specialty}</div>
            <div>Rate: {employee.rate}</div>
        </section>
    );
}