const removeMongooseExtras = (object) => {
    delete object.createdAt
    delete object.updatedAt
    delete object.__v

    return object
}

const helper = {
    removeMongooseExtras, 
}

module.exports = helper