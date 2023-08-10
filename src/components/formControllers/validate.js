export const LoginValidate = (values) => {
    const errors = {};
    const { name, value } = values;
    switch (name) {
        case 'email':
            if (!value) {
                errors.email = 'Email address is required';
            } else if (!/\S+@\S+\.\S+/.test(value)) {
                errors.email = 'Email address is invalid';
            } else {
                errors.email = ''
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
    const errors = {}
    const { name, value } = values;
    switch (name) {
        case 'username':
            if (!value) {
                errors.username = 'Name is required';
            } else if (value.length < 3) {
                errors.username = 'Name must have 3 min characters';
            } else {
                errors.username = ''
            }
            break;
        case 'email':
            if (!value) {
                errors.email = 'Email address is required';
            } else if (!/\S+@\S+\.\S+/.test(value)) {
                errors.email = 'Email address is invalid';
            } else {
                errors.email = ''
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
}