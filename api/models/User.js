var User = {
  attributes: {
    username: {
      type: 'string',
      unique: true
    },
    email: {
      type: 'email',
      unique: true
    },
    passports: {
      collection: 'Passport',
      via: 'user'
    },
    templates: {
      collection: 'Template',
      via: 'owner'
    },
    gifts: {
      collection: 'Gift',
      via: 'owner'
    }
  }
};

module.exports = User;
