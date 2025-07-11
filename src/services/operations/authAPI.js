import {toast} from "react-hot-toast"
import { setLoading, setToken } from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice"
import {setUser}  from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { endpoints } from "../apis"

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints

// Functions to make async backend calls with data from UI or store and then to update UI or control the navigation after receiving response.
export function sendOtp(email, navigate){
  return async (dispatch) => {

     const toastId = toast.loading("Loading...")
     dispatch(setLoading(true));

     try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })

      console.log("SENDOTP API RESPONSE............",  )

      console.log(response.data.success)

      if(!response.data.success){
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
     } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not send Otp");
     }
     dispatch(setLoading(false));
     toast.dismiss(toastId);
  }
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
){
  return async (dispatch) => {
     const toastId = toast.loading("Loading...")
     dispatch(setLoading(true));

     try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp
      })

      console.log("SIGNUP_API RESPONSE............", response)

      console.log(response.data.success)

      if(!response.data.success){
        throw new Error(response.data.message)
      }

      toast.success("Signup successful")
      navigate("/login")
     } catch (error) {
      console.log("SIGNUP_API ERROR............", error)
      toast.error("Could Not Sign up user")
     }
     dispatch(setLoading(false));
     toast.dismiss(toastId);
  }
}

export function login(
  email,
  password,
  navigate
) {
  return async ( dispatch) => {
    const toastId = toast.loading(".....loading");
    dispatch(setLoading(true));

    try{
       const response = await apiConnector("POST" , LOGIN_API ,{email,password} );
       console.log("LOGIN_API response .......",response);
       console.log("LOGIN_API SUCCESSS" , response.data.success);

       if(!response.data.success){
        console.log(response.data.message);
       }

       toast.success("Login Successfully") 
       dispatch(setToken(response.data.token));

             const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      dispatch(setUser({ ...response.data.user, image: userImage}));
      console.log("User Image url..." , response);

      localStorage.setItem("token" , JSON.stringify(response.data.token));
      localStorage.setItem("user" , JSON.stringify(response.data.user));
      navigate("/dashboard/my-profile");

    }
    catch(error){
      console.log(error)
          console.log("LOGIN API ERROR............", error)
          toast.error("Could Not LOGIN");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  }

}

export function logout(navigate) {
 return (dispatch) => {
  try{
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  }
  catch(error){
    console.log("LOGOUT ERROR" , error);
    toast.error("Could not Logout");
  }
 }
}

export function getPasswordResetToken(email, setEmailSent){
  return async(dispatch) =>{
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true));

    try {
     const response = await apiConnector("POST", RESETPASSTOKEN_API, {email});
     console.log("RESETPASSTOKEN_API RESPONSE............", response)

      console.log(response.data.success)

      if(!response.data.success){
        throw new Error(response.data.message)
      }
    
      toast.success("Mail Sent successful")
      setEmailSent(true);
    } catch (error) {
      console.log("RESETPASSTOKEN_API ERROR............", error)
      toast.error("Could Not Send Mail")
    }
    dispatch(setLoading(false));
     toast.dismiss(toastId);
  }
}

export function resetPassword(password, confirmPassword, token, navigate) {
  return async(dispatch)=>{
    const toastId = toast.loading("Loading in reset password")
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token})

      console.log("RESETPASSWORD_API RESPONSE............", response)

      console.log(response.data.success)

      if(!response.data.success){
        throw new Error(response.data.message)
      }
    
      toast.success("Password reset successful")
      navigate('/login')

    } catch (error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable to reset password");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
}



