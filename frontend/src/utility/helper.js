let fn = {};

fn.SetItem = async (key, item) => {
  sessionStorage.setItem(key, JSON.stringify(item));
};

fn.GetItem = (key) => {
  let result = sessionStorage.getItem(key);
  result = JSON.parse(result);
  return result;
};

fn.RemoveItem = (key) => {
  return sessionStorage.removeItem(key);
};

fn.GetTokenHeader = async () => {
  const user = await fn.GetItem("user");
  let token = user && user.token ? user.token : null;
  return {
    "Content-Type": "application/json",
    Authorization: token,
  };
};

fn.userLoggedIn = () => {
  const user = fn.GetItem("user");
  if (user) {
    return true;
  }
  return false;
};

fn.GetUserId = () => {
  const user = fn.GetItem("user");
  const user_id = user?.user_id;
  return {
    userId: user_id,
  };
};

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

fn.GetUserFullName = () => {
  const user = fn.GetItem("user");
  if (user) {
    if (!fn.IsNull(user.name)) {
      return `${user.name} `;
    }
  }
  return null;
};

// GET LOGGED IN USER First NAME
fn.GetUserFirstName = () => {
  const user = fn.GetItem("user");
  if (user) {
    if (!fn.IsNull(user.name)) {
      return `${user.name.split("")[0]} `;
    }
  }
  return null;
};

// GET LOGGED IN USER First NAME
fn.GetUserNameInitials = () => {
  const user = fn.GetUserFullName("user");

  let initials = user
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return initials;
};

fn.GetRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

fn.IsLightColor = (color) => {
  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155;
};

export default fn;
