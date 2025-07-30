import React, { useState } from 'react';
import { useAddBookMutation } from '../../redux/features/books/booksApi';
import { useNavigate } from 'react-router-dom';

const AddBookForm = () => {
  const [addBook, { isLoading }] = useAddBookMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    trending: false,
    coverImage: '',
    oldPrice: 0,
    newPrice: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? target.checked : type === 'number' ? +value : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addBook(formData).unwrap();
      alert('Book added successfully');
      navigate('/dashboard/manage-books');
    } catch (error) {
      console.error('Failed to add book:', error);
      alert('Error adding book');
    }
  };

  console.log(formData)

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="text"
          name="coverImage"
          placeholder="Cover image filename (e.g. book1.jpg)"
          value={formData.coverImage}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="number"
          name="oldPrice"
          placeholder="Old Price"
          value={formData.oldPrice}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="number"
          name="newPrice"
          placeholder="New Price"
          value={formData.newPrice}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="trending"
            checked={formData.trending}
            onChange={handleChange}
          />
          <span>Trending</span>
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isLoading ? 'Adding...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;
