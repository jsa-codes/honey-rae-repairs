import { CustomerViews } from './CustomerViews';
import { EmployeeViews } from './EmployeeViews';


// IS logged in user a Staff member or not.
//      - IF so, then show the correct views.
//          - REMEMBER: Staff is a property of the honeyUserObject

// In ApplicationViews we can customize the routes we're gonna support depending on the user type
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
