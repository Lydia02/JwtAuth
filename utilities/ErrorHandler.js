const handleError = (error) => {
    
    if (error.errors['name']) {
        return error.errors["name"].message
    }
    else if (error.errors['email']) {
        return error.errors["email"].message
    }
    else if (error.errors['role']) {
        return error.errors["role"].message
    }
    else if (error.errors['password']) {
        return error.errors["password"].message
    }

}

module.exports = handleError

