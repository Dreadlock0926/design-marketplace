import './LoginPage.css';

function RegisterPage() {
    return (
        <div className="acc-page-body">
            <form className='acc-form'>
                <h1>Register</h1>
                <div className="input-fields-container-acc-page">
                        <label className='form-input'>
                            <input type="email" name="email" placeholder='Email'/>
                        </label>
                        <div className="name-details-reg">
                            <label className='form-input'>
                                <input type="text" name="firstName" placeholder='First Name'/>
                            </label>
                            <label className='form-input'>
                                <input type="text" name="lastName" placeholder='Last Name'/>
                            </label>
                        </div>
                        <label className='form-input'>
                            <input type="text" name="username" placeholder='Username'/>
                        </label>
                        <label className='form-input'>
                            <input type="password" name="password" placeholder='Password' />
                        </label>
                        <label className='form-input'>
                            <input type="password" name="confirmPassword" placeholder='Confirm Password' />
                        </label>
                </div>
                <button className='acc-page-submit-btn' type="submit">Submit</button>
                <h4>Already a Member? <span className='nam-reg'>Login</span></h4>
            </form>
        </div>
    );
}

export default RegisterPage;
