'use strict';

import mongoose from 'mongoose';

var ExplanationSchema = new mongoose.Schema({
  user_id: String,
  problem_id : Number,
  approach_id : Number,
  category_id : Number,
  approach_description : String,
  complexity : String,
  estimated_ser_frac : String,
  diff_faced : String,
  possible_speedup : String,
  advantage : String,
  disadvantage : String,
  serial_code : String,
  parallel_code : String
});

export default mongoose.model('Explanation', ExplanationSchema);
