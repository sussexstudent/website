const { createApolloTypes, createPermissionTypes, localRequired } = require('./tasks');

Promise.all([createPermissionTypes(), createApolloTypes(), localRequired()]);
