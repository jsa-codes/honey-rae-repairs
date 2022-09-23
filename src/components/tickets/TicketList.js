import { useEffect, useState } from 'react';
import "./TicketList.css"

// Initial state of tickets is an "empty array"
export const TicketList = () => {
    const [tickets, setTickets] = useState([]);

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
    return (
        <>
            <h2>List of Tickets</h2>

            <article className='tickets'>
                {
                    tickets.map(
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
