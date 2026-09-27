const API_URL = 'http://10.242.183.175:5000/api/auth';



export interface RegisterData {
    nom_complet: string;
    email: string;
    telephone: string;
    password: string;
    role?: 'agriculteur' | 'expert';
}


export interface LoginData {
    email: string;
    password: string;
}


// ===============================
// INSCRIPTION
// ===============================
export const registerUser = async (
    data: RegisterData
) => {
console.log('REGISTER URL :', `${API_URL}/register`);
console.log('REGISTER DATA :', data);

    const response = await fetch(
        `${API_URL}/register`,
        {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(data),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message || 'Erreur lors de la création du compte.'
        );
    }

    return result;
};


// ===============================
// CONNEXION
// ===============================
export const loginUser = async (
    data: LoginData
) => {

    const response = await fetch(
        `${API_URL}/login`,
        {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(data),
        }
    );

        console.log('LOGIN URL :', `${API_URL}/login`);
console.log('LOGIN DATA :', {
    email: data.email,
    password: '***',
});

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message || 'Erreur lors de la connexion.'
        );
    }

    return result;
};