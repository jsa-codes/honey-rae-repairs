import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TicketList.css';

// Initial state of tickets is an "empty array"
export const TicketList = ({ searchTermState }) => {
    // State #1) - All Tickets
    const [tickets, setTickets] = useState([]);
    // State #2) - Showing filtered tickets based on conditions of "employee or customer"
    const [filteredTickets, setFilteredTickets] = useState([]);
    // State #3) - Showing filtered tickets based on whether or not the employee clicked the "Emergency Only" button.
    const [emergency, setEmergency] = useState(false);
    const [openOnly, updateOpenOnly] = useState(false);

    const navigate = useNavigate();

    // honeyUserObject has:
    //  - primary key of the user
    //  - staff key on it (can be true or false)
    const localHoneyUser = localStorage.getItem('honey_user');
    const honeyUserObject = JSON.parse(localHoneyUser);

    // This useEffect observes state inherited from the parent — searchTermState maintained in (TicketContainer)
    useEffect(
        () => {
            const searchedTickets = tickets.filter(ticket => {
            return ticket.description.toLowerCase().startsWith(searchTermState.toLowerCase())
        })
        setFilteredTickets(searchedTickets)
        },[searchTermState]
    )

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
                setFilteredTickets(tickets);
            } else {
                // For customers — filter the tickets, check each ticket to see if its userId is equal to the logged in user's id.
                const myTickets = tickets.filter((ticket) => ticket.userId === honeyUserObject.id);
                setFilteredTickets(myTickets);
            }
        },
        [tickets] // Observing all tickets. IF anything changes, i.e. - a different user logs in, then filter those tickets by matching the userId of those tickets to the logged in user's id.
    );

    // State Change #3) - Filtered Tickets will now show ONLY Emergency Tickets

    useEffect(() => {
        if (emergency) {
            const emergencyTickets = tickets.filter((ticket) => ticket.emergency === true);
            setFilteredTickets(emergencyTickets);
        } else {
            setFilteredTickets(tickets);
        }
    }, [emergency]);

    useEffect(() => {
        if (openOnly) {
            const openTicketArray = tickets.filter((ticket) => {
                return ticket.userId === honeyUserObject.id && ticket.dateCompleted === '';
            });
            setFilteredTickets(openTicketArray);
        } else {
            const myTickets = tickets.filter((ticket) => ticket.userId === honeyUserObject.id);
            setFilteredTickets(myTickets);
        }
    }, [openOnly]);

    // The button is a "user interaction". They want to change the "state" of the component when they click on this Emergency Button

    // IF honeyUserObject is staff (which is true)
    //      - Show the "Emergency Only" button
    // Otherwise, show an empty "" (which will show nothing — no button will appear)
    // This way, Employees can click the "Emergency Only" button to see those tickets that are "emergency tickets (urgent tickets)", but customers will only see their tickets they've submitted displayed
    return (
        <>
            {honeyUserObject.staff ? (
                <>
                    <button
                        onClick={() => {
                            setEmergency(true);
                        }}
                    >
                        Emergency Only
                    </button>
                    <button
                        onClick={() => {
                            setEmergency(false);
                        }}
                    >
                        Show All
                    </button>
                </>
            ) : (
                <>
                    <button onClick={() => navigate('/ticket/create')}>Create Ticket</button>
                    <button onClick={() => updateOpenOnly(true)}>Show Open Tickets</button>
                    <button onClick={() => updateOpenOnly(false)}>All My Tickets</button>
                </>
            )}
            <h2>List of Tickets</h2>

            <article className='tickets'>
                {filteredTickets.map((ticket) => {
                    return (
                        <section className='ticket' key={`ticket--${ticket.id}`}>
                            <header>{ticket.description}</header>
                            <footer>Emergency: {ticket.emergency ? '🆘' : 'No'}</footer>
                        </section>
                    );
                })}
            </article>
        </>
    );
};
