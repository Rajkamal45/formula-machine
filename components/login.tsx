import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const login = () => {
    const [email, SetEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        setLoading(false)

        if (error) {
            setError(error.message);
        }
        else{
        alert('Login successfull');
        }
    };

    return(
        <div className='flex flex-col items-center justify-center h-screen bg-gray-50'>
            <div className= ""></div>
        </div>
    )

};