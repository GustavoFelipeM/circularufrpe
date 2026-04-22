import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    try {
        // Busca a calibração que foi salva no banco
        const status = await kv.get('status_onibus');
        
        // Se existir, devolve. Se não, devolve vazio.
        res.status(200).json(status || {});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar no banco de dados' });
    }
}
