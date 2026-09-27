const API_URL =
  'http://10.68.152.175:5000/api/diagnostics';


/*
 * Créer un diagnostic
 */
export const startDiagnostic = async (
  token: string,
  culture: string
) => {

  const response = await fetch(
    API_URL,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        culture,
      }),
    }
  );


  const result = await response.json();


  if (!response.ok) {

    throw new Error(
      result.message ||
      'Erreur création diagnostic'
    );
  }


  return result;
};


/*
 * Envoyer un message à l'IA
 */
export const sendDiagnosticMessage = async (
  token: string,
  diagnosticId: number,
  message: string
) => {

  const response = await fetch(
    `${API_URL}/chat`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        diagnosticId,
        message,
      }),
    }
  );


  const result = await response.json();


  if (!response.ok) {

    throw new Error(
      result.message ||
      'Erreur diagnostic IA'
    );
  }


  return result;
};


/*
 * Récupérer les diagnostics
 * de l'utilisateur connecté
 */
export const getMyDiagnostics = async (
  token: string
) => {

  const response = await fetch(
    API_URL,
    {
      method: 'GET',

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );


  const result = await response.json();


  if (!response.ok) {

    throw new Error(
      result.message ||
      'Erreur récupération diagnostics'
    );
  }


  return result;
};