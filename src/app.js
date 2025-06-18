import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

const inmuebles = [
    {
        id: 1,
        direccion: "Calle Falsa 123",
        ciudad: "Springfield",
        precio: 250000
    },
    {
        id: 2,
        direccion: "Avenida Siempre Viva 742",
        ciudad: "Springfield",
        precio: 300000
    },
    {
        id: 3,
        direccion: "Calle del Olmo 456",
        ciudad: "Shelbyville",
        precio: 200000
    }
]


app.get('/api/inmuebles', (req, res) => {
    res.json(inmuebles);
});

app.get('/api/inmuebles/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const inmueble = inmuebles.find(i => i.id === id);

    if (!inmueble) {
        return res.status(404).json({ error: 'Inmueble no encontrado' });
    }

    res.json(inmueble);
}
);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;