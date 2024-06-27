const UserProfile = require("../Modals/UserProfile");

// # COUNT       --> 1
// # DESCRIPTION --> CREATE USER PROFILE
// # ROUTE       --> profile/create-user-profile
// # METHOD      --> POST
const CreateUserProfile = async (req, res) => {
  try {
    const { dob, phone, designation, description, image, address } = req.body;
    const user = req.user;

    const userInfo = {
      user_id: user._id,
      dob,
      phone,
      designation,
      description,
      image,
      address,
    };

    const profileModal = await UserProfile.findOneAndUpdate(
      { user_id: user._id },
      userInfo,
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    // first parameter--> try to find document by user_id
    // second parameter --> document data
    // new  --> return the updated document
    // upsert --->  Create a new document if no document matches the query.
    // setDefaultsOnInsert--> Apply the defaults specified in the schema if a new document is created.

    await profileModal.save();
    res
      .status(201)
      .json({ message: "Profile data saved successfully", success: true });
  } catch (err) {
    console.log("error--->", err);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// # COUNT       --> 2
// # DESCRIPTION --> GET USER PROFILE
// # ROUTE       --> profile/get-user-profile
// # METHOD      --> POST
const GetUserProfile = async (req, res) => {
  try {
    const { user_id } = req.body;
    const profile = await UserProfile.findOne({ user_id });

    if (profile) {
      res.status(201).json({
        message: "Profile fetched Successfully",
        success: true,
        data: [profile],
      });
    } else {
      res.status(403).json({
        message: "Profile not found",
        success: false,
        data: [],
      });
    }
  } catch (err) {
    console.log("error--->", err);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  CreateUserProfile,
  GetUserProfile,
};
