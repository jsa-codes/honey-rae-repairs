import { Link } from 'react-router-dom';
import "./Tickets.css"

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

    // Function that determines if the currently logged in user can close the ticket
    // Is the currently logged in user that same as the user assigned to the ticket?
    // AND IF the date completed is empty.
    const canClose = () => {
        if (userEmployee?.id === assignedEmployee?.id && ticketObject.dateCompleted === "") {
            return <button onClick={closeTicket} className='ticket__finish'>Finish</button>
        } 
        else {
            return ""
        }
    }

    // IF the current user is NOT staff...
    // Fetch the serviceTicket with the ticket id that matches the ticket we're deleting, we have to make sure we are getting the right ticket so we use the route parameter which is the ticket's id.
    // The only option we need is the method for deleting the ticket.
    // THEN update state 
    const deleteButton = () => {
        if (!currentUser.staff) {
            return <button onClick={() => {
                fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`,{
                    method: "DELETE"
                })
                .then(() => {
                    getAllTickets()
                })
                
            }} className='ticket__delete'>Delete</button>
        } 
        else {
            return ""
        }
    }

    //Function that updates the ticket with a new date completed
    const closeTicket = () => {
        const copy = {
            userId: ticketObject.userId,
            description: ticketObject.description,
            emergency: ticketObject.emergency,
            dateCompleted: new Date()
        }

        return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        })
        .then(response => response.json())
        .then(() =>  {
        
        })
    }

    const buttonOrNoButton = () => {
        if (currentUser.staff) {
        return <button
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
                    else {
                            return ""
                    }
        }
    

    return (<section className='ticket' key={`ticket--${ticketObject.id}`}>
        <header>
            {

                currentUser.staff 
                ? `Ticket ${ticketObject.id}`
                : <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
            
            }
        </header>
        <section>{ticketObject.description}</section>
        <section className='emergency'>Emergency: {ticketObject.emergency ? '🆘' : 'No'}</section>
        <footer>

            {
                // IF true show the employee that is working on the ticket
                // IF false then show the Claim button
                ticketObject.employeeTickets.length
                    ? `Currently being worked on by ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""} `
                    : buttonOrNoButton()
            }
            {
                canClose()
            }
            {
                deleteButton()
            }
        </footer>
        </section>
    );
}