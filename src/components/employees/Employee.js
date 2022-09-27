
// The props — which are placed in a single object — (id, fullName and email) are being deconstructed and passed in from its Parent Container — EmployeeList
// EmployeeList has access to state, but Employee does not. Which is why these props are being passed into the Employee component.
export const Employee = ({id, fullName, email}) => {
    return (
        <section className='employee'>
            <div>Name: {fullName}</div>
            <div>Email: {email}</div>
        </section>
    );
}