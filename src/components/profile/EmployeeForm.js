import { useEffect, useState } from "react"

export const EmployeeForm = () => {
    // TO-DO: Provide initial state for profile
    const [profile, updateProfile] = useState({
        specialty: '',
        rate: 0,
        userId: 0,
    });

    // Get the item out of localStorage
    const localHoneyUser = localStorage.getItem('honey_user');
    // Parse it back into an object
    const honeyUserObject = JSON.parse(localHoneyUser);

    // TO-DO: Get employee profile info from API and update state
    useEffect(() => {
        fetch(`http://localhost:8088/employees?userId=${honeyUserObject.id}`)
            .then((response) => response.json())
            .then((data) => {
                functionName(variableName);
            });
    }, []);

    const handleSaveButtonClick = (event) => {
        event.preventDefault();

        /*
            TO-DO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
    };

    return (
        <form className='profile'>
            <h2 className='profile__title'>New Service Ticket</h2>
            <fieldset>
                <div className='form-group'>
                    <label htmlFor='specialty'>Specialty:</label>
                    <input
                        required
                        autoFocus
                        type='text'
                        className='form-control'
                        value={profile.specialty}
                        onChange={(evt) => {
                            // TO-DO: Update specialty property
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className='form-group'>
                    <label htmlFor='name'>Hourly rate:</label>
                    <input
                        type='number'
                        className='form-control'
                        value={profile.rate}
                        onChange={(evt) => {
                            // TO-DO: Update rate property
                        }}
                    />
                </div>
            </fieldset>
            <button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} className='btn btn-primary'>
                Save Profile
            </button>
        </form>
    );
}
