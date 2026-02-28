const express = require('express');
const UserModel = require('../src/models/user.model.js');

const port = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(302).redirect('/home');
});

app.get('/home', (req, res) => {
    res.status(200).send("<h1>Testando uma home page com express</h1>");
})

// app.get('/users', (req, res) => {
//     const users = [
//         { name: "Jefferson", age: 32 },
//         { name: "Maria Rayssa", age: 29 }
//     ];
//     res.status(200).json(users);
// });
app.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
        console.log('Usuários buscados com sucesso:', users);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error.message);
        res.status(500).json({ error: 'Erro ao buscar usuários', details: error.message });
    }
});
// Criando o endpoint para criar um novo usuário
app.post('/users', async (req, res) => {
    try {
        console.log('req.body recebido:', req.body);
        
        const user = await UserModel.create(req.body);
        res.status(201).json(user);
        console.log('Usuário criado com sucesso:', user);

    } catch (error) {
        console.error('Erro capturado:', error.message);  // ← VEJA O ERRO
        console.error('Stack completo:', error);
        res.status(500).json({ 
            error: 'Erro ao criar usuário',
            details: error.message  // ← ENVIE O ERRO REAL
        });
    }
});
// Deletndo um usuário pelo ID
app.delete('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await UserModel.findByIdAndDelete(userId);
        
        if (!deletedUser) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        
        res.status(200).json({ message: 'Usuário deletado com sucesso', user: deletedUser });
        console.log('Usuário deletado com sucesso:', deletedUser);
    }catch (error) {
        console.error('Erro ao deletar o usuário:', error.message);
        return res.status(500).json({error: 'Erro ao deletar o usuário', details: error.message});
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
    console.log(`Acesse: http://localhost:${port}/home`);
});