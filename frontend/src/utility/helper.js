let fn = {};

// ! SET ITEM IN SESSION STORAGE
fn.SetItem = async (key, item) => {
  sessionStorage.setItem(key, JSON.stringify(item));
};

// @ GET ITEM FROM SESSION STORAGE
fn.GetItem = (key) => {
  let result = sessionStorage.getItem(key);
  result = JSON.parse(result);
  return result;
};

// # REMOVE ITEM FROM SESSION STORAGE
fn.RemoveItem = (key) => {
  return sessionStorage.removeItem(key);
};

// # GET AUTH TOKEN FROM SESSION STORAGE
fn.GetTokenHeader = () => {
  const user = fn.GetItem("user");
  let token = user && user.authToken ? user.authToken : null;
  return {
    "Content-Type": "application/json",
    Authorization: token,
  };
};

// $ CHECK IF USER IS LOGGED ON OR NOT
fn.userLoggedIn = () => {
  const user = fn.GetItem("user");
  if (user) {
    return true;
  }
  return false;
};

// $ GET LOGGED IN USER ID
fn.GetUserId = () => {
  const user = fn.GetItem("user");
  return user?.user_id;
};

// % CHECK IF INPUT VALUE IS NULL OR NOT
fn.IsNull = (input) => {
  if (input === null || input === undefined) return true;
  if (input) {
    if (typeof input === "string") {
      if (input.replace(/ /g, "") !== "") {
        return false;
      }
    }
    return false;
  }
  if (!isNaN(input)) return false;
  return true;
};

// ! GET LOGGED IN USER FULL NAME
fn.GetUserFullName = () => {
  const user = fn.GetItem("user");

  if (user) {
    if (!fn.isNullUndefinedOrEmpty(user.name)) {
      return fn.capitalizeFirstLetter(user.name);
    }
  }
  return null;
};

// @ GET LOGGED IN USER FIRST NAME
fn.GetUserFirstName = () => {
  const user = fn.GetItem("user");
  if (user) {
    if (!fn.isNullUndefinedOrEmpty(user.name)) {
      return fn.capitalizeFirstLetter(user.name.split("")[0]);
    }
  }
  return null;
};

// # GET LOGGED IN USER EMAIL
fn.GetUserEmail = () => {
  const user = fn.GetItem("user");
  if (user) {
    if (!fn.isNullUndefinedOrEmpty(user.email_address)) {
      return fn.capitalizeFirstLetter(user.email_address);
    }
  }
  return null;
};

// $ GET LOGGED IN USER NAME INITIALS
fn.GetUserNameInitials = () => {
  const user = fn.GetUserFullName("user");

  let initials = user
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return initials;
};

// % GENERATE A RANDOM COLOR
fn.GetRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// ! CHECK IF A COLOR IS BRIGHT OR DARK
fn.IsLightColor = (color) => {
  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155;
};

// @ CHECK IF INPUT VALUE IS NULL UNDEFINED OR EMPTY STRING
fn.isNullUndefinedOrEmpty = (arg) => {
  return arg === null || arg === undefined || arg === "";
};

// @ GET FIRST LETTER OF WORD CAPITALIZED
fn.capitalizeFirstLetter = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

export default fn;
