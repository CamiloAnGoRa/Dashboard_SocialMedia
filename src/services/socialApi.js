const GEMINI_API_KEY = "AIzaSyBC6voRvRs61v8ut27IVaTnSUOGrfcor9I"; // tu key

// ------------------------------------------------------------
//  Limpieza de números: convierte strings en números puros
// ------------------------------------------------------------
function cleanNumber(val) {
    if (val === null || val === undefined) return 0;

    // Si ya es número, retornarlo
    if (typeof val === "number") return val;

    // Si viene como string tipo "12.4k" o "1,234"
    if (typeof val === "string") {
        // Eliminar todo lo que no sea dígito o punto
        const normalized = val.replace(/[^\d.]/g, "");
        const parsed = Number(normalized);
        return isNaN(parsed) ? 0 : parsed;
    }

    return 0;
}

// ------------------------------------------------------------
//  FUNCIÓN PRINCIPAL: Llamado a Gemini
// ------------------------------------------------------------
export async function fetchSocialAnalysis(username) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    // ------------------------------------------------------------
    // Prompt optimizado para forzar JSON limpio
    // ------------------------------------------------------------
    const prompt = `
    Analiza el perfil de redes sociales: ${username}.
    Devuelve ÚNICAMENTE un JSON válido. Sin texto antes o después.
    Sin backticks. Sin \`\`\`, sin markdown.

    El JSON DEBE ser EXACTAMENTE de esta forma:

    {
        "followers": number,
        "likes": number,
        "posts": number,
        "views": number,
        "engagement": number,
        "insights": [string],
        "recommended_actions": [string]
    }

    Asegúrate de:
    - Que todos los valores numéricos sean números PUROS (ej: 12400, no "12.4k").
    - No uses comillas en los números.
    - No uses porcentaje, unidad, ni textos extra.
    `;

    const body = {
        contents: [
            {
                parts: [{ text: prompt }]
            }
        ]
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        // Extraer texto puro
        let rawText =
            data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

        // ------------------------------------------------------------
        // LIMPIEZA del texto antes del parseo
        // ------------------------------------------------------------
        rawText = rawText
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim()
            .replace(/,\s*}/g, "}") // elimina coma antes de "}"
            .replace(/,\s*]/g, "]"); // elimina coma antes de "]"

        // ------------------------------------------------------------
        // PARSEAR JSON
        // ------------------------------------------------------------
        let json;
        try {
            json = JSON.parse(rawText);
        } catch (e) {
            console.error("❌ JSON inválido recibido de Gemini:", rawText);
            return null;
        }

        // ------------------------------------------------------------
        // NORMALIZAR NÚMEROS (evitar NaN)
        // ------------------------------------------------------------
        json.followers = cleanNumber(json.followers);
        json.likes = cleanNumber(json.likes);
        json.posts = cleanNumber(json.posts);
        json.views = cleanNumber(json.views);
        json.engagement = cleanNumber(json.engagement);

        return json;

    } catch (error) {
        console.error("❌ Error en fetchSocialAnalysis:", error);
        return null;
    }
}