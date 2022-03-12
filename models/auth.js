import mongoose from 'mongoose';

const AuthSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


export default mongoose.models.Auth || mongoose.model('Auth', AuthSchema);
