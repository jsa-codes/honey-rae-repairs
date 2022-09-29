import { useEffect, useState } from 'react';

export const CustomerForm = () => {
    // TO-DO: Provide initial state for profile
    const [profile, updateProfile] = useState({
        address: '',
        phoneNumber: '',
        userId: 0,
    });

    const [feedback, setFeedback] = useState('');

    // Get the item out of localStorage
    const localHoneyUser = localStorage.getItem('honey_user');
    // Parse it back into an object
    const honeyUserObject = JSON.parse(localHoneyUser);

    useEffect(() => {
        if (feedback !== '') {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(''), 3000);
        }
    }, [feedback]);

    // TO-DO: Get employee profile info from API and update state
    useEffect(() => {
        fetch(`http://localhost:8088/customers?userId=${honeyUserObject.id}`)
            .then((response) => response.json())
            .then((data) => {
                const customerObject = data[0];
                updateProfile(customerObject);
            });
    }, []);

    const handleSaveButtonClick = (event) => {
        event.preventDefault();

        /*
            TO-DO: Perform the PUT fetch() call here, with options, to update the profile.
            Navigate user to home page when done.
        */
        return fetch(`http://localhost:8088/customers/${profile.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            // Stringify the state variable
            body: JSON.stringify(profile),
        }).then(() => {
            setFeedback('Customer profile successfully updated!');
        });
    };

    return (
        <>
            <div
                className={`${feedback.includes('Error') ? 'error' : 'feedback'} 
                ${feedback === '' ? 'invisible' : 'visible'}`}
            >
                {feedback}
            </div>
            <form className='profile'>
                <h2 className='profile__title'>Customer Details</h2>
                <fieldset>
                    <div className='form-group'>
                        <label htmlFor='address'>Address:</label>
                        <input
                            required
                            autoFocus
                            type='text'
                            className='form-control'
                            value={profile.address}
                            onChange={(evt) => {
                                // Copy state
                                const copy = { ...profile };
                                // Modify the copy
                                copy.address = evt.target.value;
                                // Update state with the copy
                                updateProfile(copy);
                            }}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className='form-group'>
                        <label htmlFor='number'>Phone Number:</label>
                        <input
                            type='number'
                            className='form-control'
                            value={profile.phoneNumber}
                            onChange={(evt) => {
                                // Copy state
                                const copy = { ...profile };
                                // Modify the copy
                                copy.phoneNumber = evt.target.value;
                                // Update state with the copy
                                updateProfile(copy);
                            }}
                        />
                    </div>
                </fieldset>
                <button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} className='btn btn-primary'>
                    Save Profile
                </button>
            </form>
        </>
    );
};
