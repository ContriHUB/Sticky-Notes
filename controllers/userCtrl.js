const express = require("express");
const User = require("../models/User");

const userCtrl = {
  getUserDetails: async (userId) => {
    let user = await User.findById(userId).select("-password");
    if (!user) {
      return null;
    }
    return user;
  },
};
