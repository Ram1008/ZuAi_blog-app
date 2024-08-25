import { useState, useEffect, useContext } from 'react';
import blogContext from '../../contexts/blog/blogContext';
import authContext from '../../contexts/auth/authContext'; 
import './home.scss';
import Layout from '../../wrappers/layout/Layout';
import Post from '../../components/post/Post';
import MyBlog from '../../components/myBlog/MyBlog';
import BlogImage from '../../assets/postImage.png';
import AddBlog from '../../components/addBlog/AddBlog';
import LoginModal from '../../components/loginModal/LoginModal';

const Home = () => {
    const { blogs, getAllBlogs, myBlogs, getMyBlogs } = useContext(blogContext);
    const { user, getUser } = useContext(authContext);
    const [showMyBlogs, setShowMyBlogs] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    useEffect(() => {
        getAllBlogs(); 
    }, []);
    
    useEffect(() => {
         if (user) {
             getMyBlogs();
         }
    }, [user]);

    const handleAllPosts = () => {
        setShowMyBlogs(false);
    };  

    const handleMyPosts = () => {
        if (!user) {
            const token = localStorage.getItem('token');
            if (token) {
                const isUser = getUser(token);
                if(isUser) {
                setShowMyBlogs(true);
                }
            } else {
                setIsLoginModalOpen(true); 
            }
        } else {
            setShowMyBlogs(true);
        }
    };

    const handleAddNewBlog = () => {
        if (!user) {
            const token = localStorage.getItem('token');
            if (token) {
                getUser(token);
                setIsModalOpen(true);
            } else {
                setIsLoginModalOpen(true); 
            }
        } else {
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCloseLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    return (
        <Layout 
            heading="Welcome To Blogger" 
            buttonLabel="+ Add new blog" 
            buttonClick={handleAddNewBlog}
        >
            <main className='home_container'>
                <div className='home_tab'>
                    <button 
                        className={showMyBlogs ? 'tab' : 'tab active'} 
                        onClick={() => handleAllPosts(false)}
                    >
                        All Blogs
                    </button>
                    <button 
                        className={showMyBlogs ? 'tab active' : 'tab'} 
                        onClick={() => handleMyPosts()}
                    >
                        My Blogs
                    </button>
                </div>
                <div className='home_body'>
                    {!showMyBlogs ? (
                        blogs.map(blog => (
                            <Post 
                                key={blog._id} 
                                title={blog.title}
                                description={blog.description}
                                image={blog.image ? blog.image : BlogImage}
                            />
                        ))
                    ) : (
                        
                        user ? myBlogs.map(blog => (
                            <MyBlog 
                                key={blog._id} 
                                id={blog._id}
                                title={blog.title}
                                description={blog.description}
                                image={blog.image ? blog.image : BlogImage}
                            />
                        )) : null
                    )}
                </div>
            </main>
            
            {isModalOpen && user && (
                <AddBlog
                    onClose={handleCloseModal}
                />
            )}
            
            {isLoginModalOpen && (
                <LoginModal
                    onClose={handleCloseLoginModal}
                />
            )}
        </Layout>
    );
};

export default Home;
