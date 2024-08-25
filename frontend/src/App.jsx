import Home from './containers/home/Home';
import BlogState from './contexts/blog/BlogState';
import AuthState from './contexts/auth/AuthState';

const App = () => {
  return (
    <AuthState>
      <BlogState>
        <Home/>
      </BlogState>
    </AuthState>
  )
}

export default App;