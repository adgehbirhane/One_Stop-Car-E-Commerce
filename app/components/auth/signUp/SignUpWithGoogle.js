import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

function SignUpWithGoogle({ onClose, setUserLoggedIn, setCurrentPage }) {
    async function handleCallbackResponse(response) {
        const user = jwtDecode(response.credential);

        try {
            const response = await axiosInstance.post(`${SERVER_API_URL}/auth/signup`, {
                firstName: user.name, lastName: "by Gmail", email: user.email, password: "1234"
            });
            if (response.status === 201) {
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
        <div className="p-10 pt-5 w-full" style={{ minWidth: 500, minHeight: 450 }}>
            <div className=" my-4" id="signInDiv"></div>
            <button
                onClick={() => setCurrentPage("signUp")}
                className="w-full my-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Back to Sign-Up with form
            </button>
        </div>
    );
}

export default SignUpWithGoogle;