import { createContext, useState } from 'react';
import PostCreate from './PostCreate';
import PostList from './PostList';

export const RootContext = createContext({
  state: { fetchComment: '', fetchPost: false },
  setState: (val) => {},
});

function App() {
  const [state, setState] = useState({ fetchComment: '', fetchPost: true });

  return (
    <RootContext.Provider value={{ state, setState }}>
      <div className='container'>
        <h1>Create Post</h1>
        <PostCreate />
        <hr />
        <h1>Posts</h1>
        <PostList />
      </div>
    </RootContext.Provider>
  );
}

export default App;
