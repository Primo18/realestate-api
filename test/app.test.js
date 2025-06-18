import supertest from 'supertest';
import app from '../src/app.js';
import { describe, it, expect } from 'vitest';

const request = supertest(app);

describe('API de Inmuebles', () => {
    it('GET /api/inmuebles - debe devolver una lista de inmuebles', async () => {
        const response = await request.get('/api/inmuebles');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                direccion: expect.any(String),
                ciudad: expect.any(String),
                precio: expect.any(Number)
            })
        ]));
    });

    it('GET /api/inmuebles/:id - debe devolver un inmueble por ID', async () => {
        const response = await request.get('/api/inmuebles/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            id: 1,
            direccion: "Calle Falsa 123",
            ciudad: "Springfield",
            precio: 250000
        }));
    });

    it('GET /api/inmuebles/:id - debe devolver 404 si el inmueble no existe', async () => {
        const response = await request.get('/api/inmuebles/999');
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Inmueble no encontrado' });
    });
});
