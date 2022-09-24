import { useEffect, useState } from 'react';
import "./TicketList.css"

// Initial state of tickets is an "empty array"
export const TicketList = () => {
    // State #1) - All Tickets
    const [tickets, setTickets] = useState([]);
    // State #2) - Showing filtered tickets based on conditions of "employee or customer"
    const [filteredTickets, setFilteredTickets] = useState([]);

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

// State Change #1) - Contains ALL of the tickets
    useEffect(
        () => {
            // View the initial state of tickets
            // We're fetching the data from the resource in our database that is "serviceTickets"
            // That data (a JSON string) is then converted to a JS string
            // It's then stored in the variable "ticketArray"
            // We then use the "setTickets" function to "set" the state to those tickets we now have.
            fetch(`http://localhost:8088/serviceTickets`)
                .then((response) => response.json())
                .then((ticketArray) => {
                    setTickets(ticketArray);
                });
        },
        [] // When this array is empty, you are observing initial component state
    );
    
    // State Change #2) - Contains the "filtered" Tickets
    // Watching for every time the "tickets" state variable changes
    useEffect(
        () => { 
            if (honeyUserObject.staff) {
                // For employees - set "Filtered Tickets" to ALL tickets
                setFilteredTickets(tickets)
            }
            else {
                // For customers — filter the tickets, check each ticket to see if it's userId is equal to the logged in user's id.
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFilteredTickets(myTickets)
            }
        }, [tickets] // Observing all tickets. IF anything changes, i.e. - a different user logs in, then filter those tickets by matching the userId of those tickets to the logged in user's id.
    )

    return (
        <>
            <h2>List of Tickets</h2>

            <article className='tickets'>
                {
                    filteredTickets.map(
                        (ticket) => {
                            return <section className='ticket'>
                                <header>{ticket.description}</header>
                                <footer>Emergency: {ticket.emergency ? "🆘" : "No"}</footer>

                            </section>
                        }
                    )
                }

            </article>
        </>
    );
};
