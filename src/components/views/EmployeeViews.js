import { Outlet, Route, Routes } from 'react-router-dom';
import { CustomerDetails } from '../customers/CustomerDetails';
import { CustomerList } from '../customers/CustomerList';
import { EmployeeDetails } from '../employees/EmployeeDetails';
import { EmployeeList } from '../employees/EmployeeList';
import { CustomerForm } from '../profile/CustomerForm';
import { EmployeeForm } from '../profile/EmployeeForm';
import { Profile } from '../profile/Profile';
import { TicketContainer } from '../tickets/TicketContainer';
import { TicketEdit } from '../tickets/TicketEdit';

export const EmployeeViews = () => {
    return (
        <Routes>
            <Route
                path='/'
                element={
                    <>
                        <h1>Honey Rae Repair Shop</h1>
                        <div>Your one-stop-shop to get all your electronics fixed</div>

                        <Outlet />
                    </>
                }
            >
                <Route path='tickets' element={<TicketContainer />} />
                <Route path='employees' element={<EmployeeList />} />
                <Route path='customers' element={<CustomerList />} />
                <Route path='employees/:employeeId' element={<EmployeeDetails />} />
                <Route path='customers/:customerId' element={<CustomerDetails />} />
                
                <Route path='profile' element={<Profile />} />
                <Route path='profile' element={<EmployeeForm />} />
                <Route path='profile' element={<CustomerForm />} />
            </Route>
        </Routes>
    );
};
