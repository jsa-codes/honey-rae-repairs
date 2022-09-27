export const Employee = ({}) => {
    return (
        <section className='employee' key={`employee--${employee.id}`}>
            <div>Name: {employee.fullName}</div>
            <div>Email: {employee.email}</div>
        </section>
    );
}