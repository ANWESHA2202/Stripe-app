export const LoginValidate = (values) => {
    const errors = {};
    const { name, value } = values;
    switch (name) {
        case 'username':
            if (!value) {
                errors.username = 'Username is required'
            } else if (value.length < 3) {
                errors.username = 'Username must be of length min 3'
            } else {
                errors.username = ''
            }
            break;

        case 'password':
            if (!value) {
                errors.password = 'Password is required'
            } else if (value.length < 6) {
                errors.password = 'Password length must be of min 6'
            } else {
                errors.password = ''
            }
            break;

        default:
            break;
    }



    return errors;
};

export const SignupValidate = (values) => {
    let errors = {};

    if (!values.username) {
        errors.username = 'Username is required'
    } else if (values.username.length < 3) {
        errors.username = 'Username must be of length min 4'
    }

    if (!values.email) {
        errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }

    if (!values.password) {
        errors.password = 'Password is required'
    } else if (values.password.length < 6) {
        errors.password = 'Password length must be of min 7'
    }
    return errors;
}