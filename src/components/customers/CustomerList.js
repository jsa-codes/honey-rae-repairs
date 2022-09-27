import { useEffect, useState } from 'react';
import { Customer } from './Customer';
import "./Customers.css"

export const CustomerList = () => {
    // STEP 1) fetches ALL Customers
    // STEP 2) Iterates the array in the JSX
    // STEP 3) Display the name of each Customer
    // STEP 4) Passes each object to the Customer component as a "prop"

    const [customers, setCustomers] = useState([]);

    useEffect(
        () => {
        fetch(`http://localhost:8088/customers?_expand=user`)
            .then((response) => response.json())
            .then((customerArray) => {
                setCustomers(customerArray);
            });
    }, [customers]);

    return <article className='customers'>
        {
            customers.map(customer => 
            <Customer
                key={`customer--${customer.id}`}
                id={customer.id}
                fullName={customer?.user?.fullName}
                email={customer?.user?.email}
                phoneNumber={customer.phoneNumber}
                address={customer.address}
                />)
        }

    </article>
};
