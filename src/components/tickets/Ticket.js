export const Ticket = ({ ticketObject }) => {
    
    return (
        <section className='ticket' key={`ticket--${ticketObject.id}`}>
            <header>
                <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
            </header>
            <section>{ticketObject.description}</section>
            <footer>Emergency: {ticketObject.emergency ? '🆘' : 'No'}</footer>
        </section>
    );
}