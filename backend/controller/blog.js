import { Blog } from '../models/Blog.js';
import { validationResult } from 'express-validator';
import path from 'path';

export const getAllPosts = async (_, res) => {
  await Blog.find()
    .then(data => res.json(data))
    .catch(err => res.status(404).json(err));
};

export const getMyPosts = async (req, res) => {
  await Blog.find({ user: req.user.userId })
    .then(data => res.json(data))
    .catch(err => res.status(404).json({ error: 'Posts not found', details: err }));
};


export const getAPost = async (req, res) => {
  await Blog.findById(req.params.id)
    .then(data => res.json(data))
    .catch(err => res.status(404).json(err));
};

export const addAPost = async (req, res) => {
  const { title, description } = req.body;
  const image = req.file ? req.file.filename : null;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newPost = new Blog({ title, description, image, user: req.user.userId });
  await newPost.save()
    .then(() => res.json({ success: true }))
    .catch(err => res.json(err));
};

export const updateAPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const updateData = req.body;
  if (req.file) {
    updateData.image = req.file.filename;
  }

  await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true })
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
};

export const deleteAPost = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json(err));
};
