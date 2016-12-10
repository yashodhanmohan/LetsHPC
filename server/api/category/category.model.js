'use strict';

import mongoose from 'mongoose';

var CategorySchema = new mongoose.Schema({
  category_id: Number,
  category_name : String,
  category_desc : String
});

export default mongoose.model('Category', CategorySchema);
