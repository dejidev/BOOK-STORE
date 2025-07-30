import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import getbaseUrl from '../../utils/baseurl';
import LoadingSpinner from '../../components/Loading';
import { useUpdateBookMutation } from '../../redux/features/books/booksApi';

type Book = {
  _id: string;
  title: string;
  description: string;
  category: string;
  trending: boolean;
  coverImage: string;
  oldPrice: number;
  newPrice: number;
};




const EditBook = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`${getbaseUrl()}/api/books/${id}`);
        setFormData(res.data);
      } catch (err) {
        console.error("Failed to load book", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  console.log(formData)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prev) =>
      prev ? { ...prev, [name]: type === 'number' ? Number(newValue) : newValue } : prev
    );
  };


  const [updateBook] = useUpdateBookMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData || !id) return;

    const payload = {
      id,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      trending: formData.trending,
      coverImage: formData.coverImage,
      oldPrice: formData.oldPrice,
      newPrice: formData.newPrice,
    };

    try {
      const res = await updateBook(payload).unwrap();
      console.log("Book updated:", res);
      navigate("/dashboard/manage-books");
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!formData) return;

  //   // Remove _id from body before sending
  //   const { _id, ...bookData } = formData;

  //   console.log("Sending:", bookData);
  //   console.log("_id:", _id);

  //   try {
  //     await axios.patch(`${getbaseUrl()}/api/books/edit/${id}`, bookData);
  //     navigate("/dashboard/manage-books");
  //   } catch (err) {
  //     console.error("Failed to update book", err);
  //   }
  // };


  if (loading) return <LoadingSpinner />;
  if (!formData) return <p className="text-center">Book not found.</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          className="w-full p-2 border rounded"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="trending"
            checked={formData.trending}
            onChange={handleChange}
          />
          <label>Trending</label>
        </div>

        <input
          type="text"
          name="coverImage"
          placeholder="Cover Image URL"
          className="w-full p-2 border rounded"
          value={formData.coverImage}
          onChange={handleChange}
        />

        <input
          type="number"
          name="oldPrice"
          placeholder="Old Price"
          className="w-full p-2 border rounded"
          value={formData.oldPrice}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="newPrice"
          placeholder="New Price"
          className="w-full p-2 border rounded"
          value={formData.newPrice}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBook;
