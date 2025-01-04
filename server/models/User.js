import mongoose from 'mongoose';
    import bcrypt from 'bcryptjs';

    const userSchema = new mongoose.Schema({
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      trialEnd: { type: Date, default: () => new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) },
      isActive: { type: Boolean, default: true },
      stripeCustomerId: String,
      subscriptionId: String,
    });

    userSchema.pre('save', async function(next) {
      if (!this.isModified('password')) return next();
      this.password = await bcrypt.hash(this.password, 10);
      next();
    });

    userSchema.methods.comparePassword = async function(candidatePassword) {
      return await bcrypt.compare(candidatePassword, this.password);
    };

    export default mongoose.model('User', userSchema);
