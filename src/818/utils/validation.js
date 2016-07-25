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
    if(!/^6[\d]{11}$/.test(value))
      return errorMsg;
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
