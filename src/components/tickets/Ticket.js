import { Link } from 'react-router-dom';

// getAllTickets is a function reference being passed down from the Parent
export const Ticket = ({ ticketObject, currentUser, employees, getAllTickets }) => {
    
    // Find the assigned employee for the current ticket
    let assignedEmployee = null

    // Checking the length of the array "employeeTickets," which is a property on ticketObject.
    if (ticketObject.employeeTickets.length > 0) {
        // The array is ONLY going to have one object in them, hence [0]. We extract that object from the array.
        const ticketEmployeeRelationship = ticketObject.employeeTickets[0]
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
    }

    // Find the employee profile  object for the current user
    const userEmployee = employees.find(employee => employee.userId === currentUser.id)


    return (<section className='ticket' key={`ticket--${ticketObject.id}`}>
        <header>
            {

                currentUser.staff 
                ? `Ticket ${ticketObject.id}`
                : <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
            
            }
        </header>
        <section>{ticketObject.description}</section>
        <section>Emergency: {ticketObject.emergency ? '🆘' : 'No'}</section>
        <footer>

            {
                // IF true show the employee that is working on the ticket
                // IF false then show the Claim button
                ticketObject.employeeTickets.length
                    ? `Currently being worked on by ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""} `
                    : <button
                        onClick={() =>{
                            fetch(`http://localhost:8088/employeeTickets`, {
                                method: "POST",
                                headers: {
                                    'Content-Type': "application/json"
                                },
                                body: JSON.stringify({
                                    employeeId: userEmployee.id,
                                    serviceTicketId: ticketObject.id
                                })
                            })
                            .then(response => response.json())
                            .then(() =>  {
                                // GET the state from the API again
                                getAllTickets()
                            })
                        }}
                        >Claim</button>
            }
        </footer>
        </section>
    );
}