import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    try {
        // Pega a caixinha do banco
        const status = await kv.get('status-onibus');
        
        // Se não tiver nada salvo, diz que o atraso é zero
        return res.status(200).json(status || { offset_minutos: 0 });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
