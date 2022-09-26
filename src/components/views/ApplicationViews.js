import { Outlet, Route, Routes } from 'react-router-dom';
import { TicketContainer } from '../tickets/TicketContainer';
import { TicketForm } from '../tickets/TicketForm';
import { CustomerViews } from './CustomerViews';
import { EmployeeViews } from './EmployeeViews';


// IS logged in user a Staff member or not.
//      - IF so, then show the correct views.
//          - REMEMBER: Staff is a property of the honeyUserObject
export const ApplicationViews = () => {

    const localHoneyUser = localStorage.getItem('honey_user');
    const honeyUserObject = JSON.parse(localHoneyUser);

    if (honeyUserObject.staff) {
        // Return employee views
        return <EmployeeViews />

    } else {
        // Return customer views
        return <CustomerViews />

    }

   
};
