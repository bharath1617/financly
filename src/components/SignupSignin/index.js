import React, { useState } from "react";
import './style.css';
import Input from "../Input";
import Button from "../Button";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db, doc, provider, setDoc } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { getDoc } from "firebase/firestore";
function SignupSignin() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const [loginform, setLoginform] = useState(false)
    const navigate = useNavigate();

    function signupwithemail() {
        console.log(name);
        console.log(email);
        console.log(password);
        console.log(confirmPassword);

        if (name !== "" && email !== "" && password !== "" && confirmPassword !== "") {
            if (password === confirmPassword) {
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        console.log("User-", user);
                        toast.success("user created");
                        setLoading(false);
                        setName("");
                        setEmail("");
                        setConfirmPassword("");
                        setPassword("");
                        createdoc(user);
                        navigate("/dashboard");
                        // create the doc with user id as the following id
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        toast.error(errorMessage);
                        setLoading(false)
                        // ..
                    });
            }
            else {
                toast.error("password and confirm should be same");
                setLoading(false)
            }
        }
        else {
            toast.error("All fields are mandatory!");
            setLoading(false)
        }
    }
    function loginusingEmail() {
        console.log(email);
        console.log(password);
        setLoading(true)
        if (email !== "" && password !== "") {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    toast.success("User Logges In!")
                    console.log("user logged in -> ", user);
                    setLoading(false)
                    navigate("/dashboard");

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    toast.error(errorMessage);
                    setLoading(false)
                });
        }
        else {
            toast.error("All fields are mandatory!")
        }
    }
    async function createdoc(user) {
        setLoading(true)
        if (!user)
            return;

        const userRef = doc(db, "users", user.uid);
        const userData = await getDoc(userRef);
        if (!userData.exists()) {
            try {
                await setDoc(doc(db, "users", user.uid), {
                    name: user.displayName ? user.displayName : name,
                    email,
                    photoURL: user.photoURL ? user.photoURL : "",
                    createdAt: new Date(),
                });
                setLoading(false)
            } catch (e) {
                toast.error(e.message)
                setLoading(false)
            }
        }
        else {
            toast.error("Doc already exist")
            setLoading(false)
        }
    }

    function googleauth() {
        setLoading(true);
        try{
            signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                setLoading(false);
                createdoc(user);
                toast.success("User authinticated")
                navigate("/dashboard");
                console.log("user-gog ",user);
                // IdP data available using getAdditionalUserInfo(result)

            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                setLoading(false);
                toast.error(errorMessage);

            });
        }
        catch(e){
            setLoading(false)
            toast.error(e.message)
        }
    
    }
    return (

        <>
            {loginform ?
                (<><div className="signup-wrap">
                    <h2 className="titel">Log In on <span style={{ color: "#2970ff" }}>Financely.</span></h2>
                    <form >
                        <Input label={'Email'}
                            type='email'
                            state={email} setState={setEmail}
                            placeholder={"Email"} />
                        <Input label={'example@gmail.com'}
                            type='password'
                            state={password} setState={setPassword}
                            placeholder={"Example123"} />
                        <Button
                            disabled={loading}
                            text={loading ? "Loading..." : "Login Using Email and Password"} onClick={loginusingEmail} />
                        <p className="login-para">or</p>
                        <Button text={loading ? "Loading..." : "Login Using Google"} blue={true} onClick={googleauth} />
                        <p className="login-para" onClick={() => setLoginform(!loginform)}>Or Don't Have an Account? Click Here</p>
                    </form>
                </div></>)
                :
                (<div className="signup-wrap">
                    <h2 className="titel">Sign Up on <span style={{ color: "#2970ff" }}>Financely.</span></h2>
                    <form >
                        <Input label={'Fullname'}
                            state={name} setState={setName}
                            placeholder={"bharath"} />
                        <Input label={'Email'}
                            type='email'
                            state={email} setState={setEmail}
                            placeholder={"Email"} />
                        <Input label={'example@gmail.com'}
                            type='password'
                            state={password} setState={setPassword}
                            placeholder={"Example123"} />
                        <Input label={'Confirm-Password'}
                            type='password'
                            state={confirmPassword} setState={setConfirmPassword}
                            placeholder={"Example123"} />
                        <Button
                            disabled={loading}
                            text={loading ? "Loading..." : "Sign Up Using Email and Password"} onClick={signupwithemail} />
                        <p className="login-para">or</p>
                        <Button text={loading ? "Loading..." : "Sign Up Using Google"} blue={true} onClick={googleauth} />
                        <p className="login-para" onClick={() => setLoginform(!loginform)}>Or Have an Account? Click Here</p>
                    </form>
                </div>)
            }
        </>
    )
}

export default SignupSignin;