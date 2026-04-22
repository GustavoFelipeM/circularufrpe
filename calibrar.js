import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Use POST');
    
    try {
        // Recebe o atraso que o app calculou
        const { offset_minutos, parada } = req.body;
        
        const dados = {
            offset_minutos,
            parada,
            horario: new Date().toISOString()
        };

        // Salva na caixinha do banco de dados
        await kv.set('status-onibus', dados);
        
        return res.status(200).json({ success: true, dados });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
