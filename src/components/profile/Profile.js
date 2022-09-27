import { CustomerForm } from './CustomerForm';
import { EmployeeForm } from './EmployeeForm';

export const Profile = () => {

    // Get the item out of localStorage
    const localHoneyUser = localStorage.getItem('honey_user');
    // Parse it back into an object
    const honeyUserObject = JSON.parse(localHoneyUser);

    if (honeyUserObject.staff) {
        return <EmployeeForm />;
    } else {
        return <CustomerForm />;
    }
};
