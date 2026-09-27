const API_URL = 'http://10.68.152.175:5000/api/diagnostics';

export const startDiagnostic = async (
  token: string,
  culture: string
) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      culture,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || 'Erreur création diagnostic'
    );
  }

  return result;
};

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
      result.message || 'Erreur diagnostic IA'
    );
  }

  return result;
};