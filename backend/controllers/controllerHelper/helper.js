const checkAuthorization = (req, res, isForMedicalOrganization) => {
    // Check for user    
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Check for a medical organization demand
    if (req.user.isMedicalOrganization !== isForMedicalOrganization) {
        res.status(401)
        throw new Error('User not authorized')
    }
}

const helper = {
    checkAuthorization,
}

module.exports = helper