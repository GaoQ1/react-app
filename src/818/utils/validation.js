const isEmpty = value => value === undefined || value === null || value === '';
const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0 /* first error */ ];

export function required(errorMsg='Required') {
  return (value)=>{
      if (isEmpty(value)) {
        return  errorMsg;
      }
  }
}

export function verifyPhone(errorMsg='手机号错误'){
  return (value)=>{
    if(!/^[\d]{11}$/.test(value))
      return errorMsg;
  }
}

export function verifyCard(errorMsg='卡号错误'){
  return (value)=>{
    if(!verifyCardMOD7(value))
      return errorMsg;
  }

  function verifyCardMOD7(value){
    if(isEmpty(value))return true;
    let reg=/^(6)([0-6]{1})(\d{10})$/,
    arrSplit = value.match(reg);
    return arrSplit&&(arrSplit[1]+'0'+arrSplit[3])%7==arrSplit[2];
  }
}

export function createValidator(rules) {
  return (data = {}) => {
    let errors;
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key], data);
      if(error)
      {
        errors= errors||{};
        errors[key] = error||'';
      }
    });
    return errors;
  };
}
