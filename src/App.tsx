import { Provider } from 'react-redux';
import TodoWrapper from '@/components/TodoWrapper';
import { store } from '@/store/store';
import '@/styles/App.css'
import '@/styles/Theme.css'

function App() {
  return (
    <Provider store={store}>
      <TodoWrapper />
    </Provider>
  )
}
export default App;