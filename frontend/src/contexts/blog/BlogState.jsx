import { useState } from 'react';
import blogContext from './blogContext';

const BlogState = (props) => {
  const host = 'http://localhost:5000';
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState({ title: '', description: '', image: '' });
  const [myBlogs, setMyBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all blogs
  const getAllBlogs = async () => {
    try {
      const response = await fetch(`${host}/blog/posts`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();
      console.log(json);
      setBlogs(json);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };
  const getMyBlogs = async () =>{
    try {
      const response = await fetch(`${host}/blog/my-posts`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, 
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();
      
      setMyBlogs(json);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };
  // Fetch a single blog by ID
  const getABlog = async (id) => {
    try {
      const response = await fetch(`${host}/blog/posts/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, 
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();
      
      setBlog(json);
    } catch (error) {
      console.error('Error fetching blog:', error);
    }
  };

  // Add a new blog
  const addABlog = async (title, description, image) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const response = await fetch(`${host}/blog/posts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, 
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      await response.json();
      getAllBlogs(); 
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  // Update an existing blog
  const updateABlog = async (id, title, description, image) => {
    const formData = new FormData();
    if (title) formData.append('title', title);
    if (description) formData.append('description', description);
    if (image) formData.append('image', image);

    try {
      const response = await fetch(`${host}/blog/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      await response.json();
      getMyBlogs(); 
      getAllBlogs();
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  const filterBlogs = (blogs) => {
    return blogs.filter(blog => 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Filtering function for myBlogs
  const filterMyBlogs = (myBlogs) => {
    return myBlogs.filter(blog => 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Delete a blog
  const deleteABlog = async (id) => {
    try {
      const response = await fetch(`${host}/blog/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      await response.json();
      getAllBlogs(); 
      getMyBlogs(); 
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <blogContext.Provider value={{ 
      blogs: filterBlogs(blogs), 
      blog, 
      getABlog, 
      getAllBlogs, 
      addABlog, 
      updateABlog, 
      deleteABlog, 
      myBlogs: filterMyBlogs(myBlogs), 
      getMyBlogs, 
      setSearchTerm 
    }}>
      {props.children}
    </blogContext.Provider>
  );
};

export default BlogState;
