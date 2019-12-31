export const isNameValid = (name) => {
  let isValid = true;
  const nameFilter = new RegExp("^[a-zA-Z]{2,}\\s.?[a-zA-Z]{1,}.?'?-?.[a-zA-Z]{1,}\\s?'?-?([a-zA-Z]{1,}'?-?.?)*.?$");
  if (name === '') {
    isValid = false;
  } else if (!nameFilter.test(name)) {
    console.log(name, nameFilter.test(name))
    isValid = false;
  } else if (name.length < 2) {
    isValid = false;
  }
  return isValid;
}

export const isEmailValid = (email) => {
  let isValid = true;
  const emailFilter = new RegExp('^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')
  if (email === '') {
    isValid = false;
  } else if (!emailFilter.test(email)) {
    console.log(email, emailFilter.test(email))
    isValid = false;
  } else if (email.length < 6) {
    isValid = false;
  }
  return isValid;
}
