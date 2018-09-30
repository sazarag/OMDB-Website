import React from 'react'
import styled from 'styled-components'
import Notifications, {notify} from 'react-notify-toast';
import Search from 'containers/Search'
import 'App.css';

const App = () => (
  <Div>
    <Search />
    <Notifications />
  </Div>
)

const Div = styled.div`
  padding: 2rem;
`
export default App
