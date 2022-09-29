export const Ticket = () => {
    
    return (
        <section className='ticket' key={`ticket--${ticket.id}`}>
            <header>
                <Link to={`/tickets/${ticket.id}/edit`}>Ticket {ticket.id}</Link>
            </header>
            <section>{ticket.description}</section>
            <footer>Emergency: {ticket.emergency ? '🆘' : 'No'}</footer>
        </section>
    );
}