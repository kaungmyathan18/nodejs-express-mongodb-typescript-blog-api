import { model, Schema } from 'mongoose';
import slugify from 'slugify';

const postSchema = new Schema(
  {
    title: String,
    body: String,
    slug: {
      type: String,
      unique: true,
    },
    coverImage: String,
  },
  {
    timestamps: true,
  },
);
postSchema.pre('save', async function (next) {
  const originalSlug = slugify(this.title, { lower: true });
  let generatedSlug = originalSlug;
  let slugExists = true;
  let counter = 1;

  // Loop until a unique slug is obtained
  while (slugExists) {
    const existingDoc = await this.$model('Post').findOne({
      slug: generatedSlug,
    });

    if (!existingDoc) {
      // No document found with the generatedSlug, it's unique
      slugExists = false;
      this.slug = generatedSlug;
    } else {
      // A document with the generatedSlug already exists, modify the slug and try again
      generatedSlug = `${originalSlug}-${counter}`;
      counter++;
    }
  }

  next();
});

export const postModel = model('Post', postSchema);
