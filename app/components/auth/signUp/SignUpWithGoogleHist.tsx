import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Image from 'next/image';
import { User } from "@/app/types";

declare const google: any;

interface SignUpWithGoogleProps {
    onClose: () => void;
    setUserLoggedIn: React.Dispatch<React.SetStateAction<User | undefined>>
    setCurrentPage: React.Dispatch<React.SetStateAction<string>>
}


export default function SignUpWithGoogle({ onClose, setUserLoggedIn, setCurrentPage }: SignUpWithGoogleProps) {
    const [user, setUser] = useState<any>({});

    function handleCallbackResponse(response: any) {
        setUser(jwtDecode(response.credential));
        const signInDiv = document.getElementById("signInDiv");
        if (signInDiv) signInDiv.hidden = true;
    }

    function handleSignOut(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        setUser({});
        const signInDiv = document.getElementById("signInDiv");
        if (signInDiv) signInDiv.hidden = false;
    }

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            /* global google */
            google.accounts.id.initialize({
                client_id: "968408422808-i6ch6rd76oq3rrhid31e5316o01g2gkn.apps.googleusercontent.com",
                callback: handleCallbackResponse,
            });
            google.accounts.id.renderButton(document.getElementById("signInDiv"), {
                theme: "outline",
                size: "large",
            });
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="p-10 pt-5 w-full" style={{ minWidth: 600 }}>
            <div id="signInDiv">google</div>
            {user && (
                <div>
                    <Image src={user.picture} alt="User Picture" width={100} height={100} />
                    <div>{user.name}</div>
                    <div>{user.email}</div>
                </div>
            )}
            {Object.keys(user).length !== 0 && (
                <button onClick={handleSignOut}>Sign Out</button>
            )}
        </div>
    );
}
