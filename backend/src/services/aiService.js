const OpenAI = require('openai');

const apiKey = process.env.OPENAI_API_KEY;

console.log('OPENAI_API_KEY présente :', !!apiKey);

const client = apiKey
    ? new OpenAI({
        apiKey: apiKey,
    })
    : null;

const generateAgriculturalDiagnosis = async (messages) => {

    if (!client) {
        throw new Error(
            'OPENAI_API_KEY est absente. Vérifie ton fichier .env.'
        );
    }

    try {
        const response = await client.responses.create({
            model: process.env.OPENAI_MODEL || 'gpt-5',

            instructions: `
Tu es AgriChat IA, un assistant spécialisé
dans l'accompagnement des agriculteurs.

Ton rôle est d'aider l'agriculteur à identifier
les problèmes possibles affectant ses cultures
.

Tu dois :

- poser des questions pertinentes ;
- analyser les symptômes décrits ;
- demander une photo lorsque cela est utile ;
- proposer plusieurs causes possibles lorsque nécessaire ;
- expliquer ton analyse simplement ;
- proposer des recommandations pratiques ;
- signaler lorsque les informations sont insuffisantes ;
- recommander de contacter un expert agricole
  lorsque le diagnostic est incertain.

Tu ne dois jamais présenter une hypothèse comme
une certitude lorsque les informations sont
insuffisantes.

Réponds en français simple et compréhensible
par un agriculteur camerounais.

IMPORTANT :
- Ne présente pas un diagnostic comme certain
  lorsque les informations sont insuffisantes.
- Si plusieurs causes sont possibles, indique-le.
- Demande des précisions lorsque cela est nécessaire.
- N'invente pas d'information.
- Lorsque le problème nécessite un spécialiste,
  recommande de contacter un expert agricole.
- Adapte toujours tes explications à l'agriculteur.
`,

            input: messages,
        });

        return response.output_text;

    } catch (error) {

        console.error(
            'Erreur lors de l’appel à OpenAI :',
            error.message
        );

        throw new Error(
            'Impossible d’obtenir une réponse du service IA.'
        );
    }
};

module.exports = {
    generateAgriculturalDiagnosis,
};