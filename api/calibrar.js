import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    try {
        const { offset_minutos, parada } = req.body;
        
        // Salva os dados no banco Vercel KV com a data exata do ajuste
        await kv.set('status_onibus', {
            offset_minutos,
            parada,
            horario: new Date().toISOString()
        });

        res.status(200).json({ success: true, message: 'Salvo com sucesso na nuvem!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao salvar no banco de dados' });
    }
}
