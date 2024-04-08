import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Head from 'next/head';

import SERVER_API_URL from "@/app/config";

function SignUpWithGoogle({ onClose, setUserLoggedIn, setCurrentPage }) {

    const [error, setError] = useState("");

    async function handleCallbackResponse(response) {
        const user = jwtDecode(response.credential);

        if (!user.email_verified) {
            setError('not verified email!');
        }
        try {
            const response = await axios.post(`${SERVER_API_URL}/auth/signup`, {
                firstName: user.given_name, lastName: user.family_name || "WithUs", email: user.email, password: "1234"
            });
            console.log('user2', response.status)

            if (response.status === 201) {
                console.log('user3', response.data)
                const user = response.data;
                localStorage.setItem("token", user.token)
                const decodedData = jwtDecode(user.token);
                if (decodedData) {
                    setUserLoggedIn(decodedData);
                }
                onClose();
            }
        } catch (e) {
            if (e.code === 'ERR_NETWORK') {
                setError('Please check your internet connection');
            } else if (e.response && e.response.status === 406) {
                setError('This email is already taken user!');
            } else {
                setError('unKnown error, please refresh and try again!');
            }
        }
        document.getElementById("signInDiv").hidden = true;
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id:
                "968408422808-i6ch6rd76oq3rrhid31e5316o01g2gkn.apps.googleusercontent.com",
            callback: handleCallbackResponse,
        });
        google.accounts.id.renderButton(document.getElementById("signInDiv"), {
            theme: "outline",
            size: "large",
        });
    }, []);

    return (
        <>
            <Head>
                <script src="https://accounts.google.com/gsi/client" async defer></script>
            </Head>
            <div className="p-10 pt-5 w-full" style={{ minWidth: 500, minHeight: 450 }}>
                {error && (
                    <div className="w-full px-2 py-2 mb-5 bg-red-200 text-center">{error}</div>
                )}
                <div className="w-full px-2 py-2 mb-5 text-center my-4" id="signInDiv" style={{ width: "100%" }}></div>
                <button
                    onClick={() => setCurrentPage("signUp")}
                    className="w-full my-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Back to Sign-Up with form
                </button>
            </div>
        </>
    );
}

export default SignUpWithGoogle;