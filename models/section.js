import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema({
    section_title: {
        type: String,
    },
    elements: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'element',
    }],
});


export default mongoose.models.section || mongoose.model('section', SectionSchema);
