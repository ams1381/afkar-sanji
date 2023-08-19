export const AuthValidator = (Input,AuthLevel) => {
        if(AuthLevel == 'PhoneNumber')
        {
            if(!Input)
                return('لطفا شماره همراه را وارد کنید');
            const pattern = new RegExp('09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}');
            if(Input.length > 11 || !pattern.test(Input))
                return('شماره همراه را درست وارد کنید');
        }
        else
        {
            if(!Input)
                return('کد ارسال شده را وارد کنید')
            else if(Input.length < 5)
                return('کد وارد شده اشتباه است');
        }
}   