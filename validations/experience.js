const Validator = require('validator');
const isEmpty =  require('./is-empty');

module.exports = function validateExperienceInput(data){

    let errors= {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';




    if(Validator.isEmpty(data.title)){
        errors.title = 'Job title Field is Required';
    }
    if(Validator.isEmpty(data.company)){
        errors.company = 'company Field is Required';
    }
    if(Validator.isEmpty(data.from)) {
        errors.from = 'From Date Field is Requirefrom';


    }

    return{
        errors : errors,
        isValid : isEmpty(errors)
    }

};