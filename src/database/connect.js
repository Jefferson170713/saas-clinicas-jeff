const mongoose = require('mongoose');

const connectToDatabase = async () => {
    const username = process.env.MONGODB_USERNAME;
    const password = process.env.MONGODB_PASSWORD;
    const clusterName = process.env.MONGODB_CLUSTER_NAME;
    const stringConnection = `mongodb+srv://${username}:${password}@${clusterName}.esswxom.mongodb.net/?appName=${clusterName}`;
    
    try {
        await mongoose.connect(stringConnection);
        console.log('Conexão bem-sucedida à base de dados');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

module.exports = connectToDatabase;