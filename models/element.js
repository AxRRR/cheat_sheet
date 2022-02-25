import mongoose from 'mongoose';

const ElementSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    code: {
        type: String,
    }
});


export default mongoose.models.Element || mongoose.model('Element', ElementSchema);
