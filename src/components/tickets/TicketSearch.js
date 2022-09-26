
// Ticket has access to setSearchTerms via the key — setterFunction
//      The value of setterFunction is the value 
export const TicketSearch = ({setterFunction}) => {
    return (

        <div>
            <input 
                onChange={
                    (changeEvent) => {
                        setterFunction(changeEvent.target.value)
                    }
                }
            type="text" placeholder='Enter search terms' />
        </div>
    )
}