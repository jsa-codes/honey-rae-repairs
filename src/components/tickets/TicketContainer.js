import { useState } from 'react'
import { TicketList } from './TicketList';
import { TicketSearch } from './TicketSearch';

// TicketContainer is the Parent for TicketSearch and TicketList
//      TicketSearch and TicketList are siblings
// TicketContainer maintains "state" for the siblings, and has the setter function to change the state of searchTerms
//      TicketSearch and TicketList have access to the state via "props"
export const TicketContainer = () => {
    const [searchTerms, setSearchTerms] = useState('')

    // TicketContainer is passing props down to the sibling components
    return (
        <>
            <TicketSearch setterFunction={setSearchTerms}/>
            <TicketList searchTermState={searchTerms} />
        </>
    );
}