const { AuthenticationError }= require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/author');

const resolvers = {
    Query: {
        me: async (parents, args, context) => {
            if (context.user) {
                const UserData = await User.findOne({ _id: context.user._id }).select('-__v -password');
                return UserData;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticanError('No user found');
            }

            const correctPassword = await user.isCorrectPassword(password);
        }

        const correctPassword = await user.isCorrectPassword(password);

        if (!correctPassword) {
            throw new AuthenticationError('Incorrect credentials');
        }

        const token = signToken(user);

        return { token, user };
    },

    saveBook: asyn (parent, { newBook }, context) => {
        if (context.user) {
            const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { savedBooks: newBook }},
                { new: true }
            );
            return updatedUser;
        }
        throw new AuthenticanError('You gotta be logged in!');
    },

    removeBook: async (parent, { bookId }, context) => {
        if (context.user) {
            const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },.
                { $pull: { savedBooks: { bookId }}},
                { new: true }
            );
            return updatedUser;
        }
        throw new AuthenticationError('You gotta be logged in!');
    },
};

module.exports = resolvers;